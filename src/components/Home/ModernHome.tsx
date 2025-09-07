import './ModernHome.scss';
import BitaxeHomeImage from '../../assets/Bitaxe_Home.jpg';
import NerdQaxeImage from '../../assets/NerdQaxe__main.webp';
import { useBlogCards } from '../../hooks/useBlogPosts';
import { useTranslation } from 'react-i18next';

// Statische Bildpfade für die Blog-Karten
const BLOG_IMAGES = {
  'bitaxe-overview': '/images/bitaxe-gamma.jpg',
  'solo-mining-guide': '/images/solo-mining.jpg',
  'bitaxe-setup': '/images/bitaxe-setup.jpg',
  'bitaxe-home': '/images/bitaxe-home.jpg'
};

interface CardItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

function ModernHome() {
  const { t } = useTranslation();
  
  // Wir möchten nur einen Blog-Beitrag anzeigen: "bitaxe-home"
  const availableBlogIds = ['bitaxe-home'];
  
  // Blog-Karten laden
  const { blogCards, loading } = useBlogCards(availableBlogIds);
  
  // Blog-Karten vorbereiten - nur mit einem Blog-Artikel
  const blogPosts: CardItem[] = !loading ? 
    availableBlogIds
      .filter(id => blogCards[id] !== null)
      .map(id => ({
        id,
        title: blogCards[id]?.card.title || id,
        description: blogCards[id]?.card.description || '',
        imageUrl: BLOG_IMAGES[id as keyof typeof BLOG_IMAGES] || '/images/default.jpg',
        link: `/blog/${id}`
      })) : [
        // Fallback-Karte, falls die Daten noch geladen werden
        {
          id: 'bitaxe-home',
          title: t('blog_cards.bitaxe_home.title'),
          description: t('blog_cards.bitaxe_home.description'),
          imageUrl: BLOG_IMAGES['bitaxe-home'],
          link: '/blog/bitaxe-home'
        }
      ];
  
  return (
    <div className="modern-home">
      
      {/* Hero Section mit Animation und moderner Gestaltung */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Bitaxe</span> {t('home.hero_title')}
          </h1>
          <p className="hero-subtitle">
            {t('home.hero_subtitle')}
          </p>
          <div className="hero-buttons">
            <button className="primary-button">{t('home.learn_more')}</button>
            <button className="secondary-button">{t('home.tutorials')}</button>
          </div>
        </div>
        
        <div className="hero-feature-image">
          <div className="image-container">
            <img src={BitaxeHomeImage} alt="Bitaxe Miner" className="hero-image" />
            <div className="image-overlay"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">{t('home.why_bitaxe')}</h2>
          <p className="section-subtitle">{t('home.discover_advantages')}</p>
        </div>
        
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>{t('home.energy_efficient')}</h3>
            <p>{t('home.energy_efficient_desc')}</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>{t('home.decentralized')}</h3>
            <p>{t('home.decentralized_desc')}</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🛠️</div>
            <h3>{t('home.open_source')}</h3>
            <p>{t('home.open_source_desc')}</p>
          </div>
        </div>
      </section>

           {/* Featured Blog Post Section - Hervorgehobener Blog-Beitrag */}
      <section className="featured-blog-section">
        <div className="section-header">
          <h2 className="section-title">{t('home.latest_posts')}</h2>
          <p className="section-subtitle">{t('home.latest_developments')}</p>
        </div>
        
        <div className="featured-blog-container">
          {blogPosts.length > 0 && (
            <div className="featured-blog-card">
              <div className="featured-blog-image">
                <img src={blogPosts[0].imageUrl} alt={blogPosts[0].title} />
              </div>
              <div className="featured-blog-content">
                <h3>{blogPosts[0].title}</h3>
                <p>{blogPosts[0].description}</p>
                <a href={blogPosts[0].link} className="featured-blog-button">
                  {t('home.read_more')}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">{t('home.stay_updated')}</h2>
            <p className="newsletter-description">
              {t('home.newsletter_desc')}
            </p>
          </div>
          
          <div className="newsletter-form">
            <input type="email" placeholder={t('home.email_placeholder')} className="newsletter-input" />
            <button className="newsletter-button">{t('home.subscribe')}</button>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">{t('home.cta_title')}</h2>
            <p className="cta-description">
              {t('home.cta_text')}
            </p>
            <button className="cta-button">{t('home.cta_button')}</button>
          </div>
          
          <div className="cta-image-container">
            <img src={NerdQaxeImage} alt="Bitaxe NerdQaxe Miner" className="cta-image" />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">SoloMining</h3>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>{t('footer.links')}</h4>
              <ul>
                <li><a href="#">{t('footer.home')}</a></li>
                <li><a href="#">{t('footer.blog')}</a></li>
                <li><a href="#">{t('footer.tutorials')}</a></li>
                <li><a href="#">{t('footer.about')}</a></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>{t('footer.community')}</h4>
              <ul>
                <li><a href="#">Discord</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Reddit</a></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>{t('footer.support')}</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">{t('footer.contact')}</a></li>
                <li><a href="#">{t('footer.documentation')}</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">&copy; 2025 SoloMining. {t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
}

export default ModernHome;
