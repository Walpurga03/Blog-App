# Theme-System Dokumentation

Diese Dokumentation beschreibt, wie das Theme-System (hell/dunkel) in der SoloMining Blog App funktioniert.

## Übersicht

Die Anwendung unterstützt ein helles und ein dunkles Theme, das über einen ThemeToggle-Button umgeschaltet werden kann. Das System verwendet:

- **React Context API**: Für die Verwaltung des Theme-Zustands
- **LocalStorage**: Für die Persistenz der Benutzereinstellung
- **CSS-Variablen**: Für die Definition der Theme-Farben
- **MediaQueries**: Für die automatische Erkennung der Systemeinstellung

## Komponenten des Theme-Systems

### 1. ThemeContext

**Datei**: `src/context/ThemeContext.tsx`

Der ThemeContext stellt den aktuellen Themezustand und Funktionen zum Umschalten des Themes bereit:

```tsx
import { createContext, useState, useEffect } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Lesen des gespeicherten Themes oder Verwendung der Systemeinstellung
  const getInitialTheme = (): 'light' | 'dark' => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Systemeinstellung prüfen
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // Theme im localStorage speichern und data-theme Attribut setzen
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Theme umschalten
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### 2. ThemeToggle-Komponente

**Datei**: `src/components/UI/ThemeToggle.tsx`

Eine Schaltfläche zum Umschalten zwischen hellem und dunklem Theme:

```tsx
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './ThemeToggle.scss';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className={`theme-toggle ${theme}`} 
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Dunkles Theme aktivieren' : 'Helles Theme aktivieren'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;
```

### 3. CSS-Variablen für Themes

**Datei**: `src/styles/themes.scss`

Die Farben und Stile für das helle und dunkle Theme werden mit CSS-Variablen definiert:

```scss
// Basisvariablen für das Light-Theme
:root {
  --primary-color: #ff6b00;
  --secondary-color: #252525;
  --background-color: #ffffff;
  --text-color: #333333;
  --light-text: #666666;
  --card-background: #f9f9f9;
  --border-color: #e0e0e0;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --hover-color: #f0f0f0;
}

// Dark Theme Variablen
[data-theme='dark'] {
  --primary-color: #ff8c3a;
  --secondary-color: #f0f0f0;
  --background-color: #121212;
  --text-color: #e0e0e0;
  --light-text: #aaaaaa;
  --card-background: #1e1e1e;
  --border-color: #333333;
  --shadow-color: rgba(255, 255, 255, 0.05);
  --hover-color: #252525;
}

// Übergangseffekte für Theme-Wechsel
body {
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: var(--background-color);
  color: var(--text-color);
}

// Anwendung auf allgemeine HTML-Elemente
a {
  color: var(--primary-color);
  transition: color 0.3s ease;
}

button {
  background-color: var(--primary-color);
  color: white;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: darken(var(--primary-color), 10%);
  }
}
```

## Integration des Theme-Systems

### 1. App-Komponente

**Datei**: `src/App.tsx`

Die App-Komponente umschließt die Anwendung mit dem ThemeProvider:

```tsx
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter as Router } from 'react-router-dom';
import ModernLayout from './components/Layout/ModernLayout';
import './App.scss';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ModernLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
```

### 2. Header-Komponente

**Datei**: `src/components/Layout/ModernHeader.tsx`

Der Header integriert den ThemeToggle-Button:

```tsx
import { Link } from 'react-router-dom';
import ThemeToggle from '../UI/ThemeToggle';
import './ModernHeader.scss';

function ModernHeader() {
  return (
    <header className="modern-header">
      <div className="logo">
        <Link to="/">SoloMining</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog/bitaxe-overview">Blog</Link></li>
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
}

export default ModernHeader;
```

## Verwendung der Theme-Variablen

Um die Theme-Farben in Komponenten zu verwenden, importieren Sie die SCSS-Variablen und verwenden die CSS-Variablen:

```scss
@import '../../styles/themes.scss';

.my-component {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  
  .title {
    color: var(--primary-color);
  }
  
  .description {
    color: var(--light-text);
  }
  
  &:hover {
    background-color: var(--hover-color);
  }
}
```

## Hinzufügen neuer Theme-Variablen

Um neue Farben oder Stile zum Theme-System hinzuzufügen:

1. Definieren Sie neue Variablen in `src/styles/themes.scss`:
   ```scss
   :root {
     // Bestehende Variablen
     --new-color: #value;
   }

   [data-theme='dark'] {
     // Bestehende Variablen
     --new-color: #dark-value;
   }
   ```

2. Verwenden Sie die neuen Variablen in Ihren Komponenten:
   ```scss
   .my-element {
     color: var(--new-color);
   }
   ```

## Best Practices

1. **Immer CSS-Variablen verwenden**: Verwenden Sie für alle farbabhängigen Stile CSS-Variablen, um sicherzustellen, dass das Theme korrekt angewendet wird.

2. **Übergangseffekte hinzufügen**: Fügen Sie Übergänge für Farbänderungen hinzu, um einen glatten Themenwechsel zu ermöglichen.

3. **Kontrast beachten**: Stellen Sie sicher, dass Texte in beiden Themes gut lesbar sind und ausreichenden Kontrast zum Hintergrund haben.

4. **Theme-Präferenzen respektieren**: Berücksichtigen Sie die Systemeinstellungen des Benutzers, aber ermöglichen Sie eine manuelle Überschreibung.

5. **Persistenz**: Speichern Sie die Theme-Einstellung des Benutzers für zukünftige Besuche.
