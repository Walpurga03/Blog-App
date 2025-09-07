import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.avif';

function Header() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferred-language', lng);
  };

  return (
    <header className="site-header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
            <img 
              src={logo} 
              alt="Solomining Logo" 
              className="site-logo" 
            />
          </Link>
          <h1 className="site-title">Solomining</h1>
        </div>
        <div className="header-actions">
          <div className="lang-switch">
            <button onClick={() => handleLanguageChange('de')}>DE</button>
            <button onClick={() => handleLanguageChange('en')}>EN</button>
          </div>
        </div>
      </div>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar"></div>
      </div>
    </header>
  );
}

export default Header;
