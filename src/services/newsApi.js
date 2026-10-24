
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const TRANSLATION_CACHE_KEY = 'skynest-news-translations';

function getCache() {
  try {
    return JSON.parse(
      localStorage.getItem(TRANSLATION_CACHE_KEY) || '{}'
    );
  } catch {
    return {};
  }
}

function saveTranslation(text, translation) {
  const cache = getCache();
  cache[text] = translation;

  try {
    localStorage.setItem(
      TRANSLATION_CACHE_KEY,
      JSON.stringify(cache)
    );
  } catch {
    // Переклад працюватиме і без кешу.
  }
}

async function translateToUkrainian(text) {
  if (!text || text === '[Removed]') {
    return '';
  }

  const cache = getCache();

  if (cache[text]) {
    return cache[text];
  }

  // API приймає до 500 байтів тексту на запит.
  const textToTranslate = text.slice(0, 450);

  try {
    const url = new URL(
      'https://api.mymemory.translated.net/get'
    );

    url.searchParams.set('q', textToTranslate);
    url.searchParams.set('langpair', 'en|uk');

    const response = await fetch(url);

    if (!response.ok) {
      return text;
    }

    const result = await response.json();
    const translated =
      result.responseData?.translatedText;

    if (
      result.responseStatus === 200 &&
      translated &&
      !translated.toLowerCase().includes('my memory is')
    ) {
      const finalText =
        text.length > 450
          ? translated + '…'
          : translated;

      saveTranslation(text, finalText);
      return finalText;
    }

    return text;
  } catch (error) {
    console.error('Translation failed:', error);
    return text;
  }
}

export const getWeatherNews = async (language = 'uk') => {
  if (!API_KEY) {
    throw new Error(
      'Не знайдено News API key. Перевір файл .env.'
    );
  }

  const url = new URL(
    'https://newsapi.org/v2/everything'
  );

  url.searchParams.set(
    'q',
    'weather OR "weather forecast" OR meteorology OR storm OR hurricane OR flood OR rainfall OR temperature'
  );
  url.searchParams.set('searchIn', 'title,description');
  url.searchParams.set('language', 'en');
  url.searchParams.set('sortBy', 'publishedAt');
  url.searchParams.set('pageSize', '6');
  url.searchParams.set('apiKey', API_KEY);

  const response = await fetch(url);
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.status === 'error') {
    throw new Error(
      result.message || 'Не вдалося завантажити новини.'
    );
  }

  const articles = (result.articles || []).filter(
    (article) =>
      article.url &&
      article.title &&
      article.title !== '[Removed]'
  );

  // Англійська версія інтерфейсу — оригінальні статті.
  if (language !== 'uk') {
    return articles.map((article, index) => ({
      id: article.url || `${article.title}-${index}`,
      title: article.title,
      description: article.description || '',
      url: article.url,
      image: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source?.name || 'News',
    }));
  }

  // Українська версія — перекладаємо заголовки й описи.
  return Promise.all(
    articles.map(async (article, index) => ({
      id: article.url || `${article.title}-${index}`,
      title: await translateToUkrainian(article.title),
      description: await translateToUkrainian(
        article.description || ''
      ),
      url: article.url,
      image: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source?.name || 'Новини',
    }))
  );
};
