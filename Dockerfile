FROM oven/bun:1

ARG DATABASE_URL

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./
COPY prisma ./prisma/

RUN bun install

RUN bun run prisma:prod

COPY . .

ENV NODE_ENV production

CMD [ "bun", "start" ]