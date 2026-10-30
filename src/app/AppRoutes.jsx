import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import CatalogPage from '../pages/CatalogPage.jsx';
import PublicApiPage from '../pages/PublicApiPage.jsx';
import ComponentTreePage from '../pages/ComponentTreePage.jsx';
import JournalPage from '../pages/JournalPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default function AppRoutes({ onInsertCoin }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage onInsertCoin={onInsertCoin} />} />
      <Route path="/integrantes/:id" element={<ProfilePage onInsertCoin={onInsertCoin} />} />
      <Route path="/recursos" element={<CatalogPage />} />
      <Route path="/api" element={<PublicApiPage />} />
      <Route path="/arbol" element={<ComponentTreePage />} />
      <Route path="/bitacora" element={<JournalPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
