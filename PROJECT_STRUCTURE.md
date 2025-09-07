# SoloMining Blog App - Projektdokumentation

Diese Dokumentation bietet einen Überblick über die Struktur und die einzelnen Dateien der SoloMining Blog App. Sie dient als Referenz für das Entwicklungsteam, um den Überblick über das Projekt zu behalten.

## Projektstruktur

```
src/
├── App.tsx               # Hauptkomponente der Anwendung mit Router-Konfiguration
├── App.scss              # Hauptstilregeln der Anwendung
├── main.tsx              # Einstiegspunkt der Anwendung, rendert App-Komponente
├── i18n.ts               # Konfiguration für Internationalisierung (i18next)
├── index.css             # Grundlegende CSS-Stile für die gesamte Anwendung
├── vite-env.d.ts         # TypeScript-Deklarationen für Vite
│
├── assets/               # Statische Ressourcen (Bilder, Icons, etc.)
│
├── components/           # Wiederverwendbare UI-Komponenten
│   ├── Blog/             # Blog-Anzeigekomponenten
│   ├── CardSlider/       # Komponenten für Kartenslider
│   ├── Home/             # Komponenten für die Startseite
│   ├── Layout/           # Layout-Komponenten (Header, Footer, etc.)
│   └── UI/               # Allgemeine UI-Komponenten
│
├── context/              # React Context Provider
│   └── ThemeContext.tsx  # Context für Themenverwaltung (hell/dunkel)
│
├── hooks/                # Benutzerdefinierte React Hooks
│   ├── useBlogPosts.ts   # Hook zum Laden von Blog-Inhalten
│   └── useScrollProgress.ts # Hook zur Verfolgung des Scroll-Fortschritts
│
├── locales/              # Übersetzungsdateien
│   ├── blog-posts/       # Blog-Inhalte in verschiedenen Sprachen
│   ├── de.json           # Deutsche UI-Übersetzungen
│   └── en.json           # Englische UI-Übersetzungen
│
├── pages/                # Seitenkomponenten (derzeit leer)
│
└── styles/               # Globale Stilregeln
    ├── themes.scss       # Definitionen für helles/dunkles Theme
    └── variables.scss    # SCSS-Variablen
```

## Komponentenbeschreibungen

### Hauptdateien

- `App.tsx`: Die Hauptkomponente der Anwendung, die das Routing konfiguriert und den ThemeContext bereitstellt.
- `main.tsx`: Der Einstiegspunkt der Anwendung, der die App-Komponente in das DOM rendert und i18n initialisiert.
- `i18n.ts`: Konfiguration für das i18next-Framework zur Internationalisierung, lädt die Übersetzungsdateien.

### Blog

- `components/Blog/Blog.tsx`: Komponente zur Anzeige einzelner Blog-Beiträge, lädt Inhalte dynamisch basierend auf der Blog-ID.
- `components/Blog/Blog.scss`: Stilregeln für Blog-Beiträge.

### CardSlider

- `components/CardSlider/ProfessionalCardSlider.tsx`: Fortgeschrittener Karten-Slider mit verbesserten Animationen für Blog-Posts.
- `components/CardSlider/ImprovedCardSlider.tsx`: Alternative Karten-Slider-Implementierung (nicht aktiv genutzt).
- `components/CardSlider/CardSlider.tsx`: Einfache Basisimplementierung eines Karten-Sliders.
- `components/CardSlider/SimpleCardSlider.tsx`: Vereinfachte Version des Karten-Sliders.

### Home

- `components/Home/ModernHome.tsx`: Hauptkomponente für die Startseite, integriert Blog-Karten und Features.
- `components/Home/ModernHome.scss`: Stilregeln für die Startseite.

### Layout

- `components/Layout/ModernLayout.tsx`: Hauptlayout mit Header und Footer für die moderne Ansicht.
- `components/Layout/ModernHeader.tsx`: Header-Komponente mit Navigation und Logo für die moderne Ansicht.
- `components/Layout/Layout.tsx`: Alternative Layout-Komponente (nicht aktiv genutzt).
- `components/Layout/Header.tsx`: Alternative Header-Komponente (nicht aktiv genutzt).
- `components/Layout/Footer.tsx`: Footer-Komponente mit Links und Copyright-Information.

### UI

- `components/UI/ThemeToggle.tsx`: UI-Element zum Umschalten zwischen hellem und dunklem Theme.
- `components/UI/ThemeToggle.scss`: Stilregeln für den Theme-Toggle.

### Context

- `context/ThemeContext.tsx`: React Context für die Themenverwaltung, stellt Funktionen zum Umschalten des Themes bereit.

### Hooks

- `hooks/useBlogPosts.ts`: Benutzerdefinierte Hooks zum Laden von Blog-Inhalten aus sprachspezifischen JSON-Dateien:
  - `useBlogPost`: Lädt einen einzelnen Blog-Beitrag basierend auf der ID.
  - `useBlogCards`: Lädt mehrere Blog-Beiträge für Karten-Ansicht.
- `hooks/useScrollProgress.ts`: Hook zur Berechnung des Scroll-Fortschritts für visuelle Effekte.

### Locales

- `locales/de.json`: Deutsche Übersetzungen für UI-Elemente.
- `locales/en.json`: Englische Übersetzungen für UI-Elemente.
- `locales/blog-posts/*.json`: Sprachspezifische Blog-Inhalte in JSON-Format:
  - Dateinamen im Format `[blog-id].[language-code].json` (z.B. `bitaxe-overview.de.json`)
  - Struktur: `{ title, content, meta: { description, keywords }, card: { title, description } }`

### Styles

- `styles/themes.scss`: CSS-Variablen für helles und dunkles Theme.
- `styles/variables.scss`: SCSS-Variablen für einheitliche Farben, Abstände, etc.

## Datenfluss

1. **Blog-Inhalte**: 
   - Blog-Inhalte werden in sprachspezifischen JSON-Dateien unter `locales/blog-posts/` gespeichert
   - Der `useBlogPost`-Hook lädt einen spezifischen Blog-Beitrag basierend auf der ID und aktuellen Sprache
   - Der `useBlogCards`-Hook lädt mehrere Blog-Karten für die Übersichtsseite

2. **Themenverwaltung**:
   - `ThemeContext` verwaltet den Zustand des aktuellen Themes (hell/dunkel)
   - `ThemeToggle`-Komponente ermöglicht Benutzern das Umschalten des Themes
   - Theme-Präferenz wird in localStorage gespeichert

3. **Internationalisierung**:
   - UI-Übersetzungen werden in `locales/*.json` gespeichert
   - Blog-Inhalte werden in `locales/blog-posts/*.json` gespeichert
   - i18next-Framework verwaltet die Sprache basierend auf Benutzereinstellungen

## Erweiterungen

Um das Projekt zu erweitern, können folgende Schritte unternommen werden:

1. **Neue Blog-Beiträge hinzufügen**:
   - Neue JSON-Dateien unter `locales/blog-posts/` erstellen (für jede unterstützte Sprache)
   - Bildressourcen unter `assets/` hinzufügen
   - ID des neuen Beitrags zur Liste der verfügbaren Beiträge in `ModernHome.tsx` hinzufügen

2. **Neue UI-Komponenten hinzufügen**:
   - Komponente unter dem entsprechenden Verzeichnis erstellen
   - Übersetzungen für neue UI-Texte zu `locales/*.json` hinzufügen
   - Komponente in das Layout einbinden
