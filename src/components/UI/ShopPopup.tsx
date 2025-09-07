import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ShopPopup.scss';

interface ShopPopupProps {
  shopUrl?: string;
}

function ShopPopup({ shopUrl = "https://solomining.io/shop" }: ShopPopupProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  // Zeige das Popup nach einer kurzen Verzögerung an
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open(shopUrl, '_blank');
  };

  return (
    <div className={`shop-popup ${visible ? 'visible' : ''}`}>
      <button 
        className="shop-popup-button"
        onClick={handleClick}
        aria-label={t('shop.now')}
      >
        <span className="shop-popup-text">{t('shop.now')}</span>
        <span className="shop-popup-icon">🛒</span>
      </button>
    </div>
  );
}

export default ShopPopup;
