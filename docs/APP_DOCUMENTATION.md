# App.tsx und App.scss Dokumentation

## App.tsx

`App.tsx` ist die Hauptkomponente der SoloMining Blog App und dient als Einstiegspunkt für die Anwendung.

### Importierte Module

```tsx
import './App.scss';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ModernLayout from './components/Layout/ModernLayout';
import ModernHome from './components/Home/ModernHome';
import Blog from './components/Blog/Blog';
import { useTranslation } from 'react-i18next';
import './i18n';
```

- **./App.scss**: Importiert die Hauptstildatei für die Anwendung
- **react-router-dom**: Liefert die Routing-Komponenten für die Navigation zwischen Seiten
  - `HashRouter`: Router-Implementierung, die URL-Hashes für die Navigation verwendet (gut für statisches Hosting)
  - `Routes`, `Route`: Komponenten zur Definition der Routing-Struktur
  - `Navigate`: Komponente für Weiterleitungen
- **react**: Importiert React-Hooks wie `useEffect`
- **ModernLayout**: Die Layout-Komponente, die für alle Seiten verwendet wird
- **ModernHome**: Die Startseiten-Komponente
- **Blog**: Die Blog-Komponente zur Anzeige einzelner Blog-Beiträge
- **react-i18next**: Framework für Internationalisierung
- **./i18n**: Importiert die i18n-Konfiguration

### App-Komponente

```tsx
function App() {
  const { i18n } = useTranslation();

  // Lade die bevorzugte Sprache beim Start
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  
  return (
    <Router>
      <ModernLayout>
        <Routes>
          <Route path="/" element={<ModernHome />} />
          <Route path="/blog/:blogId" element={<Blog />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </ModernLayout>
    </Router>
  );
}
```

#### Funktionalität

1. **Sprachinitialisierung**:
   - Verwendet `useEffect` und `useTranslation` Hook, um die bevorzugte Sprache des Benutzers aus dem localStorage zu laden
   - Wenn eine gespeicherte Sprache gefunden wird, wird diese mit `i18n.changeLanguage()` aktiviert

2. **Routing-Struktur**:
   - Verwendet `HashRouter` für die Navigation (erkennbar an #/-Pfaden in der URL)
   - Definiert drei Routen:
     - `/`: Die Startseite mit der ModernHome-Komponente
     - `/blog/:blogId`: Die Blog-Seite mit dynamischem Parameter für die Blog-ID
     - `*`: Fallback-Route, die zur Startseite weiterleitet

3. **Layout-Struktur**:
   - Umschließt alle Routen mit der `ModernLayout`-Komponente
   - Stellt sicher, dass Header und Footer auf allen Seiten angezeigt werden

## App.scss

`App.scss` enthält die globalen Stile für die gesamte Anwendung und definiert grundlegende Layoutregeln.

### Struktur und Hauptkomponenten

```scss
@use './styles/themes.scss' as vars;
```

- Importiert die Theme-Variablen aus der themes.scss-Datei mit dem Namespace "vars"
- Ermöglicht den Zugriff auf Farbvariablen mit `vars.$color-name`

### Root- und Body-Stile

```scss
#root {
  width: 100%;
  margin: 0 auto;
}

body {
  margin: 0;
  font-family: 'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  background: linear-gradient(120deg, vars.$color-bg 0%, vars.$color-bg-dark 100%);
  min-height: 100vh;
  color: vars.$color-text;
  line-height: 1.6;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

- **#root**: Stellt sicher, dass die React-Root-Komponente die volle Breite einnimmt
- **body**:
  - Entfernt Standard-Margin
  - Definiert die Schriftfamilie mit Fallback-Optionen
  - Setzt einen Farbverlauf als Hintergrund
  - Stellt sicher, dass der Body mindestens die volle Viewport-Höhe einnimmt
  - Definiert die Textfarbe basierend auf den Theme-Variablen
  - Verbessert die Lesbarkeit durch Text-Rendering und Font-Smoothing
  - Fügt Übergänge für Theme-Wechsel hinzu

### Scroll-Fortschrittsbalken

```scss
.scroll-progress-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.05);
  z-index: 10;
  
  [data-theme="dark"] & {
    background: rgba(255, 255, 255, 0.05);
  }
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, vars.$color-primary, vars.$color-accent);
  width: 0;
  animation: progress 1s ease;
}

@keyframes progress {
  to { 
    width: calc(100% * (var(--scroll, 0) / 100)); 
  }
}
```

- **Fortschrittsbalken**:
  - Zeigt einen Fortschrittsbalken am oberen Bildschirmrand an
  - Ändert die Breite basierend auf der Scroll-Position
  - Verwendet eine CSS-Variable `--scroll`, die via JavaScript gesetzt wird
  - Passt die Hintergrundfarbe an das aktuelle Theme an

### Blog-Styling

```scss
.blog-header { /* ... */ }
.blog-content { /* ... */ }
.blog-article { /* ... */ }
```

- **Blog-Header**: Stilisiert den Kopfbereich von Blog-Beiträgen mit Akzentfarbe
- **Blog-Inhalt**: Definiert Basisstile für den Blog-Inhalt (Schriftgröße, Zeilenabstand)
- **Blog-Artikel**: Definiert spezifische Stile für verschiedene Elemente im Blog:
  - Überschriften mit Akzentlinien
  - Hervorgehobene Feature-Elemente mit linkem Rand
  - Bilder mit Hover-Effekten und abgerundeten Ecken
  - Blockzitate mit speziellem Styling
  - Listen mit verbesserten Abständen
  - Horizontale Trenner mit Farbverlauf

### Responsive Design

```scss
@media (max-width: 800px) { /* ... */ }
@media (max-width: 480px) { /* ... */ }
```

- **Tablet-Ansicht** (max-width: 800px):
  - Verringert Schriftgrößen und Abstände
  - Passt Padding und Margins an
  - Verbessert die Lesbarkeit auf mittleren Bildschirmen

- **Mobile-Ansicht** (max-width: 480px):
  - Weiter verringerte Schriftgrößen
  - Minimales Padding und reduzierte Abstände
  - Angepasstes Layout für kleine Bildschirme

### Sprachauswahl

```scss
.lang-switch { /* ... */ }
.lang-switch button { /* ... */ }
```

- **Sprachauswahl**:
  - Positioniert die Sprachauswahlschaltflächen in der oberen rechten Ecke
  - Stilisiert die Buttons mit Primärfarbe und Hover-Effekten
  - Passt die Größe für mobile Geräte an

### Footer

```scss
.blog-footer { /* ... */ }
.footer-content { /* ... */ }
.social-links { /* ... */ }
```

- **Footer-Bereich**:
  - Trennt den Footer mit einer feinen Linie
  - Positioniert Inhalte mit Flexbox
  - Stilisiert Social-Media-Links
  - Responsive Anpassung für mobile Geräte

## Zusammenfassung

1. **App.tsx**:
   - Zentraler Einstiegspunkt der Anwendung
   - Verwaltet Routing und Layout-Struktur
   - Initialisiert die Spracheinstellungen

2. **App.scss**:
   - Globale Stildefinitionen
   - Grundlegende Layout-Strukturen
   - Responsives Design mit Media Queries
   - Styling für Blog-Inhalte
   - Visuelle Effekte wie Scroll-Fortschrittsbalken

Diese beiden Dateien bilden die Grundlage der Anwendung, indem sie die Struktur und das visuelle Erscheinungsbild definieren.
