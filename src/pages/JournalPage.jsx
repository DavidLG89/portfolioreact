import { useState } from 'react';
import PageHeading from '../components/common/PageHeading.jsx';
import { journal } from '../data/journal.js';

export default function JournalPage() {
  const [category, setCategory] = useState('Todas');
  const categories = ['Todas', ...new Set(journal.map((entry) => entry.category))];
  const entries = journal.filter((entry) => category === 'Todas' || entry.category === category);
  return (
    <div className="page-content">
      <PageHeading eyebrow="REGISTRO DE PARTIDA" title="BITÁCORA">Un recorrido por las decisiones, avances y soluciones del equipo desde TP1 hasta TP2.</PageHeading>
      <div className="bitacora-filters">{categories.map((item) => <button className={`filter-btn ${category === item ? 'active' : ''}`} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}</div>
      <div className="bitacora-timeline">{entries.map((entry, index) => <article className="log-entry" key={`${entry.date}-${entry.title}`}>
        <div className="log-header"><span className="log-tag tag-organizacion">{entry.category}</span><time className="log-date">{entry.date} · REGISTRO {String(index + 1).padStart(2, '0')}</time></div>
        <h2 className="log-title">{entry.title}</h2><p className="log-content">{entry.text}</p>
      </article>)}</div>
    </div>
  );
}
