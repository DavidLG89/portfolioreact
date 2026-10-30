import { useEffect, useState } from 'react';
import AppLayout from '../components/layout/AppLayout.jsx';
import AppRoutes from './AppRoutes.jsx';

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
    <AppLayout
      credits={credits}
      sound={sound}
      onSound={() => setSound(!sound)}
      scanlines={scanlines}
      onScanlines={() => setScanlines(!scanlines)}
    >
      <AppRoutes onInsertCoin={insertCoin} />
    </AppLayout>
  );
}
