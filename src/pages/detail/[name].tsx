import { Box, Stack, Typography } from '@mui/material';
import { type GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';

import { type Drink, type DrinkResponse } from '~/shared/types';
import { convertToTsp } from '~/utils/convertToTsp';
import { generatePastelColor } from '~/utils/generatePastelColor';

// Types
interface DetailsPageProps {
    drink?: Drink;
}
interface Ingredient {
    name?: string;
    measure?: string;
    color?: string;
    teaspoons?: number;
}

function DetailPage({ drink }: DetailsPageProps) {

    // State
    const [colors, setColors] = React.useState<string[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        // Generate random pastel colors
        const colors: string[] = [];
        for (let i = 0; i < 15; i++) {
            colors.push(generatePastelColor());
        }
        setColors(colors);
    }, []);

    useEffect(() => {
        // Generate ingredients from drink data
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
                    ingredient.color = colors[i - 1];
                    ingredients.push(ingredient);
                }
            }
        }
        setIngredients(ingredients);
    }, [drink, colors]);

    // Generate data for pie chart
    const pieChartData = ingredients.map((ingredient) => ({
        title: ingredient.name || '',
        value: ingredient.teaspoons || 0,
        color: ingredient.color || '',
    }));

    return (
        <Box
            alignItems='center'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            marginTop='10px'
            padding='20px'
            width='100%'
        >
            <Box
                borderRadius='50%'
                component='img'
                height='40%'
                src={drink?.strDrinkThumb}
                width='40%'
            />
            <Typography
                fontSize='20px'
                fontWeight='bold'
                marginTop='20px'
            >
                {drink?.strDrink}
            </Typography>
            <Typography
                alignSelf='baseline'
                fontSize='17px'
                fontWeight='bold'
                marginBottom='20px'
                marginLeft='4px'
                marginTop='30px'
            >
                Ingredients:
            </Typography>
            <Box
                display='flex'
                justifyContent='space-between'
                width='100%'
            >
                <Stack maxWidth='70%'>
                    {ingredients.map((ingredient, index) => (
                        <Box
                            alignItems='center'
                            display='flex'
                            key={index}
                            marginBottom='2px'
                            marginLeft='8px'
                        >
                            <Box
                                borderRadius='3px'
                                bgcolor={ingredient.color}
                                height='20px'
                                marginRight='6px'
                                width='20px'
                            />
                            <Typography fontSize={17}>
                                {`${ingredient.name || ''} (${ingredient.measure || ''})`}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
                <PieChart
                    data={pieChartData}
                    style={{
                        height: 120,
                        width: 120,
                    }}
                />
            </Box>
            <Typography
                fontSize={17}
                marginX='20px'
                marginTop='30px'
            >
                {drink?.strInstructions}
            </Typography>
        </Box>
    )
}

export default DetailPage

export const getServerSideProps: GetServerSideProps<DetailsPageProps> = async ({ params }) => {
    const name = params?.name as string;
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json() as DrinkResponse;
        const drink = data.drinks[0];
        return {
            props: { drink },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {},
        };
    }
}
