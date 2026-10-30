import { Link } from 'react-router-dom';
import { members } from '../data/members.js';
import MemberCard from '../components/profiles/MemberCard.jsx';

export default function HomePage({ onInsertCoin }) {
  return (
    <div className="page-content">
      <section className="hero-arcade"><div className="arcade-cabinet-frame"><div className="hero-grid">
        <div className="hero-text-content">
          <p className="hero-badge-arcade">★ CHARACTER SELECT: EDICIÓN EQUIPO ★</p>
          <h1 className="hero-title">¡INSERTA UNA MONEDA Y <span>ELIGE TU PERSONAJE!</span></h1>
          <p className="hero-description"><strong>Tu Máquina Retro Dev</strong> presenta a un equipo que transforma el desarrollo web en una partida compartida. Conocé a sus integrantes, explorá sus recursos y descubrí cómo se construyó el proyecto.</p>
          <div className="hero-actions">
            <button className="btn-arcade btn-coin" onClick={onInsertCoin} type="button">🪙 INSERTAR MONEDA</button>
            <Link className="btn-arcade btn-cyan" to="/recursos">EXPLORAR CATÁLOGO</Link>
          </div>
        </div>
        <div className="arcade-screen-mockup"><div className="screen-crt-inner">
          <div className="screen-marquee"><span className="marquee-text">★ INSERT COIN TO START ★</span></div>
          <div className="screen-player-preview"><div className="home-team-portrait"><img src="/img/PortadoDevTeam.png" alt="Equipo Tu Máquina Retro Dev" /></div><div className="preview-name">DEV TEAM</div><div className="preview-role">4 PERSONAJES · 1 EQUIPO</div></div>
        </div><div className="coin-door"><span className="coin-status-text">CRÉDITOS DEL EQUIPO</span><button className="btn-arcade btn-coin" onClick={onInsertCoin} type="button">+ INSERTAR</button></div></div>
      </div></div></section>
      <section className="team-section"><header className="section-header"><span className="section-badge">CHARACTER SELECT</span><h2 className="section-title">NUESTRO EQUIPO</h2><p>Cuatro caminos distintos, una misma partida.</p></header>
        <div className="roster-grid">{members.map((member) => <MemberCard key={member.id} member={member} />)}</div>
      </section>
      <section className="home-shortcuts">
        <Link to="/api" className="feature-card"><span>◉</span><h3>JUEGOS GRATIS</h3><p>Explorá videojuegos free-to-play desde una API pública.</p><b>ABRIR CATÁLOGO →</b></Link>
        <Link to="/bitacora" className="feature-card"><span>▧</span><h3>REGISTRO DE PARTIDA</h3><p>Decisiones, avances y soluciones del equipo.</p><b>LEER BITÁCORA →</b></Link>
      </section>
    </div>
  );
}
