import './App.scss';
import logo from './assets/logo.avif';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import './i18n';

function App() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferred-language', lng);
  };

  // Lade die bevorzugte Sprache beim Start
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  
  // Scroll-Fortschrittsanzeige
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight) * 100;
      document.documentElement.style.setProperty('--scroll', scrollPercent.toString());
      
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="blog-container">
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar"></div>
      </div>
      <div className="lang-switch">
        <button onClick={() => handleLanguageChange('de')}>DE</button>
        <button onClick={() => handleLanguageChange('en')}>EN</button>
      </div>
      <header className="blog-header">
        <img 
          src={logo} 
          alt="Bitaxe Logo" 
          style={{ 
            maxWidth: '200px', 
            marginBottom: '1rem',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' 
          }} 
        />
        <h1>{t('blog_title')}</h1>
      </header>
      <main className="blog-content">
        {/* Verwende formatierte Abschnitte für bessere Lesbarkeit */}
        <article 
          className="blog-article"
          dangerouslySetInnerHTML={{ 
            __html: t('blog_content')
              .replace(/\n\n(.*?):\n/g, '</p><h2>$1</h2><p>')  // Überschriften erkennen
              .replace(/\n\n/g, '</p><p>') // Absätze
              .replace(/\n([A-Za-z].*?) – /g, '</p><p class="feature-item"><span class="feature-title">$1</span> – ') // Aufzählungspunkte mit Titel
              .replace(/\n/g, '<br />') // Einfache Zeilenumbrüche
          }}
        />
      </main>
      <footer className="blog-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Solo Mining</p>
          <div className="social-links">
            <a href="https://twitter.com/dtv_electronics" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://github.com/skot/bitaxe" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
