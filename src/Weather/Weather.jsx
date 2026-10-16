import styles from "./Weather.module.css"
const Weather = ({ cities, onDeleteCity }) => {
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
              <span className={styles.cityName}>{city}</span>

              <div className={styles.weatherInfo}>
                <span className={styles.weatherIcon} aria-hidden="true">
                  ☀️
                </span>

                <span className={styles.temperature}>--°C</span>
              </div>

              <p className={styles.weatherPlaceholder}>
                Weather information will appear here.
              </p>

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



export default Weather