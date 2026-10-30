import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';
import HomePage from '../pages/HomePage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import CatalogPage from '../pages/CatalogPage.jsx';
import PublicApiPage from '../pages/PublicApiPage.jsx';
import ComponentTreePage from '../pages/ComponentTreePage.jsx';
import JournalPage from '../pages/JournalPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default function App() {
  const [credits, setCredits] = useState(() => Number(sessionStorage.getItem('arcade_credits')) || 2);
  const [sound, setSound] = useState(() => localStorage.getItem('arcade_sound') !== 'false');
  const [scanlines, setScanlines] = useState(() => localStorage.getItem('arcade_scanlines') !== 'false');

  useEffect(() => {
    document.body.classList.toggle('scanlines-active', scanlines);
    localStorage.setItem('arcade_scanlines', String(scanlines));
  }, [scanlines]);

  useEffect(() => localStorage.setItem('arcade_sound', String(sound)), [sound]);

  function insertCoin() {
    const nextCredits = credits + 1;
    setCredits(nextCredits);
    sessionStorage.setItem('arcade_credits', String(nextCredits));
    if (!sound || !window.AudioContext) return;

    const context = new window.AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(988, context.currentTime);
    oscillator.frequency.setValueAtTime(1319, context.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.25);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.25);
    oscillator.onended = () => context.close();
  }

  return (
    <div className="app-shell">
      <Sidebar credits={credits} sound={sound} onSound={() => setSound(!sound)} scanlines={scanlines} onScanlines={() => setScanlines(!scanlines)} />
      <main className="app-main">
        <div className="app-topbar"><span>SISTEMA: <b>DEV-ARCADE v2.0</b></span><span>STATUS: <b className="status-online">ONLINE</b></span></div>
        <Routes>
          <Route path="/" element={<HomePage onInsertCoin={insertCoin} />} />
          <Route path="/integrantes/:id" element={<ProfilePage onInsertCoin={insertCoin} />} />
          <Route path="/recursos" element={<CatalogPage />} />
          <Route path="/api" element={<PublicApiPage />} />
          <Route path="/arbol" element={<ComponentTreePage />} />
          <Route path="/bitacora" element={<JournalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <footer className="app-footer">TU MÁQUINA RETRO DEV <span>INSERT COIN → START → CODE → REPEAT</span></footer>
      </main>
    </div>
  );
}
