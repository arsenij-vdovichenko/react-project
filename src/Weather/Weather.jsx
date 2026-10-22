import { useState, useEffect } from 'react';
import styles from "./Weather.module.css"
import HourlyForecast from "../components/HourlyForecast/HourlyForecast"
import WeeklyForecast from "../components/WeeklyForecast/WeeklyForecast"
import { getCurrentWeather } from '../services/weatherApi';

const Weather = ({ cities, onDeleteCity }) => {
  const [expandedCity, setExpandedCity] = useState(null);
  const [forecastType, setForecastType] = useState('hourly');
  const [weatherData, setWeatherData] = useState({});
  const [loadingCities, setLoadingCities] = useState({});
  const [errors, setErrors] = useState({});

  const loadCityWeather = async (city) => {
    setLoadingCities((prev) => ({
      ...prev,
      [city]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [city]: '',
    }));

    try {
      const data = await getCurrentWeather(city);

      setWeatherData((prev) => ({
        ...prev,
        [city]: data,
      }));

      setErrors((prev) => ({
        ...prev,
        [city]: '',
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [city]: error.message || 'Could not load weather.',
      }));
    } finally {
      setLoadingCities((prev) => ({
        ...prev,
        [city]: false,
      }));
    }
  };

  useEffect(() => {
    cities.forEach((city) => {
      if (city.trim()) {
        loadCityWeather(city);
      }
    });

    // Завантажуємо погоду, коли змінюється список міст.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  const handleRefreshAll = () => {
    cities.forEach((city) => {
      if (city.trim()) {
        loadCityWeather(city);
      }
    });
  };

  const handleToggleDetails = (city) => {
    setExpandedCity((currentCity) =>
      currentCity === city ? null : city
    );
  };

  const handleDeleteCity = (city) => {
    onDeleteCity(city);

    if (expandedCity === city) {
      setExpandedCity(null);
    }
  };

  return (
    <section className={styles.weather} id="weather">
      <h2 className={styles.title}>Weather in your cities</h2>

      <button
        className={styles.forecastButton}
        type="button"
        onClick={handleRefreshAll}
        disabled={cities.length === 0}
      >
        Refresh all weather
      </button>

      {cities.length === 0 ? (
        <p className={styles.weatherPlaceholder}>
          Your saved cities will appear here.
        </p>
      ) : (
        <ul className={styles.cityList}>
          {cities.map((city) => {
            const data = weatherData[city];
            const isLoading = Boolean(loadingCities[city]);
            const error = errors[city];

            return (
              <li className={styles.cityItem} key={city}>
                <button
                  className={styles.cityName}
                  type="button"
                  onClick={() => handleToggleDetails(city)}
                  aria-expanded={expandedCity === city}
                >
                  {city}
                </button>

                {isLoading && !data ? (
                  <p className={styles.weatherPlaceholder}>
                    Loading weather...
                  </p>
                ) : error && !data ? (
                  <p role="alert">{error}</p>
                ) : data ? (
                  <>
                    <div className={styles.weatherInfo}>
                      <img
                        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                        alt={data.description}
                        width="60"
                        height="60"
                      />

                      <span className={styles.temperature}>
                        {data.temperature}°C
                      </span>
                    </div>

                    <p className={styles.weatherPlaceholder}>
                      {data.description}
                    </p>

                    {error && (
                      <p role="alert">
                        Could not refresh weather: {error}
                      </p>
                    )}
                  </>
                ) : (
                  <p className={styles.weatherPlaceholder}>
                    Weather data unavailable.
                  </p>
                )}

                <button
                  className={styles.forecastButton}
                  type="button"
                  onClick={() => loadCityWeather(city)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>

                {expandedCity === city && data && (
                  <div className={styles.weatherDetails}>
                    <p>Feels like: {data.feelsLike}°C</p>
                    <p>Wind speed: {data.windSpeed} km/h</p>
                    <p>Humidity: {data.humidity}%</p>
                    <p>Conditions: {data.description}</p>

                    <div className={styles.forecastButtons}>
                      <button
                        className={styles.forecastButton}
                        type="button"
                        onClick={() => setForecastType('hourly')}
                        aria-pressed={forecastType === 'hourly'}
                      >
                        Hourly
                      </button>

                      <button
                        className={styles.forecastButton}
                        type="button"
                        onClick={() => setForecastType('weekly')}
                        aria-pressed={forecastType === 'weekly'}
                      >
                        7 days
                      </button>
                    </div>

                    {forecastType === 'hourly' ? (
                      <HourlyForecast city={city} />
                    ) : (
                      <WeeklyForecast city={city} />
                    )}
                  </div>
                )}

                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={() => handleDeleteCity(city)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Weather;