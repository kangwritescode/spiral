import { Box, Stack, Typography } from '@mui/material';
import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { api } from '~/utils/api';
import { type Drink } from '~/shared/types';

// Types
interface DetailsPageProps {
    drinkName: string;
}

function DetailPage({ drinkName }: DetailsPageProps) {

    // Data
    const { data } = api.cocktail.getDrinks.useQuery({ drink: drinkName });
    const drink = (data ? data[0] : {}) as Drink;

    const ingredients = getIngredients(drink);

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

import { createServerSideHelpers } from '@trpc/react-query/server';
import { type GetServerSidePropsContext } from 'next';
import { appRouter } from 'src/server/api/root';
import superjson from 'superjson';
import { createTRPCContext } from 'src/server/api/trpc'
import { getIngredients } from '~/utils/getIngredients';

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { query } = context;
    const drinkName = query.name as string;

    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: createTRPCContext(),
        transformer: superjson,
    });

    await helpers.cocktail.getDrinks.prefetch({ drink: drinkName })

    return {
        props: {
            trpcState: helpers.dehydrate(),
            drinkName: drinkName,
        }
    }
}
