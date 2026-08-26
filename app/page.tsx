'use client';

import { useMemo, useState } from 'react';

type Track = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  color: string;
  accent: string;
  explicit?: boolean;
};

const featured = [
  { title: 'After Dark', subtitle: 'Late-night electronic', color: '#3d105d', accent: '#e85d75', mark: 'AD' },
  { title: 'Fresh Finds', subtitle: 'The sound of right now', color: '#17483e', accent: '#62d6a5', mark: 'FF' },
  { title: 'Neon Pulse', subtitle: 'Synthwave & retrowave', color: '#44245f', accent: '#8f7cff', mark: 'NP' },
  { title: 'Deep Focus', subtitle: 'Beats without borders', color: '#20344b', accent: '#62a8e5', mark: 'DF' },
  { title: 'Slow Mornings', subtitle: 'Soft indie essentials', color: '#61432e', accent: '#e7a66f', mark: 'SM' },
  { title: 'Green Room', subtitle: 'Curated for you', color: '#174b2b', accent: '#1ed760', mark: 'GR' },
];

const tracks: Track[] = [
  { id: 1, title: 'Emerald Lights', artist: 'Nova Lane', album: 'Night Geometry', duration: '3:42', color: '#164d32', accent: '#1ed760' },
  { id: 2, title: 'No Signal', artist: 'Miles Away', album: 'Static Hearts', duration: '4:08', color: '#3d1d55', accent: '#d76cff', explicit: true },
  { id: 3, title: 'Glass City', artist: 'Lumen', album: 'Refractions', duration: '3:19', color: '#153d55', accent: '#62b9e8' },
  { id: 4, title: 'Velvet Motion', artist: 'The Sundown', album: 'After Hours', duration: '4:34', color: '#60301f', accent: '#ff895d' },
  { id: 5, title: 'Gravity Club', artist: 'Aster Youth', album: 'Low Orbit', duration: '3:56', color: '#494021', accent: '#eedb65' },
];

const navItems = [
  { icon: '⌂', label: 'Inicio' },
  { icon: '⌕', label: 'Buscar' },
  { icon: '▣', label: 'Tu biblioteca' },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState('Inicio');
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [query, setQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState<number[]>([1, 4]);
  const [progress, setProgress] = useState(38);
  const [volume, setVolume] = useState(72);

  const visibleFeatured = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return featured;
    return featured.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(normalized));
  }, [query]);

  const toggleLike = (id: number) => {
    setLiked((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand" aria-label="Green Deck">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>GREEN DECK</span>
        </div>

        <nav className="primary-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button className={activeNav === item.label ? 'nav-item active' : 'nav-item'} key={item.label} onClick={() => setActiveNav(item.label)}>
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>

        <div className="library-actions">
          <button><span className="square-icon">＋</span>Crear playlist</button>
          <button><span className="square-icon heart-square">♥</span>Tus favoritos</button>
        </div>

        <div className="playlist-list">
          <button>Descubrimiento semanal</button><button>On repeat</button><button>Concentración profunda</button>
          <button>Road trip nocturno</button><button>Indie para el domingo</button><button>Favoritas 2026</button>
        </div>

        <div className="profile-card">
          <span className="avatar">CA</span><span><strong>Carlos</strong><small>Ver perfil</small></span>
          <button aria-label="Más opciones">•••</button>
        </div>
      </aside>

      <section className="main-view">
        <header className="topbar">
          <div className="history-buttons"><button aria-label="Atrás">‹</button><button aria-label="Adelante">›</button></div>
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="¿Qué quieres escuchar?" aria-label="Buscar música" />
            {query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda">×</button>}
          </label>
          <button className="upgrade-button">Explorar Premium</button><button className="notification-button" aria-label="Notificaciones">●</button>
        </header>

        <div className="content">
          <div className="welcome-row">
            <div><p className="eyebrow">TU MÚSICA, A TU MANERA</p><h1>Buenas noches</h1><p className="welcome-copy">El soundtrack perfecto para terminar el día.</p></div>
            <div className="date-chip"><span>MIÉ</span><strong>26</strong><small>AGO</small></div>
          </div>

          <div className="filter-row" aria-label="Filtros de contenido">
            {['Todo', 'Música', 'Podcasts', 'En vivo'].map((filter) => (
              <button key={filter} className={activeFilter === filter ? 'selected' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>
            ))}
          </div>

          <section className="quick-grid" aria-label="Accesos rápidos">
            {featured.slice(0, 4).map((item) => (
              <button className="quick-card" key={item.title} onClick={() => setPlaying(true)}>
                <span className="mini-cover" style={{ '--cover': item.color, '--accent': item.accent } as React.CSSProperties}>{item.mark}</span>
                <strong>{item.title}</strong><span className="quick-play" aria-hidden="true">▶</span>
              </button>
            ))}
          </section>

          <section className="section-block">
            <div className="section-heading"><div><p className="eyebrow">HECHO PARA TI</p><h2>Tu selección nocturna</h2></div><button>Mostrar todo</button></div>
            {visibleFeatured.length ? (
              <div className="card-grid">
                {visibleFeatured.map((item) => (
                  <article className="music-card" key={item.title}>
                    <div className="cover-art" style={{ '--cover': item.color, '--accent': item.accent } as React.CSSProperties}>
                      <span className="cover-ring" /><small>GREEN DECK</small><strong>{item.mark}</strong>
                      <button className="card-play" aria-label={`Reproducir ${item.title}`} onClick={() => setPlaying(true)}>▶</button>
                    </div>
                    <h3>{item.title}</h3><p>{item.subtitle}</p>
                  </article>
                ))}
              </div>
            ) : <div className="empty-state"><span>⌕</span><h3>Sin resultados</h3><p>Prueba con otra búsqueda.</p></div>}
          </section>

          <section className="section-block tracks-section">
            <div className="section-heading"><div><p className="eyebrow">RECIENTEMENTE ESCUCHADO</p><h2>Vuelve a tu ritmo</h2></div><button>Ver historial</button></div>
            <div className="track-list">
              <div className="track-head"><span>#</span><span>TÍTULO</span><span>ÁLBUM</span><span>♡</span><span>◷</span></div>
              {tracks.map((track, index) => (
                <div className={currentTrack.id === track.id ? 'track-row active' : 'track-row'} key={track.id}>
                  <button className="track-index" onClick={() => { setCurrentTrack(track); setPlaying(true); }} aria-label={`Reproducir ${track.title}`}><span>{currentTrack.id === track.id && playing ? '▶' : index + 1}</span></button>
                  <button className="track-title" onClick={() => { setCurrentTrack(track); setPlaying(true); }}>
                    <span className="track-cover" style={{ '--cover': track.color, '--accent': track.accent } as React.CSSProperties}>{track.title.slice(0, 1)}</span>
                    <span><strong>{track.title}</strong><small>{track.explicit && <i>E</i>}{track.artist}</small></span>
                  </button>
                  <span className="album-name">{track.album}</span>
                  <button className={liked.includes(track.id) ? 'like-button liked' : 'like-button'} onClick={() => toggleLike(track.id)} aria-label="Guardar en favoritos">♥</button>
                  <span className="duration">{track.duration}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <footer className="player-bar">
        <div className="now-playing">
          <span className="player-cover" style={{ '--cover': currentTrack.color, '--accent': currentTrack.accent } as React.CSSProperties}>{currentTrack.title.slice(0, 1)}</span>
          <span className="playing-copy"><strong>{currentTrack.title}</strong><small>{currentTrack.artist}</small></span>
          <button className={liked.includes(currentTrack.id) ? 'like-button liked' : 'like-button'} onClick={() => toggleLike(currentTrack.id)} aria-label="Guardar tema actual">♥</button>
        </div>
        <div className="player-center">
          <div className="player-controls">
            <button aria-label="Aleatorio">⌘</button><button aria-label="Anterior" onClick={() => setCurrentTrack(tracks[Math.max(0, tracks.findIndex((item) => item.id === currentTrack.id) - 1)])}>|◀</button>
            <button className="main-play" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pausar' : 'Reproducir'}>{playing ? 'Ⅱ' : '▶'}</button>
            <button aria-label="Siguiente" onClick={() => setCurrentTrack(tracks[Math.min(tracks.length - 1, tracks.findIndex((item) => item.id === currentTrack.id) + 1)])}>▶|</button><button aria-label="Repetir">↻</button>
          </div>
          <div className="progress-row"><span>1:26</span><input type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))} aria-label="Progreso de reproducción" /><span>{currentTrack.duration}</span></div>
        </div>
        <div className="player-tools">
          <button aria-label="Vista de reproducción">▣</button><button aria-label="Cola">☷</button><button aria-label="Dispositivos">▱</button><span>◖</span>
          <input type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Volumen" /><button aria-label="Pantalla completa">⛶</button>
        </div>
      </footer>

      <nav className="mobile-nav" aria-label="Navegación móvil">
        {navItems.map((item) => <button key={item.label} onClick={() => setActiveNav(item.label)} className={activeNav === item.label ? 'active' : ''}><span>{item.icon}</span>{item.label}</button>)}
      </nav>
    </main>
  );
}
