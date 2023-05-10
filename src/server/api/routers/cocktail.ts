import axios from "axios";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Drink } from "~/shared/types";

interface DrinkResponse {
    drinks: Drink[];
}

export const cocktailRouter = createTRPCRouter({
    getDrinks: publicProcedure
        .input(z.object({ drink: z.string() }))
        .query(async ({ input }) => {
            try {
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.drink}`);
                const data: DrinkResponse = response.data as { drinks: Drink[] };
                
                return data.drinks;

            } catch (error) {
                console.log(error);
            }
        }),
});
