import styles from './HourlyForecast.module.css';

const forecast = [
  { time: '09:00', temp: 18, icon: '☀️' },
  { time: '12:00', temp: 22, icon: '🌤️' },
  { time: '15:00', temp: 24, icon: '☀️' },
  { time: '18:00', temp: 21, icon: '🌥️' },
  { time: '21:00', temp: 17, icon: '🌙' },
];

const HourlyForecast = () => {
  return (
    <div className={styles.forecast}>
      <h3 className={styles.title}>Hourly forecast</h3>

      <ul className={styles.list}>
        {forecast.map((item) => (
          <li className={styles.item} key={item.time}>
            <span className={styles.time}>{item.time}</span>
            <span className={styles.icon} aria-hidden="true">
              {item.icon}
            </span>
            <span className={styles.temperature}>
              {item.temp}°C
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;