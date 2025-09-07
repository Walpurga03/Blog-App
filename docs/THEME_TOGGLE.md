# ThemeToggle-Komponente Dokumentation

Diese Dokumentation beschreibt die `ThemeToggle`-Komponente, die in der SoloMining Blog App verwendet wird, um zwischen hellem und dunklem Theme zu wechseln.

## Übersicht

Die `ThemeToggle`-Komponente ist eine UI-Komponente, die:
1. Einen Schieberegler (Toggle-Switch) zum Umschalten des Themes anzeigt
2. Visuelle Indikatoren (Sonne/Mond-Symbole) für das aktuelle Theme bietet
3. Animationen beim Umschalten des Themes implementiert
4. Zugänglichkeitsattribute für Screenreader bereitstellt

## Dateien

Die Komponente besteht aus zwei Dateien:
1. `ThemeToggle.tsx`: React-Komponente mit der Funktionalität
2. `ThemeToggle.scss`: Styling für den Theme-Toggle

## ThemeToggle.tsx

```tsx
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.scss';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        />
        <span className="slider">
          <div className="icons">
            <svg className="sun-icon" viewBox="0 0 24 24" width="16" height="16">
              {/* Pfad für das Sonnensymbol */}
            </svg>
            <svg className="moon-icon" viewBox="0 0 24 24" width="16" height="16">
              {/* Pfad für das Mondsymbol */}
            </svg>
          </div>
        </span>
      </label>
    </div>
  );
}

export default ThemeToggle;
```

### Funktionsweise

1. **Theme-Status und -Wechsel**:
   - Verwendet den `useTheme`-Hook aus dem ThemeContext
   - Ruft `theme` (aktuelles Theme) und `toggleTheme` (Umschaltfunktion) ab

2. **Checkbox-Input**:
   - Implementiert als verstecktes Checkbox-Input-Element
   - `checked`-Zustand ist an das aktuelle Theme gebunden (`theme === 'dark'`)
   - `onChange`-Handler ruft die `toggleTheme`-Funktion auf

3. **Zugänglichkeit**:
   - Dynamisches `aria-label`-Attribut informiert Screenreader über die aktuelle Aktion
   - Verwendet ein semantisches `<label>`-Element für bessere Zugänglichkeit

4. **Icons**:
   - Inline SVG-Icons für Sonne und Mond
   - Visuelle Darstellung des aktuellen Theme-Status

## ThemeToggle.scss

```scss
@use '../../styles/themes.scss' as vars;

.theme-toggle {
  padding: 0 0.5rem;
  
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
    cursor: pointer;
    
    input {
      opacity: 0;
      width: 0;
      height: 0;
      
      &:checked + .slider {
        background: vars.$color-secondary;
        
        &:before {
          transform: translateX(24px);
        }
        
        .icons {
          .sun-icon {
            opacity: 0;
            transform: translateX(20px);
          }
          
          .moon-icon {
            opacity: 1;
            transform: translateX(0);
          }
        }
      }
      
      &:focus + .slider {
        box-shadow: 0 0 1px vars.$color-primary;
      }
    }
    
    .slider {
      // Styling für den Schieberegler
    }
  }
}
```

### Styling-Komponenten

1. **Basisstruktur**:
   - Container mit Padding
   - Switch-Label mit definierter Größe und relativer Positionierung
   - Verstecktes Checkbox-Element mit Null-Dimensionen

2. **Slider-Element**:
   - Farbiger Hintergrund basierend auf Theme-Variablen
   - Abgerundete Ecken mit Border-Radius
   - Transition-Effekt für glatte Animation

3. **Toggle-Button**:
   - Weißer kreisförmiger Button mit `:before`-Pseudoelement
   - Positions-Transition für Animation beim Umschalten

4. **Icon-Animation**:
   - Positionierung der Sonne/Mond-Symbole
   - Überblendungseffekte mit Opacity
   - Transformationen für Bewegung beim Umschalten

5. **Zustände**:
   - `:checked`-Zustand ändert Hintergrundfarbe
   - Transformiert Button-Position
   - Ändert Sichtbarkeit und Position der Icons
   - `:focus`-Zustand für Tastaturnavigation

## Visuelle Zustände

### Helles Theme (Standardzustand)
- Primärfarbe als Hintergrund des Sliders
- Weiße Schaltfläche am linken Rand
- Sonnensymbol sichtbar, Mondsymbol ausgeblendet

### Dunkles Theme (Checked-Zustand)
- Sekundärfarbe als Hintergrund
- Weiße Schaltfläche zum rechten Rand verschoben
- Sonnensymbol ausgeblendet, Mondsymbol sichtbar

## Zugänglichkeitsmerkmale

1. **Semantisches Markup**: Verwendung von `<label>` und `<input>` für bessere Screenreader-Unterstützung
2. **ARIA-Labels**: Dynamische Beschreibungen der Aktion
3. **Focus-Styles**: Visuelles Feedback bei Tastaturfokus
4. **Ausreichender Kontrast**: Gute Sichtbarkeit von Icons und Button

## Integration in die Anwendung

Die ThemeToggle-Komponente wird typischerweise im Header der Anwendung eingebunden:

```tsx
// In ModernHeader.tsx
import ThemeToggle from '../UI/ThemeToggle';

function ModernHeader() {
  return (
    <header className="modern-header">
      {/* Logo und Navigation */}
      <ThemeToggle />
    </header>
  );
}
```

## Best Practices bei der Verwendung

1. **Konsistente Positionierung**: Platzieren Sie den Toggle an einer konsistenten Stelle in der UI
2. **Optimale Größe**: Stellen Sie sicher, dass der Toggle groß genug für einfache Bedienung auf Touch-Geräten ist
3. **Reaktives Feedback**: Sorgen Sie für sofortige visuelle Rückmeldung beim Theme-Wechsel
4. **Konsistente Symbolik**: Verwenden Sie allgemein verständliche Symbole (Sonne/Mond)
5. **Tastaturbedienung**: Stellen Sie sicher, dass der Toggle per Tastatur bedienbar ist

## Zusammenfassung

Die ThemeToggle-Komponente ist ein benutzerfreundliches UI-Element, das:
- Einen visuell ansprechenden Mechanismus zum Umschalten des Themes bietet
- Eine zugängliche Benutzererfahrung durch semantisches Markup und ARIA-Attribute gewährleistet
- Animationen für eine moderne Benutzererfahrung einsetzt
- Nahtlos mit dem ThemeContext-System integriert ist
