import styles from './WeeklyForecast.module.css';

const forecast = [
  { day: 'Mon', icon: '☀️', temp: 23, min: 16 },
  { day: 'Tue', icon: '🌤️', temp: 21, min: 15 },
  { day: 'Wed', icon: '🌧️', temp: 17, min: 12 },
  { day: 'Thu', icon: '⛅', temp: 20, min: 14 },
  { day: 'Fri', icon: '☀️', temp: 24, min: 17 },
  { day: 'Sat', icon: '🌦️', temp: 19, min: 13 },
  { day: 'Sun', icon: '☀️', temp: 22, min: 15 },
];

const WeeklyForecast = () => {
  return (
    <div className={styles.forecast}>
      <h3 className={styles.title}>7-day forecast</h3>

      <ul className={styles.list}>
        {forecast.map((item) => (
          <li className={styles.item} key={item.day}>
            <span className={styles.day}>{item.day}</span>

            <span className={styles.icon} aria-hidden="true">
              {item.icon}
            </span>

            <span className={styles.temperatures}>
              {item.temp}° / {item.min}°
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyForecast;