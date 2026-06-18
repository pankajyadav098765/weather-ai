# 🌤 Weather AI

A smart weather app that gives real-time weather data and personalized recommendations (clothing, umbrella, heat/cold warnings, UV advice, etc.).

## Live Demo

👉 [https://weather-ai-6kgg.onrender.com](https://weather-ai-6kgg.onrender.com)

## Features

- 🌍 Get weather for any city
- 🌡️ Temperature, feels like, humidity, wind speed
- 🌅 Sunrise and sunset times
- 👕 Clothing recommendations based on temperature
- ☂️ Umbrella suggestion
- 🔥 Heat & ❄️ cold warnings
- 🌞 Basic UV advice
- 💧 Humidity and 💨 wind advice
- Responsive UI with loading spinner and error handling

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Deployment**: Render
- **API**: OpenWeatherMap

## How to Run Locally

1. Clone this repo
2. Run `npm install`
3. Create a `.env` file with `OPENWEATHER_API_KEY=your_key`
4. Run `node server.js`
5. Open `http://localhost:3000`

## Environment Variables

- `OPENWEATHER_API_KEY` – your OpenWeatherMap API key