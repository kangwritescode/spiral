import { Avatar, Button, Divider } from '@mui/material';
import React from 'react'
import { styled } from 'styled-components';
import { type Drink } from '~/shared/types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StyledButton = styled(Button)`
    position: relative;
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
    margin-right: 15px;
`

const IosRightArrow = styled(ArrowForwardIosIcon)`
    position: absolute; 
    color: lightgray;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
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
                onClick={() => onClick(drink.strDrink)}>
                <StyledAvatar src={drink.strDrinkThumb} />
                {drink.strDrink}
                <IosRightArrow />
            </StyledButton>
            <Divider />
        </>
    );
};

export default DrinkOption



