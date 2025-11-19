import React from 'react';
import { Box, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';

const WeatherCalendar = ({ weatherData, year, month, onDayClick, selectedDay }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Bilingual Weekdays
    const weekDays = [
        { en: 'SUN', zh: '週日' },
        { en: 'MON', zh: '週一' },
        { en: 'TUE', zh: '週二' },
        { en: 'WED', zh: '週三' },
        { en: 'THU', zh: '週四' },
        { en: 'FRI', zh: '週五' },
        { en: 'SAT', zh: '週六' }
    ];

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const emptySlots = Array(firstDayOfMonth).fill(null);

    return (
        <Box sx={{ width: '100%' }}>
            {/* Weekday Headers - Minimalist */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 1,
                mb: 2,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                pb: 1
            }}>
                {weekDays.map((day) => (
                    <Box key={day.en} sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" sx={{
                            color: 'rgba(255, 255, 255, 0.4)',
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em',
                            display: 'block'
                        }}>
                            {day.en} <span style={{ opacity: 0.5, fontSize: '0.6rem' }}>{day.zh}</span>
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 1
            }}>
                {emptySlots.map((_, index) => (
                    <Box key={`empty-${index}`} />
                ))}

                {weatherData.map((dayData) => {
                    const isSelected = selectedDay && selectedDay.day === dayData.day;
                    // Get weekday index for this specific date
                    const dayOfWeekIndex = new Date(year, month, dayData.day).getDay();
                    const dayOfWeek = weekDays[dayOfWeekIndex];

                    return (
                        <Paper
                            key={dayData.day}
                            elevation={0}
                            onClick={() => onDayClick(dayData)}
                            sx={{
                                p: 1.5,
                                height: 'auto',
                                aspectRatio: '1/1', // Force square aspect ratio
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between', // Space out content
                                backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(10px)',
                                border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '0px', // Sharp corners for editorial look
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                    backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 10px 20px -10px rgba(0,0,0,0.5)'
                                }
                            }}
                        >
                            {/* Top Row: Date & Weekday */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                                <Typography variant="h3" sx={{
                                    fontFamily: '"Playfair Display", serif',
                                    fontWeight: 700,
                                    fontSize: { xs: '1.2rem', md: '2rem', lg: '2.5rem' },
                                    lineHeight: 0.8,
                                    color: isSelected ? '#000' : '#fff'
                                }}>
                                    {dayData.day}
                                </Typography>

                                {/* Show weekday on larger cells for extra context */}
                                <Typography variant="caption" sx={{
                                    fontSize: '0.6rem',
                                    color: isSelected ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    display: { xs: 'none', sm: 'block' }
                                }}>
                                    {dayOfWeek.en} <span style={{ opacity: 0.7 }}>{dayOfWeek.zh}</span>
                                </Typography>
                            </Box>

                            {/* Center: Weather Icon (Watermark style) */}
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                opacity: isSelected ? 0.1 : 0.15,
                                pointerEvents: 'none',
                                zIndex: 1
                            }}>
                                <Typography sx={{ fontSize: { xs: '2rem', md: '4rem', lg: '5rem' } }}>
                                    {dayData.icon}
                                </Typography>
                            </Box>

                            {/* Bottom: Temp & Status */}
                            <Box sx={{ zIndex: 2, textAlign: 'right' }}>
                                <Typography variant="caption" sx={{
                                    display: 'block',
                                    fontSize: { xs: '0.6rem', md: '0.75rem' },
                                    fontWeight: 500,
                                    color: isSelected ? '#000' : 'rgba(255,255,255,0.8)',
                                    letterSpacing: '0.05em'
                                }}>
                                    {dayData.temp.split(' - ')[0]}° / {dayData.temp.split(' - ')[1]}°
                                </Typography>
                            </Box>
                        </Paper>
                    );
                })}
            </Box>
        </Box>
    );
};

export default WeatherCalendar;
