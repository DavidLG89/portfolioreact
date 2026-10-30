import { Link, NavLink } from 'react-router-dom';
import { members } from '../../data/members.js';

export default function Sidebar({ credits, sound, onSound, scanlines, onScanlines }) {
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
