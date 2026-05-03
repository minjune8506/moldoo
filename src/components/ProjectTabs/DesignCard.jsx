import { useState } from 'react';
import styles from './DesignCard.module.css';

export default function DesignCard({ item, isSelected, onClick }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`${styles.card}${isSelected ? ` ${styles.selected}` : ''}`}
      onClick={onClick}
    >
      <div className={`${styles.imageWrap}${hasError ? ` ${styles.fallback}` : ''}`}>
        {!hasError && (
          <img
            src={item.image}
            alt={item.title}
            onError={() => setHasError(true)}
          />
        )}
        <div className={styles.overlay}>
          <h3 className={styles.overlayTitle}>{item.title}</h3>
          <p className={styles.overlayDesc}>{item.description}</p>
        </div>
      </div>
    </div>
  );
}
