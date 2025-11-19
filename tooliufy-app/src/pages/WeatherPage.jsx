import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Grid, useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import WeatherCalendar from '../components/WeatherCalendar';
import OutfitDisplay from '../components/OutfitDisplay';
import { generateMonthData } from '../utils/weatherMock';

const WeatherPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [currentDate, setCurrentDate] = useState(new Date());
    const [weatherData, setWeatherData] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const data = generateMonthData(year, month);
        setWeatherData(data);

        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth()) {
            const todayData = data.find(d => d.day === today.getDate());
            setSelectedDay(todayData || data[0]);
        } else {
            setSelectedDay(data[0]);
        }
    }, [currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            width: '100vw',
            margin: 0,
            padding: 0,
            bgcolor: '#121212',
            color: 'white',
            position: 'relative',
            overflowX: 'hidden'
        }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 80% 20%, rgba(40,40,40,1) 0%, rgba(18,18,18,1) 60%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                p: { xs: 2, md: 4 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 10
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        onClick={() => navigate('/')}
                        sx={{
                            color: 'white',
                            mr: 2,
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '0',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                        }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{
                        fontFamily: '"Playfair Display", serif',
                        letterSpacing: '0.2em',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                    }}>
                        TOOLIUFY / WEATHER
                    </Typography>
                </Box>

                <Typography variant="caption" sx={{ opacity: 0.4, letterSpacing: '0.2em', display: { xs: 'none', sm: 'block' } }}>
                    EST. 2025 — VOL. 1
                </Typography>
            </Box>

            <Grid container sx={{
                minHeight: '100vh', width: '100%', zIndex: 1, display: 'flex',
                alignItems: 'flex-center',
                justifyContent: 'space-evenly',
            }}>

                <Grid item xs={12} md={6} sx={{
                    p: { xs: 2, md: 6 },
                    pt: { xs: 10, md: 12 },
                    display: 'flex',
                    flexDirection: 'column',
                    order: { xs: 2, md: 1 },
                    borderRight: { md: '1px solid rgba(255,255,255,0.05)' }
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        mb: 6,
                        borderBottom: '1px solid white',
                        pb: 2,
                    }}>
                        <Box>
                            <Typography variant="h1" sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 400,
                                fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                                lineHeight: 0.9,
                                letterSpacing: '-0.03em'
                            }}>
                                {monthNames[currentDate.getMonth()]}
                            </Typography>
                            <Typography variant="subtitle1" sx={{
                                color: 'rgba(255,255,255,0.4)',
                                letterSpacing: '0.4em',
                                fontSize: '1rem',
                                mt: 1
                            }}>
                                {currentDate.getFullYear()}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton onClick={handlePrevMonth} sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 0 }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <IconButton onClick={handleNextMonth} sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 0 }}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <WeatherCalendar
                        weatherData={weatherData}
                        year={currentDate.getFullYear()}
                        month={currentDate.getMonth()}
                        onDayClick={setSelectedDay}
                        selectedDay={selectedDay}
                    />
                </Grid>

                <Grid item xs={12} md={6} sx={{
                    bgcolor: '#161616',
                    order: { xs: 1, md: 2 },
                    borderBottom: { xs: '1px solid rgba(255,255,255,0.1)', md: 'none' },
                    position: 'relative'
                }}>
                    <Box sx={{
                        position: { md: 'sticky' },
                        top: 0,
                        height: { md: '100vh' },
                        width: '100%',
                        overflowY: 'auto',
                        pt: { xs: 10, md: 0 }
                    }}>
                        <OutfitDisplay weatherData={selectedDay} />
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
};

export default WeatherPage;
