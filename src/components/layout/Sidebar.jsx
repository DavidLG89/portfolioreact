import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { members } from '../../data/members.js';

export default function Sidebar({ credits, sound, onSound, scanlines, onScanlines }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <aside className={`sidebar ${menuOpen ? 'menu-open' : ''}`}>
      <div className="sidebar-top">
        <Link className="app-brand" to="/" aria-label="Tu Máquina Retro Dev, portada" onClick={closeMenu}>
          <span className="brand-icon app-logo" aria-hidden="true">▣</span>
          <span><strong>TU MÁQUINA<br />RETRO DEV</strong><small>UN EQUIPO, UNA PARTIDA</small></span>
        </Link>
        <button
          className="sidebar-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={menuOpen}
          aria-controls="sidebar-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
      </div>
      <div className="sidebar-score"><span>HIGH SCORE</span><strong>999,990</strong><span>CRÉDITOS　{String(credits).padStart(2, '0')}</span></div>
      <nav className="sidebar-nav" id="sidebar-navigation" aria-label="Navegación principal">
        <NavLink to="/" end onClick={closeMenu}>▣　PORTADA</NavLink>
        <div className="sidebar-label">PERSONAJES</div>
        {members.map((member) => <NavLink key={member.id} to={`/integrantes/${member.id}`} onClick={closeMenu}>{member.number}　{member.name}</NavLink>)}
        <div className="sidebar-label">EXPLORAR</div>
        <NavLink to="/recursos" onClick={closeMenu}>▤　CATÁLOGO</NavLink>
        <NavLink to="/api" onClick={closeMenu}>◉　API PÚBLICA</NavLink>
        <NavLink to="/arbol" onClick={closeMenu}>⌘　ÁRBOL REACT</NavLink>
        <NavLink to="/bitacora" onClick={closeMenu}>▧　BITÁCORA</NavLink>
      </nav>
      <div className="sidebar-controls">
        <button className={`arcade-tool-btn ${sound ? 'active' : ''}`} onClick={onSound} type="button">{sound ? '🔊 AUDIO ON' : '🔇 AUDIO OFF'}</button>
        <button className={`arcade-tool-btn ${scanlines ? 'active' : ''}`} onClick={onScanlines} type="button">▤ SCANLINES</button>
      </div>
      <p className="sidebar-footer">DEV-ARCADE v2.0<br />GRUPO 27 · TP2</p>
    </aside>
  );
}
