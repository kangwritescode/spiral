import { createTRPCRouter } from "~/server/api/trpc";
import { cocktailRouter } from "~/server/api/routers/cocktail";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cocktail: cocktailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
