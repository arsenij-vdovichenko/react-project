const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getWeatherNews = async () => {
  if (!API_KEY) {
    throw new Error('News API key is missing. Check your .env file.');
  }

  const url = new URL(
    'https://newsapi.org/v2/everything'
  );

  url.searchParams.set('q', 'weather OR climate OR forecast');
  url.searchParams.set('language', 'en');
  url.searchParams.set('sortBy', 'publishedAt');
  url.searchParams.set('pageSize', '6');
  url.searchParams.set('apiKey', API_KEY);

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        'News API key is invalid or your plan does not allow this request.'
      );
    }

    if (response.status === 429) {
      throw new Error('News API request limit reached. Try again later.');
    }

    throw new Error('Could not load news. Please try again.');
  }

  const result = await response.json();

  return result.articles.map((article, index) => ({
    id: article.url || `${article.title}-${index}`,
    title: article.title,
    description: article.description,
    url: article.url,
    image: article.urlToImage,
    publishedAt: article.publishedAt,
    source: article.source?.name || 'News',
  }));
};