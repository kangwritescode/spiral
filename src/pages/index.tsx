import { useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { Box, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import WifiIcon from '@mui/icons-material/Wifi';
import Battery6BarIcon from '@mui/icons-material/Battery6Bar';

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

    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <>
            <Head>
                <title>Search Bar</title>
            </Head>
            <Box
                bgcolor='whitesmoke'>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    height='70px'
                    paddingLeft='20px'
                    paddingRight='16px'
                    paddingTop='10px'>
                    <Typography
                        fontSize='14px'
                        fontWeight='bold'>
                        {currentTime}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <WifiIcon fontSize='small' sx={{marginRight: '-4px'}} />
                        <Battery6BarIcon fontSize='small' sx={{ transform: 'rotate(90deg)'}} />
                    </Stack>
                </Box>
                <Typography
                    fontSize='18px'
                    fontWeight='bold'
                    paddingBottom='10px'
                    textAlign='center'
                    variant='h1'
                >
                    Thirsty
                </Typography>
            </Box>
            <Box
                borderTop='1px solid lightgray'
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
