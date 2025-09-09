import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './HeroSection.scss';

// Import der Bilder für den Hero-Slider
import BitaxeHomeImage1 from '../../../assets/images/Hero-Section/Bitaxe-1.jpg';
import BitaxeHomeImage2 from '../../../assets/images/Hero-Section/Bitaxe-2.jpg';
import BitaxeHomeImage3 from '../../../assets/images/Hero-Section/Bitaxe-3.jpg';
import BitaxeHomeImage4 from '../../../assets/images/Hero-Section/Bitaxe-4.jpg';
import BitaxeHomeImage5 from '../../../assets/images/Hero-Section/Bitaxe-5.webp';

const HeroSection = () => {
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
  );
};

export default HeroSection;
