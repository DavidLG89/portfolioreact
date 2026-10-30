import AppFooter from './AppFooter.jsx';
import AppTopbar from './AppTopbar.jsx';

export default function AppMain({ children }) {
  return (
    <main className="app-main">
      <AppTopbar />
      {children}
      <AppFooter />
    </main>
  );
}
