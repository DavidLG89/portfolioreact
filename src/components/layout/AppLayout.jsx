import AppMain from './AppMain.jsx';
import Sidebar from './Sidebar.jsx';

export default function AppLayout({ credits, sound, onSound, scanlines, onScanlines, children }) {
  return (
    <div className="app-shell">
      <Sidebar
        credits={credits}
        sound={sound}
        onSound={onSound}
        scanlines={scanlines}
        onScanlines={onScanlines}
      />
      <AppMain>{children}</AppMain>
    </div>
  );
}
