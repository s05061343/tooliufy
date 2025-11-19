// src/utils/weatherMock.js

const WEATHER_TYPES = [
    { type: 'Sunny', icon: '☀️', desc: '晴朗', tempRange: [25, 32] },
    { type: 'Cloudy', icon: '☁️', desc: '多雲', tempRange: [20, 28] },
    { type: 'Rainy', icon: '🌧️', desc: '有雨', tempRange: [18, 24] },
    { type: 'PartlyCloudy', icon: '⛅', desc: '晴時多雲', tempRange: [22, 30] },
    { type: 'Thunderstorm', icon: '⛈️', desc: '雷雨', tempRange: [16, 22] },
];

export const generateMonthData = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const data = [];

    for (let i = 1; i <= daysInMonth; i++) {
        const randomWeather = WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)];
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
