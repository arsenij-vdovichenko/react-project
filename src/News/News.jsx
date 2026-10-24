import { useEffect, useState } from 'react';
import styles from './News.module.css';
import { getWeatherNews } from '../services/newsApi';
import { useLanguage } from '../context/LanguageContext';

const categories = [
  { value: 'All stories', key: 'allStories' },
  { value: 'Forecast', key: 'forecast' },
  { value: 'Climate', key: 'climate' },
  { value: 'Storms', key: 'storms' },
];

function getCategory(article) {
  const text = `${article.title || ''} ${
    article.description || ''
  }`.toLowerCase();

  if (
    /storm|hurricane|cyclone|tornado|flood|thunderstorm|severe weather|шторм|ураган|циклон|торнадо|повін|гроза|бурев|затоплен/.test(
      text
    )
  ) {
    return 'Storms';
  }

  if (
    /climate|global warming|greenhouse gas|emissions|climate change|клімат|глобальне потепління|парников|викид/.test(
      text
    )
  ) {
    return 'Climate';
  }

  return 'Forecast';
}

function formatDate(date, language) {
  if (!date) return '';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return '';

  return new Intl.DateTimeFormat(
    language === 'uk' ? 'uk-UA' : 'en-IE',
    { dateStyle: 'medium' }
  ).format(parsedDate);
}

function getSourceName(article) {
  if (typeof article.source === 'string') {
    return article.source;
  }

  return article.source?.name || 'News';
}

const News = () => {
  const { language, t } = useLanguage();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All stories');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      setLoading(true);
      setError('');

      try {
        const data = await getWeatherNews(language);

        if (!cancelled) {
          const normalizedArticles = data
            .filter((article) => article.url && article.title)
            .map((article) => ({
              ...article,
              category: getCategory(article),
            }));

          setArticles(normalizedArticles);
          setSelectedArticle(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Could not load weather news.');
          setArticles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      cancelled = true;
    };
  }, [reloadKey, language]);

  useEffect(() => {
    if (!selectedArticle) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setSelectedArticle(null);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle]);

  const filteredArticles =
    activeCategory === 'All stories'
      ? articles
      : articles.filter(
          (article) => article.category === activeCategory
        );

  const openArticle = (article) => {
    setSelectedArticle(article);
  };

  const renderArticleImage = (article, className) => {
    if (!article.image) {
      return (
        <div className={styles.imagePlaceholder}>
          {language === 'uk'
            ? 'Зображення недоступне'
            : 'Image unavailable'}
        </div>
      );
    }

    return (
      <img
        className={className}
        src={article.image}
        alt={article.title || ''}
        loading="lazy"
      />
    );
  };

  return (
    <section className={styles.news} id="weather-news">
      {/* Заголовок */}
      <div className={styles.header}>
        <div className={styles.headingText}>
          <span className={styles.eyebrow}>
            {t('newsEyebrow')}
          </span>

          <h2 className={styles.title}>
            {t('newsTitle')}
          </h2>

          <p className={styles.subtitle}>
            {t('newsSubtitle')}
          </p>
        </div>

        <span className={styles.newsBadge}>
          <span className={styles.badgeDot} />
          {t('newsFeed')}
        </span>
      </div>

      {/* Фільтри */}
      <div className={styles.filters} aria-label={t('newsTitle')}>
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            className={`${styles.filter} ${
              activeCategory === category.value
                ? styles.activeFilter
                : ''
            }`}
            onClick={() => setActiveCategory(category.value)}
            aria-pressed={activeCategory === category.value}
          >
            {t(category.key)}
          </button>
        ))}
      </div>

      {/* Завантаження */}
      {loading && (
        <div className={styles.statusBox} role="status">
          <span className={styles.spinner} />
          <p>{t('loadingNews')}</p>
        </div>
      )}

      {/* Помилка API */}
      {!loading && error && (
        <div className={styles.statusBox} role="alert">
          <h3>{t('newsError')}</h3>
          <p>{error}</p>

          <button
            type="button"
            className={styles.readButton}
            onClick={() => setReloadKey((key) => key + 1)}
          >
            {t('tryAgain')}
          </button>
        </div>
      )}

      {/* Порожній результат */}
      {!loading && !error && articles.length === 0 && (
        <div className={styles.emptyState}>
          {t('noNews')}
        </div>
      )}

      {/* Усі новини однакового розміру */}
      {!loading && !error && filteredArticles.length > 0 && (
        <div className={styles.grid}>
          {filteredArticles.map((article, index) => (
            <article
              className={styles.card}
              key={article.id || article.url || `${article.title}-${index}`}
            >
              <button
                type="button"
                className={styles.cardImageButton}
                onClick={() => openArticle(article)}
                aria-label={`${t('readMore')}: ${article.title}`}
              >
                {renderArticleImage(article, styles.cardImage)}

                <span
                  className={styles.imageArrow}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </button>

              <div className={styles.cardContent}>
                <span className={styles.articleCategory}>
                  {t(
                    categories.find(
                      (item) => item.value === article.category
                    )?.key || 'forecast'
                  )}
                </span>

                <h3>{article.title}</h3>

                <p>
                  {article.description ||
                    (language === 'uk'
                      ? 'Відкрий оригінальну статтю, щоб дізнатися більше.'
                      : 'Open the original article to learn more.')}
                </p>

                <div className={styles.articleFooter}>
                  <span className={styles.readTime}>
                    {getSourceName(article)}
                    {article.publishedAt
                      ? ` · ${formatDate(article.publishedAt, language)}`
                      : ''}
                  </span>

                  <button
                    type="button"
                    className={styles.textButton}
                    onClick={() => openArticle(article)}
                  >
                    {t('readMore')} →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Немає новин у категорії */}
      {!loading &&
        !error &&
        articles.length > 0 &&
        filteredArticles.length === 0 && (
          <div className={styles.emptyState}>
            {t('noCategoryNews')}
          </div>
        )}

      {/* Деталі статті */}
      {selectedArticle && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setSelectedArticle(null)}
              aria-label={
                language === 'uk' ? 'Закрити статтю' : 'Close article'
              }
            >
              ×
            </button>

            {renderArticleImage(
              selectedArticle,
              styles.modalImage
            )}

            <div className={styles.modalContent}>
              <span className={styles.articleCategory}>
                {t(
                  categories.find(
                    (item) => item.value === selectedArticle.category
                  )?.key || 'forecast'
                )}
              </span>

              <h2 id="news-modal-title">
                {selectedArticle.title}
              </h2>

              <p className={styles.sourceDetails}>
                {getSourceName(selectedArticle)}
                {selectedArticle.publishedAt
                  ? ` · ${formatDate(selectedArticle.publishedAt, language)}`
                  : ''}
              </p>

              <p>
                {selectedArticle.description ||
                  (language === 'uk'
                    ? 'Відкрий оригінальну статтю, щоб прочитати повний матеріал.'
                    : 'Open the original article to read the full report.')}
              </p>

              <a
                className={styles.readButton}
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('originalArticle')} ↗
              </a>

              <button
                type="button"
                className={styles.textButton}
                onClick={() => setSelectedArticle(null)}
              >
                ← {t('backToNews')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;