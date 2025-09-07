import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProfessionalCardSlider.scss';

// Bilder importieren
import BitaxeSchwarz from '../../assets/Bitaxe-schwarz.webp';
import BitaxeRot from '../../assets/Bitaxe-rot.webp';
import BitaxeLila from '../../assets/Bitaxe-lila.webp';

interface CardSliderProps {
  cards: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link?: string;
  }[];
}

function ProfessionalCardSlider({ cards }: CardSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Bestimme das Bild basierend auf der ID
  const getImageForCard = (id: string) => {
    switch(id) {
      case 'bitaxe-overview':
        return BitaxeSchwarz;
      case 'solo-mining-guide':
        return BitaxeRot;
      case 'bitaxe-setup':
        return BitaxeLila;
      default:
        return BitaxeSchwarz;
    }
  };
  
  // Bestimme den Blog-Titel basierend auf der ID
  const getBlogTitle = (id: string) => {
    switch(id) {
      case 'bitaxe-overview':
        return "Blog Schwarz";
      case 'solo-mining-guide':
        return "Blog Rot";
      case 'bitaxe-setup':
        return "Blog Lila";
      default:
        return "Blog";
    }
  };
  
  // Bestimme den Blog-Text basierend auf der ID
  const getBlogText = (id: string) => {
    switch(id) {
      case 'bitaxe-overview':
        return "Der schwarze Bitaxe Miner für professionelles Mining";
      case 'solo-mining-guide':
        return "Der rote Bitaxe für optimale Leistung beim Mining";
      case 'bitaxe-setup':
        return "Der lila Bitaxe mit verbesserter Kühlung";
      default:
        return "Bitaxe Mining Blog";
    }
  };

  // Rotiere Karten, wenn geklickt wird
  const handleCardRotation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % cards.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Animation dauert 600ms
  };

  // Tastaturnavigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleCardRotation();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
        setTimeout(() => {
          setIsAnimating(false);
        }, 600);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimating, cards.length]);

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
      <div className="slider-controls">
        <button 
          className="control-btn prev"
          onClick={(e) => {
            e.stopPropagation();
            if (isAnimating) return;
            setIsAnimating(true);
            setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
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
          {cards.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (isAnimating) return;
                setIsAnimating(true);
                setActiveIndex(index);
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
          onClick={handleCardRotation}
        >
          {cards.map((card, index) => {
            // Berechne die relative Position jeder Karte
            const position = (index - activeIndex + cards.length) % cards.length;
            
            // Bestimme die Z-Tiefe - active card ist am weitesten vorne
            const zIndex = cards.length - position;
            
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
                  <div className="card-face front">
                    <img 
                      src={getImageForCard(card.id)} 
                      alt={card.title} 
                      className="card-image"
                    />
                    <div className="card-overlay"></div>
                    <Link to={`/blog/${card.id}`} className="card-content">
                      <div className="title-wrapper">
                        <h3>{getBlogTitle(card.id)}</h3>
                        <p className="blog-description">{getBlogText(card.id)}</p>
                        <div className="card-details">
                          <span className="read-more">Mehr lesen</span>
                          <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
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
