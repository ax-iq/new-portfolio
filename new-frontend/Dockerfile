ARG NODE_VERSION=23

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /frontend-app

ARG SITE_NAME=https://frontend.localhost
ENV SITE_NAME=${SITE_NAME}

# All the *-deps steps will be skipped if the
# package.json package-lock.json does not change
COPY package.json pnpm-lock.yaml ./

FROM base AS build-deps
ARG PNPM_VERSION=10.3.0
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
RUN pnpm install --dangerously-allow-all-builds

FROM build-deps AS build
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
COPY src /frontend-app/src
COPY public /frontend-app/public
COPY astro.config.mjs /frontend-app/
COPY tsconfig.json /frontend-app/
COPY server.mjs /frontend-app/
COPY instrumentation.mjs /frontend-app/
RUN pnpm run build

FROM base AS prod-deps
ARG PNPM_VERSION=10.3.0
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
RUN pnpm install --prod

FROM base AS runtime
COPY --from=build /frontend-app/dist ./dist
COPY --from=build /frontend-app/public ./dist/client

COPY --from=build /frontend-app/server.mjs .
COPY --from=build /frontend-app/instrumentation.mjs .
COPY --from=prod-deps /frontend-app/node_modules ./node_modules


ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "--import", "./instrumentation.mjs", "server.mjs"]
# CMD ["node", "./dist/server/entry.mjs"]