import { Avatar, Box, Button, Divider } from '@mui/material';
import React from 'react'
import { type Drink } from '~/shared/types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface DrinkOptionProps {
    drink: Drink,
    onClick: (drink: string) => void
}

export const DrinkOption = ({ drink, onClick }: DrinkOptionProps) => {
    return (
        <>
            <Button
                sx={{
                    borderRadius: '0',
                    color: 'black',
                    display: 'flex',
                    fontSize: '17px',
                    height: '60px',
                    justifyContent: 'left',
                    padding: '10px',
                    position: 'relative',
                    textTransform: 'unset',
                }}
                fullWidth
                onClick={() => onClick(drink.strDrink)}>
                <Box
                    component={Avatar}
                    marginRight='15px'
                    src={drink.strDrinkThumb}
                />
                {drink.strDrink}
                <ArrowForwardIosIcon
                    sx={{
                        color: 'lightgray',
                        fontSize: '14px',
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }} />
            </Button>
            <Divider />
        </>
    );
};

export default DrinkOption



