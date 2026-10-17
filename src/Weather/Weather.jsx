import { useState } from 'react';
import styles from "./Weather.module.css"
import HourlyForecast from "../components/HourlyForecast/HourlyForecast"
import WeeklyForecast from "../components/WeeklyForecast/WeeklyForecast"
const Weather = ({ cities, onDeleteCity }) => {
  const [expandedCity, setExpandedCity] = useState(null);
  const [forecastType, setForecastType] = useState('hourly');

  const handleToggleDetails = (city) => {
    setExpandedCity((currentCity) =>
      currentCity === city ? null : city
    );
  };

  return (
    <section className={styles.weather} id="weather">
      <h2 className={styles.title}>Weather in your cities</h2>

      {cities.length === 0 ? (
        <p className={styles.weatherPlaceholder}>
          Your saved cities will appear here.
        </p>
      ) : (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <li className={styles.cityItem} key={city}>
              <button
                className={styles.cityName}
                type="button"
                onClick={() => handleToggleDetails(city)}
                aria-expanded={expandedCity === city}
              >
                {city}
              </button>

              <div className={styles.weatherInfo}>
                <span className={styles.weatherIcon} aria-hidden="true">
                  ☀️
                </span>
                <span className={styles.temperature}>22°C</span>
              </div>

              <p className={styles.weatherPlaceholder}>Sunny</p>

              {expandedCity === city && (
                <div className={styles.weatherDetails}>
                  <p>Feels like: 20°C</p>
                  <p>Wind speed: 12 km/h</p>
                  <p>Humidity: 55%</p>
                  <p>Conditions: Clear sky</p>

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
                    <HourlyForecast />
                  ) : (
                    <WeeklyForecast />
                  )}
                </div>
              )}

              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => onDeleteCity(city)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Weather;