
import Hero from "../../Hero/Hero";
import Weather from "../../Weather/Weather";
import News from "../../News/News";
import Gallery from "../../Gallery/Gallery";
import { useEffect, useState } from "react";

const Main = () => {
  const [cities, setCities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Завантажуємо міста з localStorage
  useEffect(() => {
    try {
      const savedCities = localStorage.getItem('cities');

      if (savedCities) {
        const parsedCities = JSON.parse(savedCities);

        if (Array.isArray(parsedCities)) {
          setCities(parsedCities);
        }
      }
    } catch (error) {
      console.error('Помилка завантаження міст:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Зберігаємо міста після зміни списку
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities, isLoaded]);

  // Додаємо місто
  const handleAddCity = (city) => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return;
    }

    const normalizedCity = trimmedCity.toLowerCase();

    setCities((prevCities) => {
      const cityExists = prevCities.some(
        (existingCity) =>
          existingCity.toLowerCase() === normalizedCity
      );

      if (cityExists) {
        return prevCities;
      }

      return [...prevCities, trimmedCity];
    });
  };

  // Видаляємо місто
  const handleDeleteCity = (cityToDelete) => {
    setCities((prevCities) =>
      prevCities.filter((city) => city !== cityToDelete)
    );
  };

  return (
    <main>
      <Hero onSearch={handleAddCity} />

      <Weather
        cities={cities}
        onDeleteCity={handleDeleteCity}
      />

      <News />
      <Gallery />
    </main>
  );
};

export default Main;