import { useState } from "react"

import styles from "./Header.module.css"
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import { useLanguage } from "../../context/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const handleRegistrationClose = () => {
    setIsModalOpen(false);

    try {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    } catch {
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
  };

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header} id="top">
        <a href="#top" className={styles.title}>
          Weather App
        </a>

        <button
          className={styles.menuToggle}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>

        <nav
          className={`${styles.nav} ${
            isMenuOpen ? styles.navOpen : ''
          }`}
          aria-label="Main navigation"
        >
          <a href="#weather" onClick={handleNavigation}>
            {t('navWeather')}
          </a>

          <a href="#weather-news" onClick={handleNavigation}>
            {t('navNews')}
          </a>

          <a href="#nature-gallery" onClick={handleNavigation}>
            {t('navGallery')}
          </a>

          <a href="#footer" onClick={handleNavigation}>
            {t('navContact')}
          </a>

          <div className={styles.languageSwitcher} aria-label="Choose language">
            <button
              type="button"
              className={`${styles.languageButton} ${
                language === 'uk' ? styles.activeLanguage : ''
              }`}
              onClick={() => setLanguage('uk')}
              aria-pressed={language === 'uk'}
              lang="uk"
            >
              UA
            </button>

            <button
              type="button"
              className={`${styles.languageButton} ${
                language === 'en' ? styles.activeLanguage : ''
              }`}
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              lang="en"
            >
              EN
            </button>
          </div>

          {user ? (
            <>
              <span className={styles.userName}>
                {t('hello')}, {user.name}!
              </span>

              <button
                className={styles.logoutButton}
                type="button"
                onClick={handleLogout}
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <button
              className={styles.registerButton}
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              {t('register')}
            </button>
          )}
        </nav>
      </header>

      {isModalOpen && (
        <RegistrationModal onClose={handleRegistrationClose} />
      )}
    </>
  );
};

export default Header;