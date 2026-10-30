import { Link, useParams } from 'react-router-dom';
import PageHeading from '../components/common/PageHeading.jsx';
import { members } from '../data/members.js';
import NotFoundPage from './NotFoundPage.jsx';

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
          {member.location && <span className="profile-badge">📍 {member.location}</span>}<span className="profile-badge">⚔️ {member.specialty}</span>{member.focus && <span className="profile-badge">✨ {member.focus}</span>}
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
            {member.favorites.map((favorite) => <span className="profile-badge" key={favorite}>{favorite}</span>)}
          </div></section>
        </div>
      )}
    </div>
  );
}
