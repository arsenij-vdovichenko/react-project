import styles from "./News.module.css"

const demoNews = [
  {
    id: 1,
    title: 'Як погода впливає на наш настрій',
    description:
      'Сонячні дні можуть покращувати настрій, а прогулянки на свіжому повітрі допомагають відпочити.',
  },
  {
    id: 2,
    title: 'Поради для прогулянок у прохолодну погоду',
    description:
      'Обирай зручний одяг шарами та перевіряй прогноз перед виходом.',
  },
  {
    id: 3,
    title: 'Чому важливо стежити за прогнозом',
    description:
      'Прогноз погоди допомагає планувати поїздки, прогулянки та повсякденні справи.',
  },
];

const News = () => {
  return (
    <section className={styles.news} id="news">
      <h2 className={styles.title}>Weather News</h2>

      <ul className={styles.newsList}>
        {demoNews.map((article) => (
          <li className={styles.newsCard} key={article.id}>
            <h3 className={styles.newsTitle}>{article.title}</h3>
            <p className={styles.description}>{article.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;