import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ImprovedCardSlider.scss';

// Bilder importieren
import BitaxeSchwarz from '../../assets/Bitaxe-schwarz.webp';
import BitaxeRot from '../../assets/Bitaxe-rot.webp';
import BitaxeLila from '../../assets/Bitaxe-lila.webp';

interface CardSliderProps {
  cards: {
    id: string;
    title: string;
    imageUrl: string;
  }[];
}

function ImprovedCardSlider({ cards }: CardSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
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

  // Rotiere Karten, wenn geklickt wird
  const handleCardRotation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % cards.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Animation dauert 500ms
  };

  return (
    <div className="improved-card-slider-container">
      <div className="slider" onClick={handleCardRotation}>
        {cards.map((card, index) => {
          // Berechne die relative Position jeder Karte
          const position = (index - activeIndex + cards.length) % cards.length;
          
          return (
            <div 
              key={card.id}
              className={`card ${position === 0 ? 'active' : ''}`}
              style={{
                transform: `translateY(${position * 15}%) 
                           translateZ(${position * 15}px) 
                           ${position === 0 ? 'scale(1.05)' : ''}`,
                opacity: position === 0 ? 1 : 0.9 - position * 0.1,
                zIndex: cards.length - position
              }}
            >
              <img 
                src={getImageForCard(card.id)} 
                alt={card.title} 
                className="card-image"
              />
              <Link to={`/blog/${card.id}`} className="card-content">
                <div className="title-container">
                  <h3 
                    className={position === 0 ? 'show-title' : 'hide-title'}
                  >
                    {card.title}
                  </h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImprovedCardSlider;
