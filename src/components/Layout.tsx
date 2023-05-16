import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import WifiIcon from '@mui/icons-material/Wifi';
import Battery6BarIcon from '@mui/icons-material/Battery6Bar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';

export type LayoutProps = {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const router = useRouter();
    const isDetailPage = router.asPath.includes('detail');
    const title = isDetailPage ? decodeURIComponent(router.asPath.split('/')[2] as string) : 'Thirsty';

    return (
        <>
            <Box
                bgcolor='whitesmoke'
                borderBottom='1px solid lightgray'
                position='relative'>
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
                        <WifiIcon
                            fontSize='small'
                            sx={{ marginRight: '-4px' }} />
                        <Battery6BarIcon
                            fontSize='small'
                            sx={{ transform: 'rotate(90deg)' }} />
                    </Stack>
                </Box>
                {isDetailPage && (
                    <Link href="/">
                        <Button
                            startIcon={<ArrowBackIosIcon sx={{ marginRight: '-10px' }} />}
                            sx={{
                                bottom: 4,
                                left: 14,
                                position: 'absolute',
                                '&:hover': {
                                    backgroundColor: 'unset',
                                },
                            }}>
                            <Typography textTransform='none'>Thirsty</Typography>
                        </Button>
                    </Link>

                )}
                <Typography
                    fontSize='18px'
                    fontWeight='bold'
                    paddingBottom='10px'
                    textAlign='center'
                    variant='h1'
                >
                    {title}
                </Typography>
            </Box>
            {children}
        </>
    )
}

export default Layout