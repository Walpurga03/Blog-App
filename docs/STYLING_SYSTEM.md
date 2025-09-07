# Styling-System Dokumentation

Diese Dokumentation erklärt das Styling-System der SoloMining Blog App, wobei der Fokus auf den Dateien `themes.scss` und `variables.scss` liegt.

## Übersicht des Styling-Systems

Die SoloMining Blog App verwendet ein zweistufiges Styling-System:

1. **CSS-Variablen** (in `themes.scss`): 
   - Definieren Theme-spezifische Farben und Werte
   - Ermöglichen dynamisches Theme-Switching (hell/dunkel)
   - Werden über das HTML `data-theme`-Attribut gesteuert

2. **SCSS-Variablen** (in `variables.scss`):
   - Bieten konstante Styling-Werte
   - Werden zur Kompilierzeit in CSS umgewandelt
   - Dienen als Single Source of Truth für statische Designelemente

## themes.scss

Die `themes.scss`-Datei implementiert das dynamische Theme-System und definiert CSS-Variablen für helles und dunkles Theme.

### Struktur

```scss
@use "sass:color";

// Theme-Variablen
:root {
  // Light Theme (default)
  --color-primary: #ff7c2d;
  --color-primary-rgb: 255, 124, 45;
  --color-secondary: #22223b;
  // ...weitere Variablen
}

// Dark Theme
[data-theme="dark"] {
  --color-bg: #121212;
  --color-bg-card: #1e1e1e;
  // ...weitere überschriebene Variablen
}

// Sass Variablen (diese verwenden die CSS-Variablen)
$color-primary: var(--color-primary);
$color-secondary: var(--color-secondary);
// ...weitere SASS-Variablen
```

### Schlüsselkomponenten

1. **CSS-Variablen im `:root`-Selektor**:
   - Definieren das Standard-Theme (hell)
   - Werden global im gesamten Dokument verfügbar gemacht
   - Beinhalten RGB-Versionen für Farbmanipulationen

2. **`[data-theme="dark"]`-Selektor**:
   - Überschreibt bestimmte Variablen für das dunkle Theme
   - Wird aktiviert, wenn dem HTML-Element das Attribut `data-theme="dark"` hinzugefügt wird
   - Definiert nur die Variablen, die sich vom hellen Theme unterscheiden

3. **SASS-Variablen**:
   - Überbrücken CSS-Variablen und SCSS
   - Ermöglichen die Verwendung von CSS-Variablen in SCSS-Syntax
   - Erleichtern Zugriff auf Theme-Variablen in SCSS-Dateien

### Farbdefinitionen

#### Helles Theme (Standard)
- **Primärfarbe**: `#ff7c2d` - Orangeton aus dem SoloMining-Logo
- **Sekundärfarbe**: `#22223b` - Dunkelblau für Kontrast
- **Akzentfarbe**: `#ff8c3b` - Leicht helleres Orange für Hervorhebungen
- **Hintergrund**: `#f3f4f6` - Hellgrauer Hintergrund
- **Kartenhintergrund**: `#ffffff` - Weiß für Karten und Container
- **Textfarbe**: `#333344` - Dunkelgrau für optimale Lesbarkeit

#### Dunkles Theme
- **Hintergrund**: `#121212` - Dunkler Hintergrund nach Material Design-Richtlinien
- **Kartenhintergrund**: `#1e1e1e` - Etwas helleres Grau für Karten
- **Textfarbe**: `#c0c0c0` - Hellgrau für bessere Lesbarkeit auf dunklem Grund
- **Überschriften**: `#e0e0e0` - Heller für Kontrast ohne Blendung

### Verwendung der Theme-Variablen

In der `themes.scss`-Datei werden am Ende SCSS-Variablen definiert, die auf die CSS-Variablen verweisen. Dies ermöglicht:

1. **Einheitlichen Zugriff**: Die gleiche Variable kann in verschiedenen Kontexten verwendet werden
2. **Theme-Wechsel**: Automatisches Anwenden des aktuellen Themes ohne SCSS-Neukompilierung
3. **Beste Praktiken**: Kombination der Vorteile von CSS-Variablen und SCSS

## variables.scss

Die `variables.scss`-Datei definiert statische SCSS-Variablen, die als Basis für das Design dienen.

### Struktur

```scss
@use "sass:color";

// Hauptfarben aus dem Logo
$color-primary: #ff7c2d; // Orange als Primärfarbe
$color-secondary: #22223b; // Dunkelblau als Sekundärfarbe
$color-accent: #ff8c3b; // Leicht helleres Orange für Akzente

// Hintergrundfarben
$color-bg: #f3f4f6; // Hellgrauer Hintergrund
// ...weitere Farbdefinitionen
```

### Schlüsselkomponenten

Die Datei ist in verschiedene Abschnitte gegliedert:

1. **Hauptfarben**:
   - Direkt aus dem Logo abgeleitet
   - Bilden die Grundlage des visuellen Markenidentität

2. **Hintergrundfarben**:
   - Definieren verschiedene Hintergrundfarben für unterschiedliche UI-Elemente
   - Bieten Kontrast und visuelle Hierarchie

3. **Textfarben**:
   - Optimiert für Lesbarkeit und Kontrast
   - Verschiedene Varianten für unterschiedliche Textfunktionen (normal, hervorgehoben, gedämpft)

4. **Effektfarben**:
   - Für Rahmen, Schatten und interaktive Elemente

### Wichtig zu beachten

Die `variables.scss`-Datei definiert die gleichen Werte wie die Light-Theme-Variablen in `themes.scss`, aber als statische SCSS-Variablen. Diese werden hauptsächlich in zwei Fällen verwendet:

1. Wenn ein Wert zur Kompilierzeit bekannt sein muss (z.B. für SCSS-Funktionen)
2. Als Referenzwerte für das Design-System

## Zusammenspiel der beiden Dateien

Das Styling-System verwendet einen hybriden Ansatz:

1. **themes.scss**: 
   - Bietet dynamische Theme-Unterstützung über CSS-Variablen
   - Wird in Komponenten-Stylesheets importiert, um Theme-Farben zu verwenden
   - Definiert SCSS-Variablen als Wrapper für CSS-Variablen

2. **variables.scss**:
   - Bietet statische Design-Konstanten
   - Dient als Referenz für das Design-System
   - Wird für SCSS-Funktionen und -Berechnungen verwendet

In den meisten Fällen sollten Komponenten die Variablen aus `themes.scss` verwenden, um Theme-Unterstützung zu gewährleisten.

## Best Practices

1. **Für themefähige Elemente**: Importieren Sie `themes.scss` und verwenden Sie die SCSS-Variablen:
   ```scss
   @use '../../styles/themes.scss' as vars;
   
   .my-component {
     background-color: vars.$color-bg;
     color: vars.$color-text;
   }
   ```

2. **Für komplexe SCSS-Berechnungen**: Importieren Sie `variables.scss`:
   ```scss
   @use '../../styles/variables.scss' as vars;
   
   .my-component {
     // SCSS-Funktionen benötigen statische Werte
     background-color: darken(vars.$color-primary, 10%);
   }
   ```

3. **Verwenden Sie die definierten Farben statt Hex-Werte**:
   ```scss
   // Gut
   .button {
     background-color: vars.$color-primary;
   }
   
   // Vermeiden
   .button {
     background-color: #ff7c2d;
   }
   ```

4. **Respektieren Sie die Farbkategorien**:
   - Verwenden Sie `$color-primary`, `$color-secondary` und `$color-accent` für Markenfarben
   - Verwenden Sie `$color-bg` und Varianten für Hintergründe
   - Verwenden Sie `$color-text` und Varianten für Text
