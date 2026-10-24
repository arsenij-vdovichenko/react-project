import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.content}>
        <a className={styles.brand} href="#top">
          <span className={styles.icon} aria-hidden="true">
            ☁
          </span>
          Weather App
        </a>

        <p className={styles.description}>
          Your weather, your world.
        </p>

        <a className={styles.forecastLink} href="#weather">
          Explore the forecast ↑
        </a>

        <div className={styles.contact}>
          <h3 className={styles.contactTitle}>
            Contact us
          </h3>

          <p className={styles.contactDescription}>
            Have a question or suggestion? We would love to hear from you.
          </p>

          <a
            className={styles.emailLink}
            href="mailto:your-email@example.com"
          >
            <span aria-hidden="true">✉</span>
            fan33374@gmail.com
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} SkyNest</p>
        <p>Made with ☁️ and care</p>
      </div>
    </footer>
  );
};

export default Footer;