// React und externe Bibliotheken
import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Komponenten
import ModernLayout from './components/Layout/ModernLayout';
import ModernHome from './components/Home/ModernHome';
import Blog from './components/Blog/Blog';

// Stile und Konfigurationen
import './App.scss';
import './i18n';

function App() {
  const { i18n } = useTranslation();

  // Lade die bevorzugte Sprache beim Start
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  
  return (
    <Router>
      <ModernLayout>
        <Routes>
          <Route path="/" element={<ModernHome />} />
          <Route path="/blog/:blogId" element={<Blog />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </ModernLayout>
    </Router>
  );
}

export default App;
