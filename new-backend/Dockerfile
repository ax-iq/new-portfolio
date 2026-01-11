ARG BACKEND_NODE_VERSION=20
FROM node:${BACKEND_NODE_VERSION}-alpine AS base
WORKDIR /opt/strapi-app/

COPY package.json pnpm-lock.yaml ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG BACKEND_PNPM_VERSION
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@${PNPM_VERSION}

FROM base AS build
WORKDIR /opt/

COPY package.json pnpm-lock.yaml ./

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
RUN pnpm install -g node-gyp \
    && pnpm install
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/strapi-app
COPY . .
RUN pnpm run build

FROM base AS prod-deps
RUN pnpm install --prod

# Creating final production image
FROM base AS prod
# Install libvips-dev for sharp Compatibility
# # RUN apk add --no-cache vips-dev

WORKDIR /opt/strapi-app/

COPY --from=prod-deps /opt/strapi-app/node_modules ./node_modules
COPY --from=build /opt/strapi-app/dist ./dist
COPY --from=build /opt/strapi-app/config ./config
COPY --from=build /opt/strapi-app/data ./data
COPY --from=build /opt/strapi-app/database ./database
COPY --from=build /opt/strapi-app/public ./public
COPY --from=build /opt/strapi-app/scripts ./scripts
# COPY --from=build /opt/strapi-app/sqlite-prod-data ./sqlite-prod-data
COPY --from=build /opt/strapi-app/src ./src
COPY --from=build /opt/strapi-app/types ./types

COPY --from=build /opt/strapi-app/pnpm-lock.yaml ./
COPY --from=build /opt/strapi-app/tsconfig.json ./
COPY --from=build /opt/strapi-app/favicon.png ./
COPY --from=build /opt/strapi-app/instrumentation.js ./

COPY --from=build /opt/strapi-app/package.json ./
ENV PATH=/opt/strapi-app/node_modules/.bin:$PATH


# RUN chown -R node:node /opt/strapi-app
# USER node
EXPOSE 1337
# CMD ["npm", "run", "start"]
CMD ["pnpm", "run", "start"]