import { useEffect, useState } from 'react';
import styles from './News.module.css';
import { getWeatherNews } from '../services/newsApi';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;

    const loadNews = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getWeatherNews();

        if (!isCancelled) {
          setArticles(data);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error.message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section className={styles.news} id="news">
      <h2 className={styles.title}>Weather News</h2>

      {isLoading && <p>Loading news...</p>}

      {error && <p role="alert">{error}</p>}

      {!isLoading && !error && articles.length === 0 && (
        <p>No news found.</p>
      )}

      {!isLoading && articles.length > 0 && (
        <ul className={styles.newsList}>
          {articles.map((article) => (
            <li className={styles.newsCard} key={article.id}>
              {article.image && (
                <img
                  className={styles.newsImage}
                  src={article.image}
                  alt=""
                  loading="lazy"
                />
              )}

              <h3 className={styles.newsTitle}>
                {article.title}
              </h3>

              {article.description && (
                <p className={styles.description}>
                  {article.description}
                </p>
              )}

              <p className={styles.newsSource}>
                Source: {article.source}
              </p>

              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read article
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default News;