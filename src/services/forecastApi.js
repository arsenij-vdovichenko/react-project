
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getForecast = async (city) => {
  if (!API_KEY) {
    throw new Error(
      'Weather API key is missing. Check your .env file.'
    );
  }

  const url = new URL(
    'https://api.openweathermap.org/data/2.5/forecast'
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
      throw new Error(
        'Invalid API key or forecast API access is not active.'
      );
    }

    throw new Error('Could not load forecast. Please try again.');
  }

  const result = await response.json();

  return result.list.map((item) => ({
    dateTime: item.dt_txt,
    temperature: Math.round(item.main.temp),
    description: item.weather[0].description,
    icon: item.weather[0].icon,
  }));
};
