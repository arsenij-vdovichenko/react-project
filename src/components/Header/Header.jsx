import { useState } from "react"

import styles from "./Header.module.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Weather App</h1>

      <button
        className={styles.menuToggle}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
      >
        ☰
      </button>

      <nav
        className={`${styles.nav} ${
          isMenuOpen ? styles.navOpen : ''
        }`}
      >
        <a href="#weather">Weather</a>
        <a href="#news">News</a>
        <a href="#gallery">Gallery</a>
      </nav>
    </header>
  );
};

export default Header;