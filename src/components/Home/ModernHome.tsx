import './ModernHome.scss';
import BitaxeHomeImage1 from '../../assets/images/Hero-Section/Bitaxe-1.jpg';
import BitaxeHomeImage2 from '../../assets/images/Hero-Section/Bitaxe-2.jpg';
import BitaxeHomeImage3 from '../../assets/images/Hero-Section/Bitaxe-3.jpg';
import BitaxeHomeImage4 from '../../assets/images/Hero-Section/Bitaxe-4.jpg';
import BitaxeHomeImage5 from '../../assets/images/Hero-Section/Bitaxe-5.webp';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback, useRef } from 'react';
import ProfessionalCardSlider from '../CardSlider/ProfessionalCardSlider';
import useBlogCards from '../../hooks/useBlogCards';

// Featured Blog Content Component
const FeaturedBlogContent = () => {
  const { blogCards, loading } = useBlogCards();
  
  if (loading) {
    return <div className="loading-container">Loading blog posts...</div>;
  }
  
  // Map blog cards to the format expected by ProfessionalCardSlider
  const formattedCards = blogCards.map(card => ({
    id: card.id,
    title: card.title,
    description: card.description,
    imageUrl: card.image,
    link: `/blog/${card.slug}`
  }));
  
  return <ProfessionalCardSlider cards={formattedCards} />;
};


function ModernHome() {
  const { t } = useTranslation();
  
  // State für den automatischen Bildwechsel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  
  const images = [
    BitaxeHomeImage1,
    BitaxeHomeImage2,
    BitaxeHomeImage3,
    BitaxeHomeImage4,
    BitaxeHomeImage5
  ];
  
  // Navigiert zum nächsten oder vorherigen Bild
  const navigateSlider = useCallback((direction: 'next' | 'prev') => {
    setCurrentImageIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % images.length;
      } else {
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      }
    });
  }, [images.length]);
  
  // Tastaturnavigation für den Slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === sliderRef.current || sliderRef.current?.contains(document.activeElement)) {
        if (e.key === 'ArrowRight') {
          navigateSlider('next');
        } else if (e.key === 'ArrowLeft') {
          navigateSlider('prev');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateSlider]);
  
  // Automatischer Bildwechsel alle 5 Sekunden
  useEffect(() => {
    // Nicht wechseln, wenn der Mauszeiger über dem Slider ist
    if (!isHovering) {
      intervalRef.current = window.setInterval(() => {
        navigateSlider('next');
      }, 5000); // 5000ms = 5 Sekunden
    }
    
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, navigateSlider]);
  
  // Preload Images für flüssigere Übergänge
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
  
  
  return (
    <div className="modern-home">
      
      {/* Hero Section mit Animation und moderner Gestaltung */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="scroll-indicator">
          <span>{t('home.scroll_down')}</span>
          <div className="scroll-arrow">↓</div>
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
          <div 
            className="image-container image-slider"
            ref={sliderRef}
            tabIndex={0}
            role="region"
            aria-label={t('accessibility.image_slider')}
            aria-roledescription="carousel"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Bitaxe Miner ${index + 1}`} 
                className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}
                loading={index === 0 ? "eager" : "lazy"}
                aria-hidden={index !== currentImageIndex}
              />
            ))}
            <div className="image-overlay"></div>
            
            <button 
              className="slider-nav-button prev-button" 
              onClick={() => navigateSlider('prev')}
              aria-label={t('accessibility.previous_image')}
            >
              <span aria-hidden="true">❮</span>
            </button>
            
            <button 
              className="slider-nav-button next-button" 
              onClick={() => navigateSlider('next')}
              aria-label={t('accessibility.next_image')}
            >
              <span aria-hidden="true">❯</span>
            </button>
            
            <div className="slider-indicators" role="tablist">
              {images.map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-label={`${t('accessibility.show_image')} ${index + 1}`}
                  aria-selected={index === currentImageIndex}
                  className={`slider-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section mit interaktiven Elementen */}
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

           {/* Featured Blog Post Section mit Professional Card Slider */}
      <section className="featured-blog-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="gradient-text">{t('home.latest_posts')}</span>
          </h2>
          <p className="section-subtitle">{t('home.latest_developments')}</p>
        </div>
        
        <div className="featured-blog-container">
          <FeaturedBlogContent />
        </div>
      </section>
      
     
      
      {/* Call to Action Section 
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
      </section>*/}
      
      {/* Footer 
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
      </footer>*/}
    </div>
  );
}

export default ModernHome;
