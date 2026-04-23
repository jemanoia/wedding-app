import { useCallback, useEffect, useRef, useState } from 'react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    alt: 'Wedding bouquet and rings'
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bride and groom walking together'
  },
  {
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    alt: 'Wedding table setup'
  },
  {
    src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Couple portrait at sunset'
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    alt: 'Wedding aisle decorations'
  },
  {
    src: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Wedding reception lights'
  }
];

const weddingDetails = {
  title: 'Josh & Tine Wedding',
  date: 'November 17, 2026',
  time: '4:00 PM',
  venueName: "Fruella's Event Venue Tagaytay",
  venueAddress: '144 Daang Luma, Amadeo, Cavite',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Fruella%27s+Event+Venue+Tagaytay%2C+144+Daang+Luma%2C+Amadeo%2C+Cavite&output=embed'
};

const scenes = [
  { id: 'hero', label: 'Welcome' },
  { id: 'when', label: 'When' },
  { id: 'where', label: 'Where' },
  { id: 'gallery', label: 'Moments' },
  { id: 'map', label: 'Map' }
];

function App() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const touchStartYRef = useRef(null);
  const transitionLockRef = useRef(false);
  const transitionTimerRef = useRef(null);

  const lockTransition = useCallback(() => {
    transitionLockRef.current = true;
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = window.setTimeout(() => {
      transitionLockRef.current = false;
      transitionTimerRef.current = null;
    }, 620);
  }, []);

  const shiftScene = useCallback(
    (direction) => {
      if (transitionLockRef.current) {
        return;
      }

      lockTransition();
      setActiveSceneIndex((current) => {
        const sceneCount = scenes.length;
        return (current + direction + sceneCount) % sceneCount;
      });
    },
    [lockTransition]
  );

  const goToScene = useCallback(
    (targetIndex) => {
      if (transitionLockRef.current) {
        return;
      }

      lockTransition();
      setActiveSceneIndex(targetIndex);
    },
    [lockTransition]
  );

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 12) {
        return;
      }
      shiftScene(event.deltaY > 0 ? 1 : -1);
    };

    const handleKeydown = (event) => {
      const forwardKeys = ['ArrowDown', 'PageDown', ' '];
      const backwardKeys = ['ArrowUp', 'PageUp'];

      if (forwardKeys.includes(event.key)) {
        event.preventDefault();
        shiftScene(1);
      }

      if (backwardKeys.includes(event.key)) {
        event.preventDefault();
        shiftScene(-1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeydown);

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, [shiftScene]);

  const handleTouchStart = useCallback((event) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      const startY = touchStartYRef.current;
      const endY = event.changedTouches[0]?.clientY ?? startY;
      touchStartYRef.current = null;

      if (startY === null || endY === null) {
        shiftScene(1);
        return;
      }

      const swipeDelta = startY - endY;
      if (Math.abs(swipeDelta) < 24) {
        shiftScene(1);
        return;
      }

      shiftScene(swipeDelta > 0 ? 1 : -1);
    },
    [shiftScene]
  );

  const activeScene = scenes[activeSceneIndex];

  const renderScene = () => {
    if (activeScene.id === 'hero') {
      return (
        <section className="scene-hero">
          <img
            className="scene-hero-image"
            src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=2000&q=80"
            alt="Decorated wedding venue"
          />
          <div className="scene-hero-overlay">
            <p className="hero-kicker">Together With Our Families</p>
            <h1>{weddingDetails.title}</h1>
            <p className="hero-subtitle">Invite you to celebrate love, joy, and forever.</p>
          </div>
        </section>
      );
    }

    if (activeScene.id === 'when') {
      return (
        <section className="scene-detail">
          <p className="scene-label">When</p>
          <h2>{weddingDetails.date}</h2>
          <p className="scene-detail-sub">{weddingDetails.time}</p>
        </section>
      );
    }

    if (activeScene.id === 'where') {
      return (
        <section className="scene-detail">
          <p className="scene-label">Where</p>
          <h2>{weddingDetails.venueName}</h2>
          <p className="scene-detail-sub">{weddingDetails.venueAddress}</p>
        </section>
      );
    }

    if (activeScene.id === 'gallery') {
      return (
        <section className="scene-gallery">
          <h2>Moments We Love</h2>
          <div className="scene-gallery-grid">
            {galleryImages.slice(0, 4).map((image) => (
              <figure key={image.src} className="gallery-item">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="scene-map">
        <h2>Venue Location</h2>
        <p className="scene-map-sub">
          {weddingDetails.venueName}
          <br />
          {weddingDetails.venueAddress}
        </p>
        <div className="map-frame">
          <iframe
            title="Wedding venue map"
            src={weddingDetails.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    );
  };

  return (
    <main
      className="invitation-stage"
      onClick={() => shiftScene(1)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="stage-glow stage-glow-top" aria-hidden="true" />
      <div className="stage-glow stage-glow-bottom" aria-hidden="true" />

      <p className="stage-hint">Scroll, click, or tap to change scenes</p>

      <article key={activeScene.id} className="scene-card classic-enter">
        {renderScene()}
      </article>

      <nav
        className="stage-controls"
        aria-label="Scene navigation"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="control-button" onClick={() => shiftScene(-1)}>
          Previous
        </button>

        <div className="scene-dots">
          {scenes.map((scene, index) => (
            <button
              key={scene.id}
              type="button"
              className={`scene-dot${index === activeSceneIndex ? ' is-active' : ''}`}
              onClick={() => goToScene(index)}
              aria-label={`Go to ${scene.label}`}
            />
          ))}
        </div>

        <button type="button" className="control-button" onClick={() => shiftScene(1)}>
          Next
        </button>
      </nav>
    </main>
  );
}

export default App;
