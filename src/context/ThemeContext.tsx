import React, { createContext, useContext, useState, useEffect } from 'react';

// Definieren der Theme-Typen
type Theme = 'light' | 'dark';

// Typ für den Theme-Kontext
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Erstellen des Kontext-Objekts mit Standardwerten
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

// Hook zum Verwenden des Theme-Kontexts
export const useTheme = () => useContext(ThemeContext);

// Provider-Komponente für den Theme-Kontext
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialen Theme-Zustand aus dem Local Storage oder System-Präferenz laden
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme as Theme;
    }
    
    // Fallback zur System-Präferenz
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  // Theme wechseln
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Theme im Local Storage speichern und HTML-Klasse aktualisieren
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
