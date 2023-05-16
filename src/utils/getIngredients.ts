import { type Drink, type Ingredient } from "~/shared/types";
import { convertToTsp } from "./convertToTsp";
import { generatePastelColor } from "./generatePastelColor";

export const getIngredients = (drink: Drink) => {
    const ingredients: Ingredient[] = [];
    for (let i = 1; i <= 15; i++) {
        if (drink) {
            const ingredient: Ingredient = {}

            const name = drink[`strIngredient${i}` as keyof Drink] as string;
            const measure = drink[`strMeasure${i}` as keyof Drink] as string;

            if (name && measure) {
                ingredient.name = name;
                ingredient.measure = measure.trim();
                ingredient.teaspoons = convertToTsp(measure);
                ingredient.color = generatePastelColor();
                ingredients.push(ingredient);
            }
        }
    }
    return ingredients;
}