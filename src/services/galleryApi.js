
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export const getNaturePhotos = async () => {
  if (!API_KEY) {
    throw new Error(
      'Pixabay API key is missing. Check your .env file.'
    );
  }

  const url = new URL('https://pixabay.com/api/');

  url.searchParams.set('key', API_KEY);
  url.searchParams.set(
    'q',
    'nature landscape forest ocean mountains'
  );
  url.searchParams.set('image_type', 'photo');
  url.searchParams.set('safesearch', 'true');
  url.searchParams.set('per_page', '12');

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      'Could not load gallery photos. Please try again.'
    );
  }

  const result = await response.json();

  return result.hits.map((photo) => ({
    id: photo.id,
    title: photo.tags,
    image: photo.webformatURL,
    largeImage: photo.largeImageURL,
    photographer: photo.user,
  }));
};