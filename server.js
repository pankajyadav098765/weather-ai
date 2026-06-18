// server.js - Express server for Weather AI
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city || city.trim() === '') {
    return res.status(400).json({ error: 'City name is required.' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Weather service not configured.' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: `City "${city}" not found.` });
      }
      return res.status(response.status).json({ error: 'Weather API error.' });
    }

    const data = await response.json();
    const weatherData = formatWeatherData(data);
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Try again later.' });
  }
});

function formatWeatherData(data) {
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6);
  const condition = data.weather[0].main;
  const description = data.weather[0].description;
  const cityName = data.name;
  const country = data.sys.country;

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  let clothing = '';
  if (temp < 10) clothing = '🧥 Heavy Jacket, Gloves, Sweater';
  else if (temp < 20) clothing = '🧥 Hoodie, Light Jacket';
  else if (temp <= 30) clothing = '👕 T-shirt, Jeans';
  else clothing = '👕 Light Cotton, Cap, Drink Water';

  const rain = condition.toLowerCase().includes('rain') ? '☂ Bring an umbrella!' : '☀ No umbrella needed.';

  let heat = '✅ Temperature is pleasant.';
  if (temp >= 35) heat = '🔥 Extreme heat! Stay hydrated.';
  else if (temp >= 30) heat = '🔥 High temperature. Stay hydrated.';

  let cold = '✅ Temperature is comfortable.';
  if (temp <= 0) cold = '❄️ Extreme cold! Stay indoors.';
  else if (temp <= 5) cold = '❄️ Very cold! Dress warmly.';
  else if (temp < 10) cold = '❄️ Chilly. Wear a warm jacket.';

  let uv = '🌥 Low UV risk.';
  if (condition === 'Clear' || condition === 'Sunny') uv = '☀️ High UV. Wear sunscreen.';
  else if (condition === 'Clouds') uv = '🌤 Moderate UV. Sunscreen recommended.';

  let humidityAdvice = humidity > 80 ? '💦 Feels sticky outside.' : '🌬 Comfortable humidity.';
  let windAdvice = windSpeed > 25 ? '💨 Strong winds! Avoid loose clothing.' : '🍃 Light breeze.';

  return {
    city: `${cityName}, ${country}`,
    temperature: temp,
    feelsLike,
    condition,
    description,
    humidity,
    windSpeed,
    sunrise,
    sunset,
    clothingRecommendation: clothing,
    umbrellaRecommendation: rain,
    heatWarning: heat,
    coldWarning: cold,
    uvAdvice: uv,
    humidityAdvice,
    windAdvice
  };
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));