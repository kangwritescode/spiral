import { Avatar, Stack, Typography } from '@mui/material';
import { type GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { styled } from 'styled-components';

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

// Styled Components
const PageContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    padding: 20px;
`
const DrinkImage = styled(Avatar)`
    width: 40%;
    height: 40%;
`
const ChartContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const Legend = styled(Stack)`
    max-width: 70%;
`
const LegendItem = styled('div')`
    display: flex;
    align-items: center;
    margin-left: 8px;
    margin-bottom: 2px;
`
const LegendSquare = styled.span<{ squarecolor?: string }>`
    width: 20px;
    height: 20px;
    background-color: ${props => props.squarecolor as string};
    border-radius: 3px;
    margin-right: 6px;
`

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
                const measure = drink[`strMeasure${i}` as keyof Drink] as string

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
        <PageContainer>
            <DrinkImage src={drink?.strDrinkThumb} />
            <Typography
                marginTop='20px'
                fontSize='20px'
                fontWeight="bold">
                {drink?.strDrink}
            </Typography>
            <Typography
                marginLeft='4px'
                marginTop='30px'
                marginBottom='20px'
                fontSize='17px'
                fontWeight="bold"
                alignSelf='baseline'>
                Ingredients:
            </Typography>
            <ChartContainer>
                <Legend>
                    {ingredients.map((ingredient, index) => (
                        <LegendItem key={index}>
                            <LegendSquare
                                key={index}
                                squarecolor={ingredient.color}
                            />
                            <Typography fontSize={17}>
                                {`${ingredient.name || ''} (${ingredient.measure || ''})`}
                            </Typography>
                        </LegendItem>
                    ))}
                </Legend>
                <PieChart
                    style={{
                        height: 120,
                        width: 120
                    }}
                    data={pieChartData}
                />
            </ChartContainer>
            <Typography
                fontSize={17}
                marginTop='30px'
                marginX='20px'>
                {drink?.strInstructions}
            </Typography>
        </PageContainer>
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
