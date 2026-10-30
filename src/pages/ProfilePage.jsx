import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeading from '../components/common/PageHeading.jsx';
import { members } from '../data/members.js';
import NotFoundPage from './NotFoundPage.jsx';

const retroPalettes = {
  arcade: { label: 'ARCADE NEON (DEFAULT)', primary: '#00f0ff', background: '#0b0d17' },
  gameboy: { label: 'GAME BOY VERDE (1989)', primary: '#9bbc0f', background: '#0f380f' },
  cga: { label: 'CGA RETRO (1981)', primary: '#ff55ff', background: '#0000aa' },
  cyberpunk: { label: 'CYBERPUNK HIGH CONTRAST', primary: '#ffe600', background: '#000000' },
};

function RetroPaletteGame() {
  const [paletteKey, setPaletteKey] = useState('arcade');
  const palette = retroPalettes[paletteKey];

  return (
    <section className="profile-interactive-panel" aria-labelledby="retro-palette-heading">
      <h2 className="interactive-title" id="retro-palette-heading">SIMULADOR DE PALETAS RETRO</h2>
      <p className="interactive-desc">Elige una paleta y observa el cambio de colores en la vista previa.</p>
      <div className="p1-palette-controls" role="group" aria-label="Elegir paleta de colores">
        {Object.entries(retroPalettes).map(([key, option]) => {
          const selected = paletteKey === key;
          return (
            <button
              className={`btn-arcade ${selected ? 'btn-cyan active' : 'btn-outline'}`}
              key={key}
              type="button"
              aria-pressed={selected}
              onClick={() => setPaletteKey(key)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <div
        className="p1-palette-preview"
        style={{ backgroundColor: palette.background, borderColor: palette.primary, color: palette.primary }}
        aria-live="polite"
      >
        <h3 className="p1-palette-preview-title">VISTA PREVIA EN TIEMPO REAL</h3>
        <p className="p1-palette-preview-description">Paleta seleccionada: {palette.label}</p>
        <code className="p1-palette-values" style={{ color: palette.primary, backgroundColor: palette.background }}>
          --retro-primary: {palette.primary}; --retro-bg: {palette.background};
        </code>
      </div>
    </section>
  );
}

export default function ProfilePage({ onInsertCoin }) {
  const { id } = useParams();
  const member = members.find((item) => item.id === id || (id === 'mateo' && item.id === 'dante'));
  if (!member) return <NotFoundPage />;

  return (
    <div className="page-content">
      <div className="back-navigation"><Link className="btn-back" to="/">← VOLVER A LA PORTADA</Link></div>
      <PageHeading eyebrow={`PERSONAJE ${member.number}`} title={member.name}>Perfil de integrante · {member.role}</PageHeading>
      <section className={`profile-hero-card accent-${member.color}`}>
        <div className="profile-avatar-large">{member.image ? <img src={member.image} alt={`Avatar de ${member.name}`} /> : <span className="avatar-placeholder">👾</span>}</div>
        <div className="profile-bio-info"><span className="profile-role-title">{member.role}</span><div className="profile-stats-pill-row">
          {member.age && <span className="profile-badge">{member.age} años</span>}{member.location && <span className="profile-badge">📍 {member.location}</span>}<span className="profile-badge">⚔️ {member.specialty}</span>{member.focus && <span className="profile-badge">✨ {member.focus}</span>}
        </div></div>
        <button className="btn-arcade btn-coin" onClick={onInsertCoin} type="button">🪙 +1 CRÉDITO</button>
      </section>
      {member.sections ? (
        <div className="profile-sections-grid">{member.sections.map((section) => <section className="profile-panel" key={section.title}>
          <h2 className="panel-heading">{section.title}</h2>{section.subtitle && <h3 className="profile-section-subtitle">{section.subtitle}</h3>}
          <div className="media-items-grid skills-cards">{section.skills.map((skill) => <article className="media-card" key={skill.name}><div className="media-icon" aria-hidden="true">✦</div><div className="media-details"><h3 className="media-title">{skill.name}</h3><p className="media-subtitle">{skill.description}</p></div></article>)}</div>
        </section>)}</div>
      ) : (
        <div className="profile-sections-grid">
          <section className="profile-panel"><h2 className="panel-heading">⚡ HABILIDADES</h2><div className="media-items-grid skills-cards">
            {member.skills.map((skill) => <article className="media-card" key={skill}><div className="media-icon" aria-hidden="true">✦</div><div className="media-details"><h3 className="media-title">{skill}</h3><p className="media-subtitle">Conocimiento y aporte al equipo de desarrollo.</p></div></article>)}
          </div></section>
          <section className="profile-panel"><h2 className="panel-heading">★ INTERESES Y FAVORITOS</h2><div className="profile-favorites">
            {member.favoriteImages ? (
              <div className="profile-favorite-gallery">
                {member.favoriteImages.map((favorite) => (
                  <figure className="profile-favorite-card" key={favorite.name}>
                    <img src={favorite.src} alt={favorite.name} loading="lazy" />
                    <figcaption>{favorite.name}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="profile-favorites">
                {member.favorites.map((favorite) => <span className="profile-badge" key={favorite}>{favorite}</span>)}
              </div>
            )}
          </div></section>
        </div>
      )}
      {member.id === 'david' && <RetroPaletteGame />}
    </div>
  );
}
