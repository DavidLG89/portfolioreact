import { Link } from 'react-router-dom';
import PageHeading from '../components/common/PageHeading.jsx';

export default function NotFoundPage() {
  return <div className="page-content not-found"><PageHeading eyebrow="ERROR 404" title="PERSONAJE NO ENCONTRADO">Esa ruta no pertenece a esta partida.</PageHeading><Link className="btn-arcade btn-cyan" to="/">VOLVER A PORTADA</Link></div>;
}
