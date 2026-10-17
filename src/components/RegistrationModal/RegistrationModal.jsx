import { useState } from 'react';
import styles from './RegistrationModal.module.css';

const RegistrationModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: name.trim(),
      email: email.trim(),
    };

    if (!user.name || !user.email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      localStorage.setItem('user', JSON.stringify(user));
      onClose();
    } catch {
      setError('Could not save your data. Please try again.');
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close registration"
        >
          ×
        </button>

        <h2 className={styles.title} id="registration-title">
          Create an account
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>

          {error && <p role="alert">{error}</p>}

          <button className={styles.submitButton} type="submit">
            Register
          </button>
        </form>
      </section>
    </div>
  );
};


export default RegistrationModal;