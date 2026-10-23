import { useEffect, useState } from 'react';
import styles from './HourlyForecast.module.css';
import { getForecast } from '../../services/forecastApi';

const HourlyForecast = ({ city }) => {
const [forecast, setForecast] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
let isCancelled = false;

const loadForecast = async () => {
  try {
    setIsLoading(true);
    setError('');

    const data = await getForecast(city);

    if (!isCancelled) {
      setForecast(data.slice(0, 8));
    }
  } catch (error) {
    if (!isCancelled) {
      setError(error.message || 'Could not load forecast.');
    }
  } finally {
    if (!isCancelled) {
      setIsLoading(false);
    }
  }
};

loadForecast();

return () => {
  isCancelled = true;
};

}, [city]);

if (isLoading) {
return <p className={styles.message}>Loading hourly forecast...</p>;
}

if (error) {
return (
<p className={styles.error} role="alert">
{error}
</p>
);
}

if (forecast.length === 0) {
return <p className={styles.message}>No forecast available.</p>;
}

return (
<div className={styles.forecast}>
<h3 className={styles.title}>Hourly Forecast</h3>

  <ul className={styles.list}>
    {forecast.map((item) => (
      <li className={styles.item} key={item.dateTime}>
        <span className={styles.time}>
  {new Date(`${item.dateTime.replace(' ', 'T')}Z`).toLocaleTimeString('en-IE', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })}
</span>

        <img
          className={styles.icon}
          src={`https://openweathermap.org/img/wn/${item.icon}.png`}
          alt={item.description}
          width="48"
          height="48"
        />

        <span className={styles.temperature}>
          {item.temperature}°C
        </span>

        <span className={styles.description}>
          {item.description}
        </span>
      </li>
    ))}
  </ul>
</div>

);
};

export default HourlyForecast;