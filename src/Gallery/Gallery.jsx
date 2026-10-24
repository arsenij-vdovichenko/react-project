
import { useEffect, useRef, useState } from 'react';
import styles from './Gallery.module.css';

const images = [
  {
    id: 1,
    title: 'Mountain Landscapes',
    category: 'Mountains',
    description:
      'Majestic mountains, fresh air and breathtaking views. Mountain landscapes are home to many unique plants and animals.',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Високі гори з вершинами, вкритими хмарами',
  },
  {
    id: 2,
    title: 'Green Forest',
    category: 'Forest',
    description:
      'Forests provide shelter for wildlife, clean the air and help maintain the balance of our natural environment.',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Зелений ліс із високими деревами',
  },
  {
    id: 3,
    title: 'Peaceful Lake',
    category: 'Water',
    description:
      'Lakes create peaceful landscapes and provide important habitats for fish, birds and other wildlife.',
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1000&q=85',
    alt: 'Спокійне озеро серед природного ландшафту',
  },
  {
    id: 4,
    title: 'Golden Sunset',
    category: 'Sky',
    description:
      'Sunsets paint the sky with warm colours as sunlight travels through more of the atmosphere near the horizon.',
    src: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85',
    alt: 'Золотистий захід сонця над полем',
  },
  {
    id: 5,
    title: 'Ocean Waves',
    category: 'Ocean',
    description:
      'The ocean supports an enormous variety of life and plays an important role in regulating Earth’s climate.',
    src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85',
    alt: 'Морські хвилі та блакитна вода',
  },
  {
    id: 6,
    title: 'Wildflower Meadow',
    category: 'Flowers',
    description:
      'Wildflower meadows provide food and shelter for bees, butterflies and many other pollinators.',
    src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85',
    alt: 'Квіти на природній галявині',
  },
];

const Gallery = () => {
  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollGallery = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction * scrollRef.current.clientWidth * 0.75,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section className={styles.gallery} id="nature-gallery">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>DISCOVER THE OUTDOORS</p>
          <h2 className={styles.title}>Nature Gallery</h2>
          <p className={styles.subtitle}>
            Explore beautiful places and discover the stories of nature.
          </p>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.arrow}
            type="button"
            onClick={() => scrollGallery(-1)}
            aria-label="Scroll gallery left"
          >
            ←
          </button>
          <button
            className={styles.arrow}
            type="button"
            onClick={() => scrollGallery(1)}
            aria-label="Scroll gallery right"
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.track} ref={scrollRef}>
        {images.map((image) => (
          <button
            className={styles.card}
            key={image.id}
            type="button"
            onClick={() => setSelectedImage(image)}
            aria-label={`Learn more about ${image.title}`}
          >
            <img
              className={styles.image}
              src={image.src}
              alt={image.alt}
              loading="lazy"
            />

            <span className={styles.cardOverlay}>
              <span className={styles.category}>{image.category}</span>
              <span className={styles.cardTitle}>{image.title}</span>
              <span className={styles.viewMore}>View details ↗</span>
            </span>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <img
              className={styles.modalImage}
              src={selectedImage.src}
              alt={selectedImage.alt}
            />

            <div className={styles.modalContent}>
              <span className={styles.modalCategory}>
                {selectedImage.category}
              </span>

              <h3 id="gallery-modal-title">
                {selectedImage.title}
              </h3>

              <p>{selectedImage.description}</p>

              <button
                className={styles.closeTextButton}
                type="button"
                onClick={() => setSelectedImage(null)}
              >
                Back to gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
