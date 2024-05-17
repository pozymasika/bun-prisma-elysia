# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
ARG DATABASE_URL
WORKDIR /usr/src/app

# install
COPY package.json bun.lockb ./
COPY prisma ./prisma/
RUN bun install

RUN bun run migrate:prod

COPY . .

ENV NODE_ENV=production

CMD ["bun", "run", "start"]