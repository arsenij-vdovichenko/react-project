
import { useEffect, useState } from 'react';
import styles from './Gallery.module.css';
import { getNaturePhotos } from '../services/galleryApi';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getNaturePhotos();

        if (!isCancelled) {
          setPhotos(data);
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

    loadPhotos();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section className={styles.gallery} id="gallery">
      <h2 className={styles.title}>Nature Gallery</h2>

      {isLoading && <p>Loading photos...</p>}

      {error && <p role="alert">{error}</p>}

      {!isLoading && !error && photos.length === 0 && (
        <p>No photos found.</p>
      )}

      {!isLoading && photos.length > 0 && (
        <ul className={styles.galleryList}>
          {photos.map((photo) => (
            <li className={styles.galleryCard} key={photo.id}>
              <button
                className={styles.photoButton}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                aria-label={`Open photo: ${photo.title}`}
              >
                <img
                  className={styles.image}
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                />
              </button>

              <h3 className={styles.itemTitle}>
                {photo.title}
              </h3>

              <p>Photo by: {photo.photographer}</p>
            </li>
          ))}
        </ul>
      )}

      {selectedPhoto && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className={styles.lightboxContent}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo"
            >
              ×
            </button>

            <img
              className={styles.largeImage}
              src={selectedPhoto.largeImage}
              alt={selectedPhoto.title}
            />

            <p>{selectedPhoto.title}</p>
            <p>Photo by: {selectedPhoto.photographer}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
