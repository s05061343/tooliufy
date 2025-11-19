import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton, Paper, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import WeatherCalendar from '../components/WeatherCalendar';
import { generateMonthData } from '../utils/weatherMock';

const WeatherPage = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const data = generateMonthData(year, month);
        setWeatherData(data);
    }, [currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 4,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decoration */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -100,
                    right: -100,
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(80px)',
                    zIndex: 0
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -50,
                    left: -50,
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(60px)',
                    zIndex: 0
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Header Navigation */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton
                        onClick={() => navigate('/')}
                        sx={{
                            color: 'white',
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                        }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2, color: 'white', fontWeight: 500, letterSpacing: 1 }}>
                        Weather Diary
                    </Typography>
                </Box>

                {/* Main Content */}
                <Paper elevation={0} sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}>
                    {/* Month Navigation & Title */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 4,
                        pb: 2,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <IconButton onClick={handlePrevMonth} sx={{ color: 'white' }}>
                            <ArrowBackIcon />
                        </IconButton>

                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                            <Typography variant="h3" sx={{
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}>
                                {monthNames[currentDate.getMonth()]}
                            </Typography>
                            <Chip
                                label={currentDate.getFullYear()}
                                sx={{
                                    mt: 1,
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            />
                        </Box>

                        <IconButton onClick={handleNextMonth} sx={{ color: 'white' }}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>

                    {/* Calendar */}
                    <WeatherCalendar
                        weatherData={weatherData}
                        year={currentDate.getFullYear()}
                        month={currentDate.getMonth()}
                    />

                    {/* Footer Quote */}
                    <Box sx={{ mt: 4, textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                            "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there is really no such thing as bad weather, only different kinds of good weather."
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default WeatherPage;
