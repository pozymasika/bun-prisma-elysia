import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client/edge";
import { swagger } from "@elysiajs/swagger";

const setup = (app: Elysia) => app.decorate("db", new PrismaClient());

const app = new Elysia()
  // 🎬 Movie API routes 🎬
  .use(
    swagger({
      path: "/v1/swagger",
    })
  )
  .use(setup)
  .group("/search", (app) => {
    return app
      .get("/", async ({ query, db }) => db.movie.findMany())
      .guard(
        {
          schema: {
            query: t.Object({
              q: t.String(),
            }),
          },
        },
        (app) =>
          app
            .get("/movie", async ({ query, db }) => {
              return db.movie.findMany({
                where: {
                  title: {
                    contains: query.q,
                  },
                },
              });
            })
            .get("/tv", async ({ query, db }) => {
              return db.movie.findMany({
                where: {
                  title: {
                    contains: query.q,
                  },
                  type: "series",
                },
              });
            })
            .get("/person", async ({ query, db }) => {
              return db.person.findMany({
                where: {
                  name: {
                    contains: query.q,
                  },
                },
              });
            })
            // .get("/company", ({ query }) => `query: ${query.q}`)
            .get("/episode", async ({ query, db }) => {
              return db.episode.findMany({
                where: {
                  title: {
                    contains: query.q,
                  },
                },
              });
            })
            .get("/review", async ({ query, db }) => {
              return db.review.findMany({
                where: {
                  comment: {
                    contains: query.q,
                  },
                },
              });
            })
            .get("/award", async ({ query, db }) => {
              return db.award.findMany({
                where: {
                  name: {
                    contains: query.q,
                  },
                },
              });
            })
      );
  })
  .group("/title/:id", (app) => {
    return app
      .get("/", async ({ params, db }) => {
        return db.movie.findUnique({
          where: {
            id: parseInt(params.id, 10),
          },
        });
      })
      .get("/episodes", async ({ params, db }) => {
        return db.movie.findMany({
          where: {
            movieId: parseInt(params.id, 10),
          },
        });
      })
      .get("/cast", async ({ params, db }) => {
        return db.person.findMany({
          where: {
            movies: {
              some: {
                id: parseInt(params.id, 10),
              },
            },
          },
        });
      })
      .get("/reviews", async ({ params, db }) => {
        return db.review.findMany({
          where: {
            movieId: parseInt(params.id, 10),
          },
        });
      })
      .get("/awards", async ({ params, db }) => {
        return db.award.findMany({
          where: {
            movieId: parseInt(params.id, 10),
          },
        });
      });
  })

  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
