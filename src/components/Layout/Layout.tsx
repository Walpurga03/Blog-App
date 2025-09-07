import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  // Scroll-Fortschrittsanzeige
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight) * 100;
      document.documentElement.style.setProperty('--scroll', scrollPercent.toString());
      
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="site-container">
      <Header />
      <main className="site-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
