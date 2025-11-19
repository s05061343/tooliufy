import React, { useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, Paper, Fade } from '@mui/material';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

const OutfitDisplay = ({ weatherData }) => {
    const [gender, setGender] = useState('female');

    const handleGenderChange = (event, newGender) => {
        if (newGender !== null) {
            setGender(newGender);
        }
    };

    if (!weatherData) return null;

    const outfit = weatherData.outfitTags;
    const currentImage = gender === 'male' ? outfit.male : outfit.female;
    const currentTip = gender === 'male' ? outfit.tips.male : outfit.tips.female;

    return (
        <Paper
            elevation={0}
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', // Absolute vertical centering
                p: { xs: 3, md: 6 },
                bgcolor: 'transparent',
                color: 'white',
                position: 'relative'
            }}
        >
            {/* Decorative Line */}
            <Box sx={{
                width: '1px',
                height: '40px',
                bgcolor: 'rgba(255,255,255,0.3)',
                mb: 3,
                display: { xs: 'none', md: 'block' }
            }} />

            <Box sx={{ mb: 4, textAlign: 'center', zIndex: 2 }}>
                <Typography variant="overline" sx={{
                    letterSpacing: '0.3em',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.6)',
                    display: 'block',
                    mb: 1
                }}>
                    TODAY'S LOOK
                </Typography>
                <Typography variant="h1" sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1,
                    mb: 1
                }}>
                    {weatherData.desc}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 300, opacity: 0.8, letterSpacing: '0.1em' }}>
                    {weatherData.temp}
                </Typography>
            </Box>

            {/* Image Container - Absolute Centering */}
            <Box sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px', // Increased max width
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4
            }}>
                <Fade in={true} key={`${weatherData.day}-${gender}`} timeout={500}>
                    <Box
                        component="img"
                        src={currentImage}
                        alt={`${gender} outfit suggestion`}
                        sx={{
                            maxWidth: '100%',
                            maxHeight: { xs: '400px', md: '60vh' }, // Responsive height limit
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))', // Deeper shadow
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)'
                            }
                        }}
                        onError={(e) => {
                            console.error(`Failed to load image: ${currentImage}`);
                            e.target.style.display = 'none';
                        }}
                    />
                </Fade>
            </Box>

            <Box sx={{ textAlign: 'center', maxWidth: '400px', mb: 5, zIndex: 2 }}>
                <Typography variant="body1" sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.9)'
                }}>
                    "{currentTip}"
                </Typography>
            </Box>

            <ToggleButtonGroup
                value={gender}
                exclusive
                onChange={handleGenderChange}
                aria-label="gender selector"
                sx={{
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '0', // Editorial style: sharp corners
                    border: '1px solid rgba(255,255,255,0.1)',
                    '& .MuiToggleButton-root': {
                        color: 'rgba(255,255,255,0.4)',
                        border: 'none',
                        px: 4,
                        py: 1.5,
                        fontFamily: '"Playfair Display", serif',
                        letterSpacing: '0.1em',
                        transition: 'all 0.3s',
                        '&.Mui-selected': {
                            color: '#000',
                            bgcolor: '#fff',
                            '&:hover': {
                                bgcolor: '#f0f0f0',
                            }
                        },
                        '&:hover': {
                            color: '#fff',
                            bgcolor: 'rgba(255,255,255,0.1)',
                        }
                    }
                }}
            >
                <ToggleButton value="male" aria-label="male">
                    MEN
                </ToggleButton>
                <ToggleButton value="female" aria-label="female">
                    WOMEN
                </ToggleButton>
            </ToggleButtonGroup>
        </Paper>
    );
};

export default OutfitDisplay;
