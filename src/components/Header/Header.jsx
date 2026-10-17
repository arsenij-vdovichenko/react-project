import { useState } from "react"

import styles from "./Header.module.css"
import RegistrationModal from "../RegistrationModal/RegistrationModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
};

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Weather App</h1>

        <button
          className={styles.menuToggle}
          type="button"
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
          <a href="#weather" onClick={() => setIsMenuOpen(false)}>
            Weather
          </a>

          <a href="#news" onClick={() => setIsMenuOpen(false)}>
            News
          </a>

          <a href="#gallery" onClick={() => setIsMenuOpen(false)}>
            Gallery
          </a>

          {user ? (
  <>
    <span className={styles.userName}>
      Hello, {user.name}!
    </span>

    <button
      className={styles.logoutButton}
      type="button"
      onClick={handleLogout}
    >
      Log out
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
              Register
            </button>
          )}
        </nav>
      </header>

      {isModalOpen && (
        <RegistrationModal
          onClose={handleRegistrationClose}
        />
      )}
    </>
  );
};

export default Header;