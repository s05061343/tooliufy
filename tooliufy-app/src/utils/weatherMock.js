// src/utils/weatherMock.js
import sunnyMale from '../assets/outfits/sunny_male.png';
import sunnyFemale from '../assets/outfits/sunny_female.png';
import rainyMale from '../assets/outfits/rainy_male.png';
import rainyFemale from '../assets/outfits/rainy_female.png';
import coldMale from '../assets/outfits/cold_male.png';
import coldFemale from '../assets/outfits/cold_female.png';

const WEATHER_TYPES = [
    {
        type: 'Sunny',
        icon: '☀️',
        desc: '晴朗',
        tempRange: [25, 32],
        outfitTags: {
            style: 'summer_casual',
            male: sunnyMale,
            female: sunnyFemale,
            tips: {
                male: '輕便的亞麻襯衫搭配短褲，戴上墨鏡展現夏日風情。',
                female: '清爽的連身裙搭配草帽，享受陽光下的優雅。'
            }
        }
    },
    {
        type: 'Cloudy',
        icon: '☁️',
        desc: '多雲',
        tempRange: [20, 28],
        outfitTags: {
            style: 'smart_casual',
            male: sunnyMale, // Fallback to sunny for cloudy/pleasant
            female: sunnyFemale,
            tips: {
                male: '舒適的休閒裝扮，適合多雲的午後。',
                female: '簡約的穿搭風格，展現自在的氣質。'
            }
        }
    },
    {
        type: 'Rainy',
        icon: '🌧️',
        desc: '有雨',
        tempRange: [18, 24],
        outfitTags: {
            style: 'rainy_chic',
            male: rainyMale,
            female: rainyFemale,
            tips: {
                male: '穿上風衣並攜帶雨傘，雨天也要保持帥氣。',
                female: '時尚的雨衣與雨靴，讓雨天成為你的伸展台。'
            }
        }
    },
    {
        type: 'PartlyCloudy',
        icon: '⛅',
        desc: '晴時多雲',
        tempRange: [22, 30],
        outfitTags: {
            style: 'casual',
            male: sunnyMale,
            female: sunnyFemale,
            tips: {
                male: '多層次穿搭，適應多變的天氣。',
                female: '輕薄的外套搭配洋裝，既防曬又時尚。'
            }
        }
    },
    {
        type: 'Thunderstorm',
        icon: '⛈️',
        desc: '雷雨',
        tempRange: [16, 22],
        outfitTags: {
            style: 'storm_protection',
            male: rainyMale,
            female: rainyFemale,
            tips: {
                male: '注意保暖與防雨，安全第一但風格不減。',
                female: '選擇防水材質的衣物，在雷雨中保持乾爽。'
            }
        }
    },
    {
        type: 'Cold',
        icon: '❄️',
        desc: '寒冷',
        tempRange: [10, 18],
        outfitTags: {
            style: 'winter_warmth',
            male: coldMale,
            female: coldFemale,
            tips: {
                male: '厚實的毛衣與圍巾，溫暖又紳士。',
                female: '時尚的大衣與長靴，展現冬季的優雅。'
            }
        }
    },
];

export const generateMonthData = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const data = [];

    for (let i = 1; i <= daysInMonth; i++) {
        // Simple logic to simulate seasons/weather
        let possibleWeather = WEATHER_TYPES;
        if (month < 2 || month > 10) { // Winter
            possibleWeather = WEATHER_TYPES.filter(w => w.type === 'Cold' || w.type === 'Rainy' || w.type === 'Cloudy');
        } else if (month > 4 && month < 9) { // Summer
            possibleWeather = WEATHER_TYPES.filter(w => w.type === 'Sunny' || w.type === 'PartlyCloudy' || w.type === 'Thunderstorm');
        }

        const randomWeather = possibleWeather[Math.floor(Math.random() * possibleWeather.length)];
        const minTemp = randomWeather.tempRange[0] + Math.floor(Math.random() * 3);
        const maxTemp = minTemp + Math.floor(Math.random() * 5) + 2;

        data.push({
            day: i,
            date: new Date(year, month, i),
            ...randomWeather,
            temp: `${minTemp}°C - ${maxTemp}°C`,
        });
    }
    return data;
};
