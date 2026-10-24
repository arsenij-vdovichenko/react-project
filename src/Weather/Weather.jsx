
import { useState, useEffect } from 'react';
import styles from './Weather.module.css';
import HourlyForecast from '../components/HourlyForecast/HourlyForecast';
import WeeklyForecast from '../components/WeeklyForecast/WeeklyForecast';
import { getCurrentWeather } from '../services/weatherApi';

const Weather = ({ cities, onDeleteCity }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [loadingCities, setLoadingCities] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cities.length === 0) {
      setSelectedCity(null);
      return;
    }

    if (!selectedCity || !cities.includes(selectedCity)) {
      setSelectedCity(cities[0]);
    }
  }, [cities, selectedCity]);

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
      if (city.trim() && !weatherData[city]) {
        loadCityWeather(city);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  const handleRefreshAll = () => {
    cities.forEach((city) => loadCityWeather(city));
  };

  const handleDeleteCity = (city) => {
    onDeleteCity(city);

    if (selectedCity === city) {
      setSelectedCity(
        cities.find((item) => item !== city) || null
      );
    }
  };

  const selectedWeather = selectedCity
    ? weatherData[selectedCity]
    : null;

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
        <>
          <ul className={styles.cityList}>
            {cities.map((city) => {
              const data = weatherData[city];
              const isLoading = Boolean(loadingCities[city]);
              const error = errors[city];

              return (
                <li
                  className={`${styles.cityItem} ${
                    selectedCity === city ? styles.selectedCity : ''
                  }`}
                  key={city}
                >
                  <button
                    className={styles.cityName}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    aria-pressed={selectedCity === city}
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

                      <div className={styles.cityDetails}>
                        <p>Feels like: {data.feelsLike}°C</p>
                        <p>Humidity: {data.humidity}%</p>
                        <p>Wind speed: {data.windSpeed} km/h</p>
                      </div>
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

          {selectedCity && selectedWeather && (
            <div className={styles.forecastDashboard}>
              <section className={styles.forecastSection}>
                <h3 className={styles.forecastTitle}>
                  Hourly Forecast — {selectedCity}
                </h3>

                <HourlyForecast city={selectedCity} />
              </section>

              <section className={styles.forecastSection}>
                <h3 className={styles.forecastTitle}>
                  5-Day Forecast — {selectedCity}
                </h3>

                <WeeklyForecast city={selectedCity} />
              </section>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Weather;
