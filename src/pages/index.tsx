import { Box, TextField } from "@mui/material";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { styled } from "styled-components";
import DrinkOption from "~/components/DrinkOption";
import SearchIcon from '@mui/icons-material/Search';

import { api } from "~/utils/api";

// Styled Components
const SearchInput = styled(TextField)`
    & div {
        border-radius: 10px;
        background: whitesmoke;
    }
`

const Home: NextPage = () => {
    // State
    const [searchText, setSearchText] = useState("");
    // Query
    const { data, status } = api.cocktail.getDrinks.useQuery({ drink: searchText });
    // Router
    const router = useRouter();

    // Handlers
    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const onClickHandler = (name: string) => {
        void router.push(`/detail/${name}`);
    }

    return (
        <>
            <Head>
                <title>Search Bar</title>
            </Head>
            <Box
                borderBottom='1px solid lightgray'
                padding={2}>
                <SearchInput
                    fullWidth
                    onChange={onChangeText}
                    size="small"
                    placeholder="Find a drink"
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ marginRight: 1, color: 'gray' }} />
                    }} />
            </Box>
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
