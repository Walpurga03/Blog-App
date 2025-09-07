import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ModernHeader.scss';
import logo from '../../assets/Solomining_Logo_Orange_Transparent_schmaler.png'; // Verwende das transparente Logo
import ThemeToggle from '../UI/ThemeToggle';

function ModernHeader() {
  const { i18n, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Überwache das Scrollen für die Header-Transparenz
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sprachwechsel-Handler
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferred-language', lng);
  };

  // Toggle für das mobile Menü
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`modern-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img 
              src={logo} 
              alt="Solomining Logo" 
              className="site-logo animate-logo" 
            />
          </Link>
        </div>
        
        <div className={`nav-container ${menuOpen ? 'open' : ''}`}>
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/" className="nav-link">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/blog" className="nav-link">{t('nav.blog')}</Link>
              </li>
              <li>
                <Link to="/tutorials" className="nav-link">{t('nav.tutorials')}</Link>
              </li>
              <li>
                <Link to="/about" className="nav-link">{t('nav.about')}</Link>
              </li>
            </ul>
          </nav>
          
          <div className="header-actions">
            <div className="modern-lang-switch">
              <button 
                className={i18n.language === 'de' ? 'active' : ''} 
                onClick={() => handleLanguageChange('de')}
              >
                DE
              </button>
              <button 
                className={i18n.language === 'en' ? 'active' : ''} 
                onClick={() => handleLanguageChange('en')}
              >
                EN
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
        
        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
}

export default ModernHeader;
