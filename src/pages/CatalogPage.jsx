import { useMemo, useState } from 'react';
import PageHeading from '../components/common/PageHeading.jsx';
import resources from '../data/resources.json';

export default function CatalogPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Todas');
  const types = [...new Set(resources.map((item) => item.type))];
  const filtered = useMemo(
    () => resources.filter((item) => (type === 'Todas' || item.type === type)
      && `${item.name} ${item.description} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase())),
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
