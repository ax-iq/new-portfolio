
FROM mcr.microsoft.com/devcontainers/base:noble


ARG FRONTEND_NODE_VERSION=23.7.0
ARG BACKEND_NODE_VERSION=20
ARG PNPM_VERSION=10.3.0
ARG PYTHON_VERSION=3.13
ARG NVM_VERSION=0.40.1


# Switch to bash shell
# SHELL ["/bin/bash", "-c"]
ENV SHELL=bash

# Install pyenv
ENV PYENV_ROOT="/usr/local/.pyenv"
ENV PATH="$PYENV_ROOT/shims:$PYENV_ROOT/bin:$PATH"
RUN curl -fsSL https://pyenv.run | bash

# Install Python build dependencies (used by pyenv)
RUN sudo apt-get update; sudo apt-get install -y make build-essential libssl-dev zlib1g-dev \
    libbz2-dev libreadline-dev libsqlite3-dev curl git \
    libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

# Install Python
RUN ["/bin/bash", "-c", "pyenv install ${PYTHON_VERSION}"]
RUN ["/bin/bash", "-c", "pyenv global ${PYTHON_VERSION}"]

# Install docker

# Install NVM
ENV NVM_DIR=/usr/local/.nvm
RUN mkdir -p ${NVM_DIR} && curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh" | bash
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> /etc/bash.bashrc

# Install Node.js
RUN . "$NVM_DIR/nvm.sh" \
    && nvm install ${FRONTEND_NODE_VERSION} \
    && nvm install ${BACKEND_NODE_VERSION} \
    && nvm alias default ${FRONTEND_NODE_VERSION}

# Install PNPM
RUN . "$NVM_DIR/nvm.sh" \
    && corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN . "$NVM_DIR/nvm.sh" \
    && nvm use ${BACKEND_NODE_VERSION} \
    && corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Install Ansible
RUN python3 -m pip install ansible
RUN python3 -m pip install ansible-lint

# Install Terraform
RUN wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
RUN sudo apt update && sudo apt install terraform

# Install graphviz (Plantuml dependency)
RUN apt-get update && apt-get install -y graphviz

# Install sqlite
RUN apt-get update && \
    apt-get install -y sqlite3 libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*

# Install apache2-utils in order to use htpasswd
RUN apt-get update && \
    apt-get install -y apache2-utils && \
    rm -rf /var/lib/apt/lists/*


ENV ASTRO_TELEMETRY_DISABLED=1
ENV STRAPI_TELEMETRY_DISABLED=true
EXPOSE 4321