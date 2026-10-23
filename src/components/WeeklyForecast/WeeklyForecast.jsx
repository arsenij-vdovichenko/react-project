
import { useEffect, useState } from 'react';
import styles from './WeeklyForecast.module.css';
import { getForecast } from '../../services/forecastApi';

const WeeklyForecast = ({ city }) => {
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;

    const loadForecast = async () => {
      try {
        setIsLoading(true);
        setError('');

        const forecastItems = await getForecast(city);

        // Групуємо записи прогнозу за календарною датою.
        const groupedByDate = forecastItems.reduce((groups, item) => {
          const date = item.dateTime.slice(0, 10);

          if (!groups[date]) {
            groups[date] = [];
          }

          groups[date].push(item);
          return groups;
        }, {});

        // Для кожного дня обчислюємо мінімальну й максимальну температуру.
        const dailyForecast = Object.entries(groupedByDate)
          .slice(0, 5)
          .map(([date, items]) => {
            const temperatures = items.map(
              (item) => item.temperature
            );

            // Беремо запис, найближчий до середини дня, як іконку дня.
            const representativeItem =
              items[Math.floor(items.length / 2)];

            const dateForLabel = new Date(`${date}T12:00:00`);

            return {
              date,
              day: dateForLabel.toLocaleDateString('en', {
                weekday: 'short',
              }),
              min: Math.min(...temperatures),
              max: Math.max(...temperatures),
              icon: representativeItem.icon,
              description: representativeItem.description,
            };
          });

        if (!isCancelled) {
          setDays(dailyForecast);
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

    if (city) {
      loadForecast();
    }

    return () => {
      isCancelled = true;
    };
  }, [city]);

  if (isLoading) {
    return <p>Loading daily forecast...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <div className={styles.forecast}>
      <h3 className={styles.title}>5-day forecast</h3>

      <ul className={styles.list}>
        {days.map((item) => (
          <li className={styles.item} key={item.date}>
            <span className={styles.day}>
              {item.day}
            </span>

            <img
              className={styles.icon}
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description}
              width="40"
              height="40"
            />

            <span className={styles.temperatures}>
  <span className={styles.maxTemperature}>
    {item.max}°
  </span>
  <span className={styles.minTemperature}>
    {item.min}°
  </span>
</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyForecast;
