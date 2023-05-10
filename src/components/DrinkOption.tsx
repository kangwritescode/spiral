import { Avatar, Button, Divider } from '@mui/material';
import React from 'react'
import { styled } from 'styled-components';
import { type Drink } from '~/shared/types';

const StyledButton = styled(Button)`
    text-transform: unset;
    display: flex;
    justify-content: left;
    border-radius: 0;
    color: black;
    padding: 10px;
    height: 60px;
    font-size: 17px;
`

const StyledAvatar = styled(Avatar)`
    margin-right: 7px;
`

interface DrinkOptionProps {
    drink: Drink,
    onClick: (drink: string) => void
}

export const DrinkOption = ({ drink, onClick }: DrinkOptionProps) => {
    return (
        <>
            <StyledButton
                fullWidth
                onClick={() => onClick(drink.strDrink)}
                startIcon={<StyledAvatar src={drink.strDrinkThumb}
                />}>
                {drink.strDrink}
            </StyledButton>
            <Divider />
        </>
    );
};

export default DrinkOption



