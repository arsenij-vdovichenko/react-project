
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const translations = {
  uk: {
    navWeather: 'Погода',
    navNews: 'Новини',
    navGallery: 'Галерея',
    navContact: 'Контакти',
    register: 'Реєстрація',
    login: 'Увійти',
    logout: 'Вийти',
    hello: 'Привіт',
    close: 'Закрити',
    loading: 'Завантаження...',
    error: 'Сталася помилка',
    retry: 'Спробувати ще раз',
    search: 'Пошук',
    searchCity: 'Введіть назву міста',
    addCity: 'Додати місто',
    delete: 'Видалити',
    savedCities: 'Збережені міста',
    noCities: 'Поки що немає збережених міст',
    currentWeather: 'Поточна погода',
    feelsLike: 'Відчувається як',
    humidity: 'Вологість',
    wind: 'Вітер',
    pressure: 'Тиск',
    sunrise: 'Схід сонця',
    sunset: 'Захід сонця',
    hourlyForecast: 'Погодинний прогноз',
    weeklyForecast: 'Прогноз на тиждень',
    today: 'Сьогодні',
    tomorrow: 'Завтра',
    weatherTitle: 'Погода у ваших містах',
    newsEyebrow: 'Останні оновлення',
    newsTitle: 'Новини погоди',
    newsSubtitle: 'Останні новини про погоду та клімат',
    newsFeed: 'Стрічка новин',
    allStories: 'Усі новини',
    forecast: 'Прогноз',
    climate: 'Клімат',
    storms: 'Шторми',
    loadingNews: 'Завантажуємо новини...',
    newsError: 'Не вдалося завантажити новини',
    tryAgain: 'Спробувати знову',
    noNews: 'Новин поки немає',
    noCategoryNews: 'У цій категорії новин немає',
    readMore: 'Читати далі',
    originalArticle: 'Читати оригінал',
    backToNews: 'Назад до новин',
    galleryTitle: 'Галерея природи',
    gallerySubtitle: 'Відкрийте для себе красу нашої планети',
    viewMore: 'Переглянути',
    footerAbout: 'Про нас',
    footerContact: 'Зв’язатися з нами',
    footerRights: 'Усі права захищено',
    footerDescription: 'Ваша погода — завжди під рукою',
    email: 'Електронна пошта',
    password: 'Пароль',
    name: 'Ім’я',
    submit: 'Підтвердити',
    cancel: 'Скасувати',
    requiredField: 'Заповніть це поле',
    cityNotFound: 'Місто не знайдено',
    clearSky: 'Ясно',
    fewClouds: 'Невелика хмарність',
    scatteredClouds: 'Мінлива хмарність',
    brokenClouds: 'Хмарно з проясненнями',
    overcastClouds: 'Похмуро',
    showerRain: 'Злива',
    lightRain: 'Невеликий дощ',
    moderateRain: 'Помірний дощ',
    heavyRain: 'Сильний дощ',
    rain: 'Дощ',
    thunderstorm: 'Гроза',
    snow: 'Сніг',
    mist: 'Імла',
    fog: 'Туман',
    haze: 'Серпанок',
    drizzle: 'Мряка',
  },

  en: {
    navWeather: 'Weather',
    navNews: 'News',
    navGallery: 'Gallery',
    navContact: 'Contact',
    register: 'Register',
    login: 'Log in',
    logout: 'Log out',
    hello: 'Hello',
    close: 'Close',
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Try again',
    search: 'Search',
    searchCity: 'Enter a city name',
    addCity: 'Add city',
    delete: 'Delete',
    savedCities: 'Saved cities',
    noCities: 'No saved cities yet',
    currentWeather: 'Current weather',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    wind: 'Wind',
    pressure: 'Pressure',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    hourlyForecast: 'Hourly forecast',
    weeklyForecast: 'Weekly forecast',
    today: 'Today',
    tomorrow: 'Tomorrow',
    weatherTitle: 'Weather in your cities',
    newsEyebrow: 'Latest updates',
    newsTitle: 'Weather News',
    newsSubtitle: 'The latest weather and climate news',
    newsFeed: 'News feed',
    allStories: 'All news',
    forecast: 'Forecast',
    climate: 'Climate',
    storms: 'Storms',
    loadingNews: 'Loading news...',
    newsError: 'Could not load news',
    tryAgain: 'Try again',
    noNews: 'No news available yet',
    noCategoryNews: 'No news in this category',
    readMore: 'Read more',
    originalArticle: 'Read original article',
    backToNews: 'Back to news',
    galleryTitle: 'Nature Gallery',
    gallerySubtitle: 'Discover the beauty of our planet',
    viewMore: 'Explore',
    footerAbout: 'About',
    footerContact: 'Contact us',
    footerRights: 'All rights reserved',
    footerDescription: 'Your weather, always at hand',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    submit: 'Submit',
    cancel: 'Cancel',
    requiredField: 'This field is required',
    cityNotFound: 'City not found',
    clearSky: 'Clear sky',
    fewClouds: 'Few clouds',
    scatteredClouds: 'Scattered clouds',
    brokenClouds: 'Broken clouds',
    overcastClouds: 'Overcast clouds',
    showerRain: 'Shower rain',
    lightRain: 'Light rain',
    moderateRain: 'Moderate rain',
    heavyRain: 'Heavy rain',
    rain: 'Rain',
    thunderstorm: 'Thunderstorm',
    snow: 'Snow',
    mist: 'Mist',
    fog: 'Fog',
    haze: 'Haze',
    drizzle: 'Drizzle',
  },
};

const weatherConditionKeys = {
  'clear sky': 'clearSky',
  'few clouds': 'fewClouds',
  'scattered clouds': 'scatteredClouds',
  'broken clouds': 'brokenClouds',
  'overcast clouds': 'overcastClouds',
  'shower rain': 'showerRain',
  'light rain': 'lightRain',
  'moderate rain': 'moderateRain',
  'heavy intensity rain': 'heavyRain',
  'very heavy rain': 'heavyRain',
  'extreme rain': 'heavyRain',
  rain: 'rain',
  thunderstorm: 'thunderstorm',
  snow: 'snow',
  mist: 'mist',
  fog: 'fog',
  haze: 'haze',
  'light intensity drizzle': 'drizzle',
  drizzle: 'drizzle',
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('skynest-language');
      return saved === 'en' ? 'en' : 'uk';
    } catch {
      return 'uk';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('skynest-language', language);
    } catch {
      // Мова залишиться доступною протягом поточної сесії.
    }

    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage === 'en' ? 'en' : 'uk');
  };

  const t = (key) =>
    translations[language]?.[key] ??
    translations.en[key] ??
    key;

  const translateCondition = (description) => {
    if (!description) return '';

    if (language === 'en') return description;

    const normalized = description.trim().toLowerCase();
    const key = weatherConditionKeys[normalized];

    return key ? t(key) : description;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translateCondition,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    );
  }

  return context;
}
