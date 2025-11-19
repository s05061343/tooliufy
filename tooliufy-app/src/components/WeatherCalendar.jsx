import React from 'react';
import { Box, Grid, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';

const WeatherCalendar = ({ weatherData, year, month }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Create empty slots for days before the 1st of the month
    const emptySlots = Array(firstDayOfMonth).fill(null);

    return (
        <Box sx={{ width: '100%' }}>
            {/* Weekday Headers */}
            <Grid container spacing={1} sx={{ mb: 2 }}>
                {weekDays.map((day) => (
                    <Grid item xs={12 / 7} key={day} sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle2" sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            letterSpacing: '0.1em'
                        }}>
                            {day}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={1}>
                {emptySlots.map((_, index) => (
                    <Grid item xs={12 / 7} key={`empty-${index}`} />
                ))}

                {weatherData.map((dayData) => (
                    <Grid item xs={12 / 7} key={dayData.day}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 1,
                                height: isMobile ? '80px' : '120px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <Typography variant="caption" sx={{
                                alignSelf: 'flex-start',
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontWeight: 'bold'
                            }}>
                                {dayData.day}
                            </Typography>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{
                                    fontSize: isMobile ? '1.5rem' : '2.5rem',
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                }}>
                                    {dayData.icon}
                                </Typography>
                                <Typography variant="body2" sx={{
                                    fontSize: isMobile ? '0.6rem' : '0.75rem',
                                    color: 'white',
                                    fontWeight: 500,
                                    mt: 0.5
                                }}>
                                    {dayData.desc}
                                </Typography>
                            </Box>

                            {!isMobile && (
                                <Typography variant="caption" sx={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 600,
                                    bgcolor: 'rgba(0,0,0,0.1)',
                                    px: 1,
                                    borderRadius: 1
                                }}>
                                    {dayData.temp}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WeatherCalendar;
