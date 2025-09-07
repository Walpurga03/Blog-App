import { useEffect } from 'react';

/**
 * Ein Hook zum Hinzufügen des Scroll-Progress-Effekts.
 * Dieser Hook fügt einen Event-Listener für das Scroll-Ereignis hinzu,
 * der die Breite des Fortschrittsbalkens aktualisiert.
 */
export function useScrollProgress() {
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }
    };

    // Event-Listener beim Mounting hinzufügen
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initialen Zustand setzen
    updateScrollProgress();

    // Event-Listener beim Unmounting entfernen
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);
}
