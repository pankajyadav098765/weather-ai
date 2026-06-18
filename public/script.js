const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const errorDiv = document.getElementById('errorMessage');
const loadingDiv = document.getElementById('loading');
const resultDiv = document.getElementById('result');

const elements = {
  city: document.getElementById('cityDisplay'),
  icon: document.getElementById('iconDisplay'),
  temp: document.getElementById('tempDisplay'),
  condition: document.getElementById('conditionDisplay'),
  feels: document.getElementById('feelsDisplay'),
  humidity: document.getElementById('humidityDisplay'),
  wind: document.getElementById('windDisplay'),
  sunrise: document.getElementById('sunriseDisplay'),
  sunset: document.getElementById('sunsetDisplay'),
  clothing: document.getElementById('clothingDisplay'),
  umbrella: document.getElementById('umbrellaDisplay'),
  heat: document.getElementById('heatDisplay'),
  cold: document.getElementById('coldDisplay'),
  uv: document.getElementById('uvDisplay'),
  humidityAdvice: document.getElementById('humidityAdviceDisplay'),
  windAdvice: document.getElementById('windAdviceDisplay')
};

const iconMap = {
  'Clear': '☀️', 'Sunny': '☀️', 'Clouds': '☁️', 'Rain': '🌧',
  'Drizzle': '🌦', 'Thunderstorm': '⛈', 'Snow': '❄️', 'Mist': '🌫'
};

function getIcon(condition) {
  for (let key in iconMap) {
    if (condition.includes(key)) return iconMap[key];
  }
  return '🌤';
}

function showError(msg) {
  errorDiv.textContent = msg;
  errorDiv.classList.remove('hidden');
  resultDiv.classList.add('hidden');
  loadingDiv.classList.add('hidden');
}

function hideError() { errorDiv.classList.add('hidden'); }

function showLoading() {
  loadingDiv.classList.remove('hidden');
  resultDiv.classList.add('hidden');
  hideError();
}

function hideLoading() { loadingDiv.classList.add('hidden'); }

async function fetchWeather(city) {
  if (!city.trim()) { showError('Please enter a city.'); return; }
  showLoading();

  try {
    const res = await fetch(`/weather?city=${encodeURIComponent(city.trim())}`);
    const data = await res.json();

    if (!res.ok) {
      showError(data.error || 'Something went wrong.');
      return;
    }

    hideError();
    hideLoading();
    displayWeather(data);
  } catch {
    showError('Network error. Check your connection.');
  }
}

function displayWeather(d) {
  elements.city.textContent = d.city;
  elements.icon.textContent = getIcon(d.condition);
  elements.temp.textContent = d.temperature;
  elements.condition.textContent = d.description || d.condition;
  elements.feels.textContent = `Feels like ${d.feelsLike}°C`;
  elements.humidity.textContent = `${d.humidity}%`;
  elements.wind.textContent = `${d.windSpeed} km/h`;
  elements.sunrise.textContent = d.sunrise;
  elements.sunset.textContent = d.sunset;
  elements.clothing.textContent = d.clothingRecommendation;
  elements.umbrella.textContent = d.umbrellaRecommendation;
  elements.heat.textContent = d.heatWarning;
  elements.cold.textContent = d.coldWarning;
  elements.uv.textContent = d.uvAdvice;
  elements.humidityAdvice.textContent = d.humidityAdvice;
  elements.windAdvice.textContent = d.windAdvice;

  resultDiv.classList.remove('hidden');
}

searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));
cityInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') fetchWeather(cityInput.value); });
cityInput.addEventListener('input', hideError);