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
  date: 'Saturday, June 21, 2026',
  time: '4:00 PM',
  venueName: 'The Glass Garden',
  venueAddress: 'Pasig City, Metro Manila',
  mapEmbedUrl:
    'https://www.google.com/maps?q=The+Glass+Garden+Pasig+City&output=embed'
};

function App() {
  return (
    <main className="invitation-page">
      <div className="texture texture-top" aria-hidden="true" />
      <div className="texture texture-bottom" aria-hidden="true" />

      <section className="hero reveal">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=2000&q=80"
          alt="Decorated wedding venue"
        />
        <div className="hero-overlay">
          <p className="hero-kicker">Together With Our Families</p>
          <h1>{weddingDetails.title}</h1>
          <p className="hero-subtitle">Invite you to celebrate love, joy, and forever.</p>
        </div>
      </section>

      <section className="event-details reveal">
        <article className="detail-card">
          <h2>When</h2>
          <p className="detail-main">{weddingDetails.date}</p>
          <p className="detail-sub">{weddingDetails.time}</p>
        </article>
        <article className="detail-card">
          <h2>Where</h2>
          <p className="detail-main">{weddingDetails.venueName}</p>
          <p className="detail-sub">{weddingDetails.venueAddress}</p>
        </article>
      </section>

      <section className="gallery-section reveal">
        <h2>Moments We Love</h2>
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <figure key={image.src} className="gallery-item">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="map-section reveal">
        <h2>Venue Location</h2>
        <div className="map-frame">
          <iframe
            title="Wedding venue map"
            src={weddingDetails.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}

export default App;
