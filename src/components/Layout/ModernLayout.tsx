import type { ReactNode } from 'react';
import ModernHeader from './ModernHeader';
import ShopPopup from '../UI/ShopPopup';
import './ModernLayout.scss';

interface ModernLayoutProps {
  children: ReactNode;
}

function ModernLayout({ children }: ModernLayoutProps) {
  return (
    <div className="modern-layout">
      <ModernHeader />
      <main className="modern-content">
        {children}
      </main>
      <ShopPopup shopUrl="https://solomining.io/shop" />
    </div>
  );
}

export default ModernLayout;
