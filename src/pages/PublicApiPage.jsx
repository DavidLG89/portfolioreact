import { useEffect, useState } from 'react';
import PageHeading from '../components/common/PageHeading.jsx';

export default function PublicApiPage() {
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
