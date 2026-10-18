const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getCurrentWeather = async (city) => {
  if (!API_KEY) {
    throw new Error('Weather API key is missing. Check your .env file.');
  }

  const url = new URL(
    'https://api.openweathermap.org/data/2.5/weather'
  );

  url.searchParams.set('q', city);
  url.searchParams.set('appid', API_KEY);
  url.searchParams.set('units', 'metric');

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Check the city name.');
    }

    if (response.status === 401) {
      throw new Error('Invalid API key or API access is not active yet.');
    }

    throw new Error('Could not load weather. Please try again.');
  }

  const data = await response.json();

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
};