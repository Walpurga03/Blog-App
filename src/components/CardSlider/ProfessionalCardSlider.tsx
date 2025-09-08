import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProfessionalCardSlider.scss';

// Bilder importieren
import Image1 from '../../assets/images/blog/1-image.jpg';
import Image2 from '../../assets/images/blog/2-image.jpg';
import Image3 from '../../assets/images/blog/3-image.webp';
import Image4 from '../../assets/images/blog/4-image.webp';
import Image5 from '../../assets/images/blog/5-image.webp';

// Define a unified card type that includes all possible image properties
interface BlogCardItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  image?: string;
  link?: string;
}

interface CardSliderProps {
  cards?: BlogCardItem[];
  minimal?: boolean;
}

function ProfessionalCardSlider({ cards = [] }: CardSliderProps) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Fallback für den Fall, dass keine Karten vorhanden sind
  const defaultCards = [
    {
      id: 'bitaxe-overview',
      title: 'Bitaxe: Eine Einführung zum kompakten Bitcoin-Miner',
      description: 'Entdecke den Bitaxe - ein kompakter, energieeffizienter Bitcoin-Miner für dezentrales Mining zu Hause.',
      imageUrl: Image1,
      link: '/blog/bitaxe-overview'
    },
    {
      id: 'solo-mining-guide',
      title: 'Der ultimative Guide zum Solo-Mining mit Bitaxe',
      description: 'Schritt-für-Schritt Anleitung zum erfolgreichen Solo-Mining mit deinem Bitaxe-Gerät.',
      imageUrl: Image2,
      link: '/blog/solo-mining-guide'
    },
    {
      id: 'bitaxe-setup',
      title: 'Bitaxe optimal einrichten: Maximiere deine Mining-Effizienz',
      description: 'Tipps und Tricks zur optimalen Konfiguration deines Bitaxe-Miners für maximale Leistung.',
      imageUrl: Image3,
      link: '/blog/bitaxe-setup'
    }
  ];
  
  // Verwende die übergebenen Karten oder die Standard-Karten
  const displayCards = cards.length > 0 ? cards : defaultCards;
  
  // Bestimme das Bild basierend auf der übergebenen URL oder ID
  const getImageForCard = (card: any) => {
    if (card.imageUrl) {
      return card.imageUrl;
    }
    if (card.image) {
      return card.image;
    }
    
    // Fallback-Logik basierend auf der ID
    switch(card.id) {
      case 'bitaxe-overview':
        return Image1;
      case 'solo-mining-guide':
        return Image2;
      case 'bitaxe-setup':
        return Image3;
      case 'Bitaxe-was-ist-das':
      case 'bitaxe_home':
        return Image4;
      case 'Bitaxe-what-it-is':
      case 'bitaxe_what_it_is':
        return Image5;
      default:
        return Image1;
    }
  };

  // Rotiere Karten, wenn geklickt wird
  const handleCardRotation = (e?: React.MouseEvent<HTMLDivElement>) => {
    // Don't rotate cards if clicking directly on a link
    if (isAnimating || (e && (e.target as HTMLElement).closest('a'))) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % displayCards.length);
    
    // Titel animieren
    animateMainTitle();
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Animation dauert 600ms
  };

  // Tastaturnavigation
  // Funktion für die Titel-Animation
  const animateMainTitle = () => {
    const titleElement = document.querySelector('.slider-main-title');
    if (titleElement) {
      titleElement.classList.add('title-change');
      
      setTimeout(() => {
        titleElement.classList.remove('title-change');
      }, 400);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleCardRotation();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev - 1 + displayCards.length) % displayCards.length);
        animateMainTitle();
        setTimeout(() => {
          setIsAnimating(false);
        }, 600);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimating, displayCards.length]);

  // Effekt für die Haupttitel-Animation beim Start
  useEffect(() => {
    // Animation beim Laden des Haupttitels
    const mainTitle = document.querySelector('.slider-main-title');
    if (mainTitle) {
      mainTitle.classList.add('title-change');
      setTimeout(() => {
        mainTitle.classList.remove('title-change');
      }, 400);
    }
  }, [displayCards]);

  // Automatische Rotation alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleCardRotation();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="professional-card-slider-container">
      {/* Stilvoller Titel-Bereich über dem Slider */}
      <div className="slider-title-section">
        <div className="title-decoration">
          <span className="line"></span>
          <span className="dot"></span>
          <span className="line"></span>
        </div>
        <h2 className="section-heading">Neueste Beiträge</h2>
        <p className="section-subheading">
          Erfahre mehr über die neuesten Entwicklungen und Tipps rund um Bitcoin-Mining
        </p>
        <div className="slider-title-container">
          <h3 className="slider-main-title">
            {displayCards[activeIndex]?.title || "Blog-Artikel"}
          </h3>
        </div>
      </div>
      
      <div className="slider-controls">
        <button 
          className="control-btn prev"
          onClick={(e) => {
            e.stopPropagation();
            if (isAnimating) return;
            setIsAnimating(true);
            setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
            animateMainTitle();
            setTimeout(() => {
              setIsAnimating(false);
            }, 600);
          }}
          aria-label="Previous card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </button>
        
        <div className="pagination">
          {displayCards.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (isAnimating) return;
                setIsAnimating(true);
                setActiveIndex(index);
                animateMainTitle();
                setTimeout(() => {
                  setIsAnimating(false);
                }, 600);
              }}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          className="control-btn next"
          onClick={(e) => {
            e.stopPropagation();
            handleCardRotation();
          }}
          aria-label="Next card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </button>
      </div>

      <div className="slider-scene" ref={sliderRef}>
        <div 
          className={`slider ${isAnimating ? 'is-animating' : ''}`}
          onClick={(e) => handleCardRotation(e)}
        >
          {displayCards.map((card, index) => {
            // Berechne die relative Position jeder Karte
            const position = (index - activeIndex + displayCards.length) % displayCards.length;
            
            // Bestimme die Z-Tiefe - active card ist am weitesten vorne
            const zIndex = displayCards.length - position;
            
            // Berechne die Position und Rotation für den 3D Effekt
            const translateY = position * 10;
            const translateZ = -position * 60;
            const rotateX = position * -6;
            const scale = position === 0 ? 1 : Math.max(0.85 - position * 0.05, 0.7);
            const opacity = position === 0 ? 1 : Math.max(0.9 - position * 0.2, 0.3);
            
            return (
              <div 
                key={card.id}
                className={`card ${position === 0 ? 'active' : ''} position-${position}`}
                style={{
                  transform: `translateY(${translateY}%) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                  opacity,
                  zIndex
                }}
              >
                <div className="card-inner">
                  <Link to={card.link || `/blog/${card.id}`} className="card-face front">
                    <img 
                      src={getImageForCard(card)} 
                      alt={card.title} 
                      className="card-image"
                    />
                    <div className="card-overlay"></div>
                    <div className="card-content">
                      <div className="title-wrapper">
                        <p className="blog-description">{card.description}</p>
                        <div className="card-details">
                          <span className="read-more">{t ? t('home.read_more') : 'Mehr lesen'}</span>
                          <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfessionalCardSlider;
