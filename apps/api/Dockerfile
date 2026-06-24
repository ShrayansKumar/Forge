# syntax=docker/dockerfile:1

# ---- Stage 1: deps ----
FROM node:22-slim AS deps
WORKDIR /workspace

COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm install

# ---- Stage 2: build ----
FROM node:22-slim AS build
WORKDIR /workspace

COPY --from=deps /workspace/node_modules ./node_modules
COPY package.json package-lock.json* ./
COPY apps/api ./apps/api
COPY packages/shared ./packages/shared

WORKDIR /workspace/packages/shared
RUN npm run build

WORKDIR /workspace/apps/api
RUN npm run build

# ---- Stage 3: runtime ----
FROM node:22-slim AS runtime
WORKDIR /workspace

ENV NODE_ENV=production

COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=build /workspace/apps/api/dist ./apps/api/dist
COPY --from=build /workspace/apps/api/package.json ./apps/api/package.json
COPY --from=build /workspace/packages/shared ./packages/shared

EXPOSE 4000

CMD ["node", "apps/api/dist/server.js"]