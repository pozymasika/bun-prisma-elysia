# Elysia with Bun runtime

# Video walkthrough

https://youtu.be/cpOKHEX9pxY

## Prerequisites

- [Bun](https://bun.sh/)
- [Prisma](https://www.prisma.io/)
- [Prisma Data Platform](https://www.prisma.io/data-platform/)
- [PlanetScale Database hosting](https://planetscale.com/)

## Getting Started

To get started, first install the dependencies:

```bash
bun install
```

Then add Database credentials to the `.env` file:

```bash
DATABASE_URL="prisma://<username>:<password>@<host>:<port>/<database>"
SHADOW_DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>"
```

Then run the migration and seed scripts:

```bash
bunx prisma migrate dev
```

Then, run the development server:

```bash
bun run dev
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
