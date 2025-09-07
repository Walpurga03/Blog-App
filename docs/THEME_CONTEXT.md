# ThemeContext Dokumentation

Diese Dokumentation erklärt den `ThemeContext` der SoloMining Blog App, der die Funktionalität zum Wechseln zwischen hellem und dunklem Theme bereitstellt.

## Übersicht

Der `ThemeContext` ist eine React-Context-Implementierung, die:
1. Den aktuellen Theme-Status (hell/dunkel) verwaltet
2. Eine Funktion zum Umschalten des Themes bereitstellt
3. Die Theme-Präferenz im LocalStorage speichert
4. Die System-Theme-Präferenz erkennt und respektiert

## Dateistruktur

Die `ThemeContext.tsx`-Datei besteht aus vier Hauptkomponenten:
1. Typendefinitionen
2. Kontext-Definition
3. Custom Hook `useTheme`
4. Provider-Komponente `ThemeProvider`

```tsx
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
  // Implementation...
};
```

## Typendefinitionen

```tsx
type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};
```

- `Theme`: Ein Union-Typ, der die beiden möglichen Theme-Werte definiert
- `ThemeContextType`: Interface für den Context, das:
  - `theme`: Den aktuellen Theme-Zustand
  - `toggleTheme`: Eine Funktion zum Umschalten des Themes

## Context-Definition

```tsx
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});
```

- Erstellt einen typisierten React-Context mit `createContext`
- Setzt Standardwerte, die verwendet werden, wenn kein Provider gefunden wird
- Standard-Theme ist 'light'
- Standard-`toggleTheme` ist eine leere Funktion

## useTheme-Hook

```tsx
export const useTheme = () => useContext(ThemeContext);
```

- Ein Custom Hook, der den Context-Zugriff vereinfacht
- Erlaubt Komponenten, auf das Theme und die `toggleTheme`-Funktion zuzugreifen
- Vermeidet direkten Import und Verwendung von `useContext` in Komponenten

## ThemeProvider-Komponente

```tsx
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
```

### Initialisierung des Theme-Status

Der `useState`-Hook verwendet eine Funktion zur Initialisierung, die folgende Prioritäten berücksichtigt:

1. **Gespeichertes Theme**: Prüft zuerst, ob ein Theme im LocalStorage gespeichert ist
2. **System-Präferenz**: Falls kein gespeichertes Theme existiert, wird die System-Präferenz über das `prefers-color-scheme`-Media-Query abgefragt
3. **Standard**: Als letzter Fallback wird 'light' verwendet

Diese Strategie respektiert die Benutzereinstellungen und bietet ein konsistentes Erlebnis bei wiederholten Besuchen.

### Theme-Wechsel

Die `toggleTheme`-Funktion wechselt zwischen 'light' und 'dark':

```tsx
const toggleTheme = () => {
  setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
};
```

- Verwendet den funktionalen Update-Style von `setState`
- Basiert auf dem vorherigen Theme-Wert, nicht auf externen Variablen

### Persistenz und DOM-Updates

Ein `useEffect`-Hook reagiert auf Theme-Änderungen:

```tsx
useEffect(() => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
```

Dieser Hook führt zwei wichtige Aktionen aus:

1. **LocalStorage-Persistenz**: Speichert das aktuelle Theme, sodass es bei späteren Besuchen wiederhergestellt werden kann
2. **DOM-Update**: Setzt das `data-theme`-Attribut auf dem Root-HTML-Element, welches für die CSS-Theme-Umschaltung verwendet wird

## Integration in der Anwendung

### Provider-Verwendung

Der ThemeProvider wird in der App-Komponente verwendet, um die gesamte Anwendung zu umschließen:

```tsx
// In App.tsx
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* Rest der App */}
      </Router>
    </ThemeProvider>
  );
}
```

### Zugriff auf das Theme in Komponenten

In Komponenten kann der `useTheme`-Hook verwendet werden, um auf das Theme zuzugreifen:

```tsx
// In einer Komponente
import { useTheme } from '../../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

## CSS-Integration

Das `data-theme`-Attribut, das vom ThemeProvider gesetzt wird, wird in der CSS-Datei verwendet, um theme-spezifische Stile anzuwenden:

```scss
// In themes.scss
:root {
  // Light Theme Variablen
  --color-bg: #f3f4f6;
  // ...
}

[data-theme="dark"] {
  // Dark Theme Variablen
  --color-bg: #121212;
  // ...
}
```

## Best Practices für die Verwendung

1. **Verwenden Sie den `useTheme`-Hook**: Für Zugriff auf das aktuelle Theme und die Toggle-Funktion
2. **CSS-Variablen**: Verwenden Sie CSS-Variablen für theme-abhängige Stile
3. **Keine direkten Farben**: Vermeiden Sie hartcodierte Farben in Komponenten
4. **Berücksichtigen Sie beide Themes**: Stellen Sie sicher, dass alle UI-Elemente in beiden Themes gut aussehen
5. **Testen Sie beide Themes**: Überprüfen Sie regelmäßig, ob Änderungen in beiden Themes funktionieren
