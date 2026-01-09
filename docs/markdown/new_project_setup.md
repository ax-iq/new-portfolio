# Project Setup

## Table of contents
- [Deployment Guide](#deployment-guide)

  - [Environment Variables](#environment-variables)
  - [Creating SSH Keys](#creating-ssh-keys)
  - [Github](#github)
  - [Server Provisioning](#server-provisioning)
  - [Security](#security)

    - [DNS & SSL](#dns--ssl)
    - [Administrator Access](#administrator-access)
    - [Rate Limiting](#rate-limiting)

  - [Applications Deployment](#applications-deployment)

- [Observability / Monitoring](#observability--monitoring)
  - [Process Flow](#process-flow)
  - [frontend service](#frontend-service)
  - [backend service](#backend-service)

- [Code Quality Enforcement](#code-quality-enforcement)

## Deployment Guide
Github workflows are used for the CI/CD pipelines. They leverage Terraform and Ansible.
  - Terraform for infrastructure provisioning
  - Ansible for deployment

### Environment Variables

- .env.runtime.j2

It contains all the environment variables required by Docker Compose for interpolation during the *"docker compose up"* command.

It is a template file and is used to dynamically generate the production .*env.production* file during deployment by using Github **"secrets"** and **"vars"**.

**Note:** Every time the *.env.runtime.j2* file is updated, the *.github/workflows/continuous_delivery.yaml* and *.github/workflows/manual_deployment.yaml* workflows must be also updated to reflect the change.

- .env.example

It contains all the **"secrets"** and **"vars"** that must be set on Github Platform. It contains:
    
    - Environment variables required in the CI/CD Runner machine.
    - Environment variables used to generate the .env.production file for docker compose interpolation.

- .env

For local development, create a **.env** file at the root of the project and fill it in using the *.en.example* file as guide.

- Strapi (backend)

A script have been provided to generate environment variables required by Strapi. Those environments are set as github secrets. Run the following command to generate:
```bash
make generate-env-vars
```

### Creating SSH Keys

SSH public/private key pair generation. Run the following command:
```bash
# FOR GITHUB ACTIONS
ssh-keygen -t rsa -b 4096 -C "github-actions" -f github_actions_key
```
The command outputs two files: *github_actions_key* and *github_actions_key.pub* which contains respectively ssh private and public keys.

The public key will be set as VARS and the private as SECRET on Github platform.

The public key is copied into the Virtual Machine via terraform 
metadata > user-data on the compute_instance resource type.
Terraform get the public key as variable. So, you can set the public key as environment variable and then use it in terraform apply command.

Alternativaly use the command:

```bash
make generate-ssh-keys
```
It will generate a pair of ssh keys and output it in the terminal.
Those values can then be used to set the github actions secrets (**SSH_PUBLIC_KEY** and **SSH_PRIVATE_KEY**)

- Link GCP to Github for Continuous Deployment (CD)

  On GCP Platform:

  - GCP Account:
    Create a GCP Account

  - Setup permissions to create folders and manage workload identity pools

  - Create a Folder

  - Create a Project

  - Create a Workload Identitity Pool

  - Create a Workload Identity Provider

  - Get the Project name and the the workload identity provider resource names to set in github actions sercrets/vars (**GCP_PROJECT_ID** and **GCP_WORKLOAD_IDENTITY_PROVIDER**).

A script have been provided to automatically and idempotently do this job. Check: [WIP](/infra/automation/scripts/workload-identity-federation.example.sh) (*infra/automation/scripts/workload-identity-federation.example.sh*) file.

The content of the script should be copied and run directly in Google Cloud Shell.

Ensure to change the variable values inside the script before copying.


### Github

On Github Platform, add variables and secrets. Use the .env.example file content as example.

### Server Provisioning

Use the github workflow: [Infra Provisioning](/.github/workflows/infra_provisioning.yaml) to provision a deployment environment.

Get the IP address of the deployment server and set the github variable ***SSH_HOST*** to that value.

*Note*: Running the workflow is manual; on github platform.



### Security

#### DNS && SSL

- Buy Domain Name on Cloudflare
- Add DNS entries on Cloudflare
- Get a Token from Cloudflare
- Configure the reverse-proxy with the Cloudflare token to enable SSL with the Certificate Authority *"Let's Encrypt"* . The token is set as a secret in github platform (**CF_DNS_API_TOKEN**).

#### Administrator Access

Setup Basic Auth in trafik.
In the docker compose file, for each service that need authentication, add the label:
```docker
labels:
    - "traefik.http.middlewares.test-auth.basicauth.users=test:$$apr1$$H6uskkkW$$IgXLP6ewTrSuBkTrqE8wj/,test2:$$apr1$$d9hr9HBB$$4HxwgUir3HP4EsggP/QNo0"
```

To generate the credentials used in the label this command can be used:
```sh
echo "username:hashed-password = $(htpasswd -nbB user password)"
```

**⚠️ Warning:** the outputed value may contain **"\$"** signs. As it is intented to be used in a docker compose file as a value, so it must be escaped with another **"\$"** sign. So, replace all **"\$"** signs with double signs **"\$$"**.


The credentials are created and added in github secrets (**ADMIN_AUTH_CREDENTIALS**). and the label just hold a docker compose interpolation variable instead of the plain credentials.

#### Rate Limiting

A rate limiting middleware have been added to traefik to avoid absuse (Overloading the server with too many request.).

### Applications Deployment

The github workflow: [Continuous Delivery](/.github/workflows/continuous_delivery.yaml) is used to deploy the applications.

It is activated on each merge/push to the branch **"main"**.

8 services are deployed via docker compose. The services are listed in the followind table.

|N°   | Service Name  | Detail              |
|:---:|:-------------:|:-------------------:|
|1    |reverse-proxy  |traefik              |
|2    |frontend       |astro app            |
|3    |backend        |strapi app           |
|4    |vector         |datadog agent        |
|5    |otel-collector |events collector     |
|6    |loki           |logs backend         |
|7    |prometheus     |metrics backend      |
|8    |tempo          |traces backend       |
|9    |grafana        |events vizualisation |


## Observability / Monitoring

### Process Flow:
  - Vector (vector.dev):
    - ROLE: Agent 
    - Collects logs from docker.
    - Sends Logs to Opentelemetry Collector.
  - Opentelemetry Collector: 
    - ROLE: Central Collector; Buffer
    - Receives Logs from Vector.
    - Collect container Metrics from Docker stats api.
    - Receives Traces from reverse-proxy, frontend and backend services.
    - Sends Logs, Metrics, and Traces to respectively Grafana Loki, Prometheus, and Grafana Tempo which are specialized backends for each event type (log, metric, trace).
  - Grafana:
    ROLE: Visualization
    - Pulls events from Loki, Prometheus, Tempo and presents it in a dashbord.

### frontend service
- Logs 

The logging behavior have been customized by using Astro node adapter middleware mode instead of standalone mode and Fastify framework.

```js
// server.mjs
const app = Fastify({ logger: true });
```

- Traces

Instrumenting a node.js app (here astro app) required the following dependencies:
[Open Telemetry for nodejs](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)
```bash
pnpm add @opentelemetry/sdk-node \
  @opentelemetry/api \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/sdk-metrics \
  @opentelemetry/sdk-trace-node \
  @opentelemetry/exporter-trace-otlp-proto \
  @opentelemetry/exporter-metrics-otlp-proto \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions
```

Add the file [instrumentation.mjs](/new-frontend/instrumentation.mjs).

Add the file [server.mjs](/new-frontend/server.mjs)

Run the command:
```bash
# Added to package.json file
node --import ./instrumentation.mjs server.mjs
```

Instead of:
```bash
node server.mjs
```
when in production.

### backend service
- Logs 

Logging customization has been added to strapi by levreging the library **@strapi/logger**:
```bash
pnpm add @strapi/logger
```

and the file:
[logger.ts](/new-backend/config/logger.ts)
```ts
'use strict';

import { winston } from '@strapi/logger';

export default {
  level: 'http',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
};
```

- Traces

Instrumenting a node.js app (here strapi app) required the following dependencies:
[Open Telemetry for nodejs](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)
```bash
pnpm add @opentelemetry/sdk-node \
  @opentelemetry/api \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/sdk-metrics \
  @opentelemetry/sdk-trace-node \
  @opentelemetry/exporter-trace-otlp-proto \
  @opentelemetry/exporter-metrics-otlp-proto \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions
```

Add the file [instrumentation.js](/new-backend/instrumentation.js).

Run the command:
```bash
# Added to package.json file
node -r ./instrumentation.js ./node_modules/@strapi/strapi/bin/strapi.js start
```

Instead of:
```bash
strapi start
```



*Warning*:
When running on PC and if using WSL 2 with docker desktop 4.54.0+ the director must be mounted in order to access the containers
logs. Run the command directly inside WSL.
```bash
# Note that this path location may differ from docker desktop version to version.
sudo mount -t drvfs '\\wsl.localhost\docker-desktop\mnt\docker-desktop-disk\data\docker' /var/lib/docker

```

## Code Quality Enforcement

When you run pnpm install, husky modify the configuration file *.git/config* and set the *core.hooksPath* to *.husky/_*.

Hooks files are manually created under the *.husky* folder:
  - [pre-commit](/.husky/pre-commit):

Runs before any commit. The goal is to ensure that linting and testing are run before any commit.

  - [commit-msg](/.husky/commit-msg):

Runs after a commit message has been entered. The goal is to enforce commit message conventions.

The *commit-msg* file runs **commitlint** npm package with the configuration file [.commitlintrc.yaml](/.commitlintrc.yaml). The configuration file is automatically picked by commitlint:
```bash
# commit-msg file content
pnpm dlx commitlint --edit \$1
```
