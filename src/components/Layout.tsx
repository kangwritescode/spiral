import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import WifiIcon from '@mui/icons-material/Wifi';
import Battery6BarIcon from '@mui/icons-material/Battery6Bar';

export type LayoutProps = {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const router = useRouter();
    const isDetailPage = router.asPath.includes('detail');
    const pathSegments = router.asPath.split('/');
    
    return (
        <>
            <Box
                bgcolor='whitesmoke'
                borderBottom='1px solid lightgray'>
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
                        <WifiIcon fontSize='small' sx={{ marginRight: '-4px' }} />
                        <Battery6BarIcon fontSize='small' sx={{ transform: 'rotate(90deg)' }} />
                    </Stack>
                </Box>
                <Typography
                    fontSize='18px'
                    fontWeight='bold'
                    paddingBottom='10px'
                    textAlign='center'
                    variant='h1'
                >
                    {isDetailPage ? pathSegments[pathSegments.length - 1] : 'Thirsty'}
                </Typography>
            </Box>
            {children}
        </>
    )
}

export default Layout