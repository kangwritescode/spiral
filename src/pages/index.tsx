import { useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { styled } from "styled-components";

import { Box, CircularProgress, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import DrinkOption from "~/components/DrinkOption";
import { api } from "~/utils/api";

// Styled Components
const SearchInput = styled(TextField)`
    & div {
        border-radius: 10px;
        background: whitesmoke;
    }
`
const SearchContainer = styled(Box)`
    border-bottom: 1px solid lightgray;
    padding: 16px;
`

const Home: NextPage = () => {
    // State
    const [searchText, setSearchText] = useState("");
    const [isNavigating, setIsNavigating] = useState(false);
    // Query
    const { data, status } = api.cocktail.getDrinks.useQuery({ drink: searchText });
    // Router
    const router = useRouter();

    // Handlers
    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const onClickHandler = (name: string) => {
        setIsNavigating(true);
        void router.push(`/detail/${name}`);
    }

    return (
        <>
            <Head>
                <title>Search Bar</title>
            </Head>
            <SearchContainer>
                <SearchInput
                    fullWidth
                    onChange={onChangeText}
                    size="small"
                    placeholder="Find a drink"
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ marginRight: 1, color: 'gray' }} />,
                        endAdornment: (isNavigating || status === 'loading') ? <CircularProgress color="inherit" size={20} /> : undefined
                    }} />
            </SearchContainer>
            {status === 'success' && data ?
                data.map((drink) => (
                    <DrinkOption
                        key={drink.idDrink}
                        drink={drink}
                        onClick={onClickHandler} />
                )) : undefined}
        </>
    );
};

export default Home;
