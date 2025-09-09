import { useTranslation } from 'react-i18next';
import './FeaturesSection.scss';

const FeaturesSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="features-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="gradient-text">{t('home.why_bitaxe')}</span>
        </h2>
        <p className="section-subtitle">{t('home.discover_advantages')}</p>
      </div>
      
      <div className="features-container">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <div className="feature-icon">⚡</div>
          </div>
          <h3>{t('home.energy_efficient')}</h3>
          <p>{t('home.energy_efficient_desc')}</p>
          <a href="#energy" className="feature-link">
            {t('home.learn_more')} <span className="arrow">→</span>
          </a>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <div className="feature-icon">🔒</div>
          </div>
          <h3>{t('home.decentralized')}</h3>
          <p>{t('home.decentralized_desc')}</p>
          <a href="#decentralized" className="feature-link">
            {t('home.learn_more')} <span className="arrow">→</span>
          </a>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <div className="feature-icon">🛠️</div>
          </div>
          <h3>{t('home.open_source')}</h3>
          <p>{t('home.open_source_desc')}</p>
          <a href="#opensource" className="feature-link">
            {t('home.learn_more')} <span className="arrow">→</span>
          </a>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <div className="feature-icon">💰</div>
          </div>
          <h3>{t('home.cost_effective')}</h3>
          <p>{t('home.cost_effective_desc')}</p>
          <a href="#cost" className="feature-link">
            {t('home.learn_more')} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
