import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CardSlider.scss';

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

function CardSlider({ cards }: CardSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  let isAnimating = false;

  useEffect(() => {
    // Stellen wir sicher, dass GSAP geladen ist
    if (typeof window !== 'undefined') {
      const loadGSAP = async () => {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;
        
        try {
          const { CustomEase } = await import('gsap/CustomEase');
          gsap.registerPlugin(CustomEase);
          CustomEase.create("custom", "0.83, 0, 0.17, 1");
        } catch (error) {
          console.warn('CustomEase nicht verfügbar:', error);
        }
        
        // Split text into spans
        const elements = document.querySelectorAll('.copy h1');
        elements.forEach(element => {
          const text = element.innerHTML;
          const splitText = text
            .split('')
            .map((char) => {
              return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
            })
            .join('');
          element.innerHTML = splitText;
        });

        // Initialize cards
        initializeCards(gsap);
        
        gsap.set("h1 span", { y: -200 });
        gsap.set(".slider .card:last-child h1 span", { y: 0 });

        // Add click event
        const handleClick = () => {
          if (isAnimating) return;
          
          isAnimating = true;
          
          const slider = document.querySelector('.slider');
          if (!slider) return;
          
          const cards = Array.from(slider.querySelectorAll('.card'));
          const lastCard = cards.pop();
          const nextCard = cards[cards.length - 1];
          
          if (!lastCard || !nextCard) return;
          
          gsap.to(lastCard.querySelectorAll('h1 span'), {
            y: -200,
            duration: 0.5,
            ease: "cubic",
          });
          
          gsap.to(cards, {
            y: "+150%",
            duration: 0.75,
            ease: "cubic",
            onComplete: () => {
              slider.prepend(lastCard);
              initializeCards(gsap);
              gsap.set(lastCard.querySelectorAll('h1 span'), { y: 200 });
              
              setTimeout(() => {
                isAnimating = false;
              }, 1000);
            },
          });
          
          gsap.to(nextCard.querySelectorAll('h1 span'), {
            y: 0,
            duration: 1,
            ease: "cubic",
            stagger: 0.05,
          });
        };
        
        document.addEventListener('click', handleClick);
        
        return () => {
          document.removeEventListener('click', handleClick);
        };
      };
      
      loadGSAP();
    }
  }, []);
  
  function initializeCards(gsap: any) {
    const cards = Array.from(document.querySelectorAll('.slider .card'));
    if (cards.length === 0) return;
    
    gsap.to(cards, {
      y: (i: number) => -15 + 15 * i + "%",
      z: (i: number) => 15 * i,
      duration: 1,
      ease: "cubic",
      stagger: 0.1,
    });
  }

  return (
    <div className="card-slider-container">
      <div className="slider" ref={sliderRef}>
        {cards.map((card) => (
          <div className="card" key={card.id}>
            {card.id === 'bitaxe-overview' && (
              <img src={BitaxeSchwarz} alt="Bitaxe Overview" />
            )}
            {card.id === 'solo-mining-guide' && (
              <img src={BitaxeRot} alt="Solo Mining Guide" />
            )}
            {card.id === 'bitaxe-setup' && (
              <img src={BitaxeLila} alt="Bitaxe Setup" />
            )}
            <Link to={`/blog/${card.id}`} className="copy">
              <h1>{card.title}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardSlider;
