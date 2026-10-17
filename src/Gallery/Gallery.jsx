import styles from './Gallery.module.css';

const galleryItems = [
  {
    id: 1,
    title: 'Forest',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600',
  },
  {
    id: 2,
    title: 'Ocean',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600',
  },
  {
    id: 3,
    title: 'Mountains',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600',
  },
  {
    id: 4,
    title: 'Flowers',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600',
  },
];

const Gallery = () => {
  return (
    <section className={styles.gallery} id="gallery">
      <h2 className={styles.title}>Nature Gallery</h2>

      <ul className={styles.galleryList}>
        {galleryItems.map((item) => (
          <li className={styles.galleryCard} key={item.id}>
            <img
              className={styles.image}
              src={item.image}
              alt={item.title}
              loading="lazy"
            />

            <h3 className={styles.itemTitle}>{item.title}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Gallery;