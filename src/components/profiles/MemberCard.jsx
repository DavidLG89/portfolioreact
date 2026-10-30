import { Link } from 'react-router-dom';

export default function MemberCard({ member }) {
  return (
    <Link to={`/integrantes/${member.id}`} className={`player-card member-card accent-${member.color}`}>
      <span className="player-tag">{member.number}</span>
      <div className="player-avatar-box">{member.image ? <img src={member.image} alt={`Avatar de ${member.name}`} /> : <span className="avatar-placeholder" aria-hidden="true">👾</span>}</div>
      <div className="player-info-block"><h3 className="player-name">{member.name}</h3><p className="player-role-badge">{member.role}</p></div>
      <p className="player-select-label">ESPECIALIDAD: {member.specialty}</p>
    </Link>
  );
}
