import { Avatar, Button, Container, TextField, Typography } from "@mui/material";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { styled } from "styled-components";
import { type Drink } from "~/shared/types";

import { api } from "~/utils/api";

const StyledButton = styled(Button)`
    text-transform: unset;
    display: flex;
    justify-content: left;
    border-radius: 0;
`

const DrinkOption = ({ drink }: { drink: Drink }) => {
    return (
        <StyledButton fullWidth startIcon={<Avatar src={drink.strDrinkThumb} />}>
            <Typography>{drink.strDrink}</Typography>
        </StyledButton>
    );
};

const SearchInput = styled(TextField)``

const Home: NextPage = () => {
    const [searchText, setSearchText] = useState("");

    const drinks = api.cocktail.getDrinks.useQuery({ drink: searchText });

    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <>
            <Head>
                <title>Search Bar</title>
            </Head>
            <SearchInput onChange={onChangeText} fullWidth/>
            {drinks.data?.map((drink) => (
                <DrinkOption key={drink.idDrink} drink={drink} />
            ))}
        </>
    );
};

export default Home;
