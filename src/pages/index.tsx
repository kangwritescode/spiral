import { useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { Box, CircularProgress, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


import DrinkOption from "~/components/DrinkOption";
import { api } from "~/utils/api";
import { type Drink } from "~/shared/types";

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

            <Box
                borderBottom='1px solid lightgray'
                padding={2}>
                <TextField
                    fullWidth
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ marginRight: 1, color: 'gray' }} />,
                        endAdornment: (isNavigating || status === 'loading') ?
                            <CircularProgress color="inherit" size={20} /> : undefined
                    }}
                    onChange={onChangeText}
                    placeholder="Find a drink"
                    size="small"
                    sx={{
                        '& > div': {
                            borderRadius: '10px',
                            background: 'whitesmoke',
                        },
                    }} />
            </Box>
            {status === 'success' && data ?
                data.map((drink: Drink) => (
                    <DrinkOption
                        drink={drink}
                        key={drink.idDrink}
                        onClick={onClickHandler} />
                )) : undefined}
        </>
    );
};

export default Home;
