
import { useState } from "react";
import styles from "./Hero.module.css"
const Hero = ({onSearch}) => {
const [city, setCity] = useState('');

const handleCityChange = (event) => {
setCity(event.target.value);
};

const handleSubmit = (event) => {
event.preventDefault();

const trimmedCity = city.trim();

if (!trimmedCity) {
  return;
}

onSearch(trimmedCity);
setCity('');
};

return (
<section className={styles.hero}>
<h2 className={styles.title}>Weather forecast</h2>

  <p className={styles.description}>
    Find the weather in your city
  </p>

  <p className={styles.date}>
  {new Date().toLocaleDateString('en-IE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</p>

  <form className={styles.searchForm} onSubmit={handleSubmit}>
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Enter city name..."
      aria-label="City name"
      value={city}
      onChange={handleCityChange}
      required
    />

    <button className={styles.searchButton} type="submit">
      Search
    </button>
  </form>
</section>

);
};

export default Hero