import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import resources from './data/resources.json';
import { members } from './data/members.js';

const journal = [
  { date: 'TP1', category: 'Organización', title: 'Definimos la identidad del equipo', text: 'Elegimos Tu Máquina Retro Dev y una presentación inspirada en las máquinas arcade para que cada integrante fuera un personaje seleccionable.' },
  { date: 'TP1', category: 'Diseño', title: 'Diseñamos la experiencia arcade', text: 'Creamos una estética CRT con colores neón, tarjetas de personajes, controles de audio y scanlines, cuidando también la adaptación a pantallas pequeñas.' },
  { date: 'TP1', category: 'Soluciones', title: 'Sumamos perfiles y navegación', text: 'Organizamos una portada, perfiles individuales y una bitácora para recorrer el trabajo del grupo.' },
  { date: 'TP2', category: 'Organización', title: 'Migramos el proyecto a React', text: 'Reutilizamos los estilos y recursos visuales de TP1, organizando los contenidos como componentes y rutas internas con React Router.' },
  { date: 'TP2', category: 'Soluciones', title: 'Ampliamos los contenidos', text: 'Incorporamos un catálogo local con búsqueda y filtro, además de una sección conectada a una API pública con estados de carga y error.' },
];

function Sidebar({ credits, sound, onSound, scanlines, onScanlines }) {
  return (
    <aside className="sidebar">
      <Link className="app-brand" to="/" aria-label="Tu Máquina Retro Dev, portada">
        <span className="brand-icon app-logo" aria-hidden="true">▣</span>
        <span><strong>TU MÁQUINA<br />RETRO DEV</strong><small>UN EQUIPO, UNA PARTIDA</small></span>
      </Link>
      <div className="sidebar-score"><span>HIGH SCORE</span><strong>999,990</strong><span>CRÉDITOS　{String(credits).padStart(2, '0')}</span></div>
      <nav className="sidebar-nav" aria-label="Navegación principal">
        <NavLink to="/" end>▣　PORTADA</NavLink>
        <div className="sidebar-label">PERSONAJES</div>
        {members.map((member) => <NavLink key={member.id} to={`/integrantes/${member.id}`}>{member.number}　{member.name}</NavLink>)}
        <div className="sidebar-label">EXPLORAR</div>
        <NavLink to="/recursos">▤　CATÁLOGO</NavLink>
        <NavLink to="/api">◉　API PÚBLICA</NavLink>
        <NavLink to="/arbol">⌘　ÁRBOL REACT</NavLink>
        <NavLink to="/bitacora">▧　BITÁCORA</NavLink>
      </nav>
      <div className="sidebar-controls">
        <button className={`arcade-tool-btn ${sound ? 'active' : ''}`} onClick={onSound} type="button">{sound ? '🔊 AUDIO ON' : '🔇 AUDIO OFF'}</button>
        <button className={`arcade-tool-btn ${scanlines ? 'active' : ''}`} onClick={onScanlines} type="button">▤ SCANLINES</button>
      </div>
      <p className="sidebar-footer">DEV-ARCADE v2.0<br />GRUPO 27 · TP2</p>
    </aside>
  );
}

export default function App() {
  const [credits, setCredits] = useState(() => Number(sessionStorage.getItem('arcade_credits')) || 2);
  const [sound, setSound] = useState(() => localStorage.getItem('arcade_sound') !== 'false');
  const [scanlines, setScanlines] = useState(() => localStorage.getItem('arcade_scanlines') !== 'false');

  useEffect(() => {
    document.body.classList.toggle('scanlines-active', scanlines);
    localStorage.setItem('arcade_scanlines', String(scanlines));
  }, [scanlines]);

  useEffect(() => localStorage.setItem('arcade_sound', String(sound)), [sound]);

  const insertCoin = () => {
    const nextCredits = credits + 1;
    setCredits(nextCredits);
    sessionStorage.setItem('arcade_credits', String(nextCredits));
    if (!sound || !window.AudioContext) return;

    const context = new window.AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(988, context.currentTime);
    oscillator.frequency.setValueAtTime(1319, context.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.25);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.25);
    oscillator.onended = () => context.close();
  };

  return (
    <div className="app-shell">
      <Sidebar credits={credits} sound={sound} onSound={() => setSound(!sound)} scanlines={scanlines} onScanlines={() => setScanlines(!scanlines)} />
      <main className="app-main">
        <div className="app-topbar"><span>SISTEMA: <b>DEV-ARCADE v2.0</b></span><span>STATUS: <b className="status-online">ONLINE</b></span></div>
        <Routes>
          <Route path="/" element={<Home onInsertCoin={insertCoin} />} />
          <Route path="/integrantes/:id" element={<Profile onInsertCoin={insertCoin} />} />
          <Route path="/recursos" element={<Catalog />} />
          <Route path="/api" element={<PublicApi />} />
          <Route path="/arbol" element={<ComponentTree />} />
          <Route path="/bitacora" element={<Journal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="app-footer">TU MÁQUINA RETRO DEV <span>INSERT COIN → START → CODE → REPEAT</span></footer>
      </main>
    </div>
  );
}

function PageHeading({ eyebrow, title, children }) {
  return <header className="page-heading"><span className="section-badge">{eyebrow}</span><h1>{title}</h1>{children && <p>{children}</p>}</header>;
}

function Home({ onInsertCoin }) {
  return (
    <div className="page-content">
      <section className="hero-arcade">
        <div className="arcade-cabinet-frame">
          <div className="hero-grid">
            <div className="hero-text-content">
              <p className="hero-badge-arcade">★ CHARACTER SELECT: EDICIÓN EQUIPO ★</p>
              <h1 className="hero-title">¡INSERTA UNA MONEDA Y <span>ELIGE TU PERSONAJE!</span></h1>
              <p className="hero-description"><strong>Tu Máquina Retro Dev</strong> presenta a un equipo que transforma el desarrollo web en una partida compartida. Conocé a sus integrantes, explorá sus recursos y descubrí cómo se construyó el proyecto.</p>
              <div className="hero-actions">
                <button className="btn-arcade btn-coin" onClick={onInsertCoin} type="button">🪙 INSERTAR MONEDA</button>
                <Link className="btn-arcade btn-cyan" to="/recursos">EXPLORAR CATÁLOGO</Link>
              </div>
            </div>
            <div className="arcade-screen-mockup">
              <div className="screen-crt-inner">
                <div className="screen-marquee"><span className="marquee-text">★ INSERT COIN TO START ★</span></div>
                <div className="screen-player-preview"><div className="home-team-portrait"><img src="/img/PortadoDevTeam.png" alt="Equipo Tu Máquina Retro Dev" /></div><div className="preview-name">DEV TEAM</div><div className="preview-role">4 PERSONAJES · 1 EQUIPO</div></div>
              </div>
              <div className="coin-door"><span className="coin-status-text">CRÉDITOS DEL EQUIPO</span><button className="btn-arcade btn-coin" onClick={onInsertCoin} type="button">+ INSERTAR</button></div>
            </div>
          </div>
        </div>
      </section>
      <section className="team-section">
        <header className="section-header"><span className="section-badge">CHARACTER SELECT</span><h2 className="section-title">NUESTRO EQUIPO</h2><p>Cuatro caminos distintos, una misma partida.</p></header>
        <div className="roster-grid">{members.map((member) => <MemberCard key={member.id} member={member} />)}</div>
      </section>
      <section className="home-shortcuts">
        <Link to="/api" className="feature-card"><span>◉</span><h3>JUEGOS GRATIS</h3><p>Explorá videojuegos free-to-play desde una API pública.</p><b>ABRIR CATÁLOGO →</b></Link>
        <Link to="/bitacora" className="feature-card"><span>▧</span><h3>REGISTRO DE PARTIDA</h3><p>Decisiones, avances y soluciones del equipo.</p><b>LEER BITÁCORA →</b></Link>
      </section>
    </div>
  );
}

function MemberCard({ member }) {
  return (
    <Link to={`/integrantes/${member.id}`} className={`player-card member-card accent-${member.color}`}>
      <span className="player-tag">{member.number}</span>
      <div className="player-avatar-box">{member.image ? <img src={member.image} alt={`Avatar de ${member.name}`} /> : <span className="avatar-placeholder" aria-hidden="true">👾</span>}</div>
      <div className="player-info-block"><h3 className="player-name">{member.name}</h3><p className="player-role-badge">{member.role}</p></div>
      <p className="player-select-label">ESPECIALIDAD: {member.specialty}</p>
    </Link>
  );
}

function Profile({ onInsertCoin }) {
  const { id } = useParams();
  const member = members.find((item) => item.id === id || (id === 'mateo' && item.id === 'dante'));
  if (!member) return <NotFound />;

  return (
    <div className="page-content">
      <div className="back-navigation"><Link className="btn-back" to="/">← VOLVER A LA PORTADA</Link></div>
      <PageHeading eyebrow={`PERSONAJE ${member.number}`} title={member.name}>Perfil de integrante · {member.role}</PageHeading>
      <section className={`profile-hero-card accent-${member.color}`}>
        <div className="profile-avatar-large">{member.image ? <img src={member.image} alt={`Avatar de ${member.name}`} /> : <span className="avatar-placeholder">👾</span>}</div>
        <div className="profile-bio-info"><span className="profile-role-title">{member.role}</span><div className="profile-stats-pill-row">{member.location && <span className="profile-badge">📍 {member.location}</span>}<span className="profile-badge">⚔️ {member.specialty}</span>{member.focus && <span className="profile-badge">✨ {member.focus}</span>}</div></div>
        <button className="btn-arcade btn-coin" onClick={onInsertCoin} type="button">🪙 +1 CRÉDITO</button>
      </section>
      {member.sections ? (
        <div className="profile-sections-grid">
          {member.sections.map((section) => <section className="profile-panel" key={section.title}><h2 className="panel-heading">{section.title}</h2>{section.subtitle && <h3 className="profile-section-subtitle">{section.subtitle}</h3>}<div className="media-items-grid skills-cards">{section.skills.map((skill) => <article className="media-card" key={skill.name}><div className="media-icon" aria-hidden="true">✦</div><div className="media-details"><h3 className="media-title">{skill.name}</h3><p className="media-subtitle">{skill.description}</p></div></article>)}</div></section>)}
        </div>
      ) : (
        <div className="profile-sections-grid">
          <section className="profile-panel"><h2 className="panel-heading">⚡ HABILIDADES</h2><div className="media-items-grid skills-cards">{member.skills.map((skill) => <article className="media-card" key={skill}><div className="media-icon" aria-hidden="true">✦</div><div className="media-details"><h3 className="media-title">{skill}</h3><p className="media-subtitle">Conocimiento y aporte al equipo de desarrollo.</p></div></article>)}</div></section>
          <section className="profile-panel"><h2 className="panel-heading">★ INTERESES Y FAVORITOS</h2><div className="profile-favorites">{member.favorites.map((favorite) => <span className="profile-badge" key={favorite}>{favorite}</span>)}</div></section>
        </div>
      )}
    </div>
  );
}

function Catalog() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Todas');
  const types = [...new Set(resources.map((item) => item.type))];
  const filtered = useMemo(
    () => resources.filter((item) => (type === 'Todas' || item.type === type) && `${item.name} ${item.description} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase())),
    [query, type],
  );

  return (
    <div className="page-content">
      <PageHeading eyebrow="ARCHIVO LOCAL · JSON" title="CATÁLOGO DE RECURSOS">Herramientas y conceptos relacionados con el desarrollo de nuestra máquina arcade.</PageHeading>
      <div className="catalog-controls">
        <label>BUSCAR<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej.: React, diseño..." /></label>
        <label>FILTRAR POR TIPO<select value={type} onChange={(event) => setType(event.target.value)}><option>Todas</option>{types.map((itemType) => <option key={itemType}>{itemType}</option>)}</select></label>
        <span className="catalog-count">{filtered.length} / {resources.length} RECURSOS</span>
      </div>
      <div className="resource-grid">{filtered.map((item) => <article className="resource-card" key={item.id}><span className="resource-type">{item.type}</span><h2>{item.name}</h2><p>{item.description}</p></article>)}</div>
      {filtered.length === 0 && <p className="empty-state">No encontramos recursos con esos criterios. Probá otra búsqueda o filtro.</p>}
    </div>
  );
}

function PublicApi() {
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGames() {
      setStatus('loading');
      setError('');
      try {
        const response = await fetch('https://www.freetogame.com/api/games?sort-by=popularity', { signal: controller.signal });
        if (!response.ok) throw new Error(`La API respondió con estado ${response.status}.`);
        const result = await response.json();
        if (!Array.isArray(result)) throw new Error('La API devolvió un formato inesperado.');
        setGames(result.slice(0, 12));
        setStatus('success');
      } catch (requestError) {
        if (requestError.name === 'AbortError') return;
        setError(requestError.message || 'Ocurrió un error al consultar la API.');
        setStatus('error');
      }
    }

    loadGames();
    return () => controller.abort();
  }, [attempt]);

  return (
    <div className="page-content">
      <PageHeading eyebrow="API PÚBLICA · FREETOGAME" title="JUEGOS FREE-TO-PLAY">Consultamos FreeToGame para mostrar videojuegos gratuitos, sus géneros, plataformas e imágenes. La lista destaca los 12 más populares.</PageHeading>
      {status === 'loading' && <p className="api-message" role="status">⏳ Conectando con FreeToGame…</p>}
      {status === 'error' && <div className="api-message api-error" role="alert"><p>No se pudieron cargar los juegos: {error}</p><button className="btn-arcade btn-outline" onClick={() => setAttempt(attempt + 1)} type="button">VOLVER A INTENTAR</button></div>}
      {status === 'success' && games.length === 0 && <p className="api-message">La API no devolvió juegos para mostrar.</p>}
      {status === 'success' && games.length > 0 && <div className="resource-grid game-grid">{games.map((game) => <article className="resource-card game-card" key={game.id}><img src={game.thumbnail} alt={`Portada de ${game.title}`} loading="lazy" /><span className="resource-type">{game.genre} · {game.platform}</span><h2>{game.title}</h2><p>{game.short_description}</p><a href={game.game_url} target="_blank" rel="noreferrer">VER JUEGO ↗</a></article>)}</div>}
    </div>
  );
}

function ComponentTree() {
  const branches = [
    { parent: 'App', children: ['Sidebar', 'Routes', 'Footer'] },
    { parent: 'Routes', children: ['Home → MemberCard', 'Profile → PageHeading', 'Catalog → ResourceCard', 'PublicApi → GameCard', 'ComponentTree', 'Journal → JournalEntry'] },
  ];
  return (
    <div className="page-content">
      <PageHeading eyebrow="ARQUITECTURA DE LA APP" title="ÁRBOL DE RENDERIZADO">Estructura de componentes que corresponde a las rutas y componentes entregados.</PageHeading>
      <div className="tree-root"><div className="tree-node tree-main">React root · BrowserRouter</div>{branches.map(({ parent, children }) => <section className="tree-branch" key={parent}><div className="tree-node">{parent}</div><div className="tree-children">{children.map((child) => <div className="tree-node tree-child" key={child}>{child}</div>)}</div></section>)}</div>
    </div>
  );
}

function Journal() {
  const [category, setCategory] = useState('Todas');
  const categories = ['Todas', ...new Set(journal.map((entry) => entry.category))];
  const entries = journal.filter((entry) => category === 'Todas' || entry.category === category);
  return (
    <div className="page-content">
      <PageHeading eyebrow="REGISTRO DE PARTIDA" title="BITÁCORA">Un recorrido por las decisiones, avances y soluciones del equipo desde TP1 hasta TP2.</PageHeading>
      <div className="bitacora-filters">{categories.map((item) => <button className={`filter-btn ${category === item ? 'active' : ''}`} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}</div>
      <div className="bitacora-timeline">{entries.map((entry, index) => <article className="log-entry" key={`${entry.date}-${entry.title}`}><div className="log-header"><span className="log-tag tag-organizacion">{entry.category}</span><time className="log-date">{entry.date} · REGISTRO {String(index + 1).padStart(2, '0')}</time></div><h2 className="log-title">{entry.title}</h2><p className="log-content">{entry.text}</p></article>)}</div>
    </div>
  );
}

function NotFound() {
  return <div className="page-content not-found"><PageHeading eyebrow="ERROR 404" title="PERSONAJE NO ENCONTRADO">Esa ruta no pertenece a esta partida.</PageHeading><Link className="btn-arcade btn-cyan" to="/">VOLVER A PORTADA</Link></div>;
}
