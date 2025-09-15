# Solo Bitcoin Mining Blog App - Projektstruktur

## Überblick
Eine React-basierte Blog-Anwendung mit SCSS-Styling für Solo Bitcoin Mining Community.

## Technologie-Stack
- **Frontend Framework**: React 18 mit TypeScript
- **Routing**: React Router v7 (BrowserRouter)
- **Styling**: SCSS mit Vite Build System
- **Build Tool**: Vite
- **Linting**: ESLint + TypeScript
- **i18n**: React-i18next (aktuell Deutsch-only)

## Verzeichnisstruktur

```
blog-app/
├── src/
│   ├── components/                 # React Komponenten
│   │   ├── Home/                  # Homepage Komponente
│   │   │   ├── ModernHome.tsx     # Hauptseite mit Hero-Section
│   │   │   └── ModernHome.scss    # Styling für Homepage
│   │   ├── BlogOverview/          # Blog-Übersichtsseite
│   │   │   ├── BlogOverview.tsx   # Liste aller Blog-Artikel
│   │   │   └── BlogOverview.scss  # Styling für Blog-Übersicht
│   │   ├── BlogPost/              # Einzelner Blog-Artikel (FEHLT!)
│   │   │   ├── BlogPost.tsx       # Anzeige eines einzelnen Artikels
│   │   │   └── BlogPost.scss      # Styling für Blog-Artikel
│   │   └── BlogContent.tsx        # Legacy: Alte Blog-Komponente (kann entfernt werden)
│   ├── data/                      # Datenstrukturen
│   │   ├── articles.ts           # Deutsche Blog-Artikel (Hauptversion)
│   │   ├── articles-en.ts        # Englische Original-Texte (Referenz)
│   │   ├── translations.ts       # Übersetzungs-Management zwischen DE/EN
│   │   ├── company-content.ts    # Firmen-Inhalte, Produktbeschreibungen, Branding
│   │   └── content-integration.ts # Hilfsfunktionen für Content-Integration
│   ├── styles/                    # Globale SCSS Styles
│   │   └── variables.scss         # SCSS Variablen (Farben, Schriften, etc.)
│   ├── locales/                   # Übersetzungen (aktuell ungenutzt)
│   │   ├── de.json               # Deutsche Texte
│   │   └── en.json               # Englische Texte (wird entfernt)
│   ├── App.tsx                    # Haupt-App mit Router-Konfiguration
│   ├── App.scss                   # Globale App-Styles
│   ├── main.tsx                   # React App Entry Point
│   ├── i18n.ts                   # i18n Konfiguration (wird vereinfacht)
│   ├── index.scss                # Globale CSS Reset/Base Styles
│   └── vite-env.d.ts             # Vite TypeScript Definitionen
├── public/                        # Statische Dateien
├── package.json                   # Dependencies und Scripts
├── vite.config.ts                # Vite Konfiguration
├── tsconfig.json                 # TypeScript Konfiguration
└── README.md                     # Projektdokumentation
```

## Routing-Struktur

| Route | Komponente | Beschreibung |
|-------|------------|--------------|
| `/` | ModernHome | Startseite mit Hero-Section und Navigation zum Blog |
| `/blog` | BlogOverview | Übersicht aller Blog-Artikel mit Vorschau-Karten |
| `/blog/:id` | BlogPost | Einzelansicht eines Blog-Artikels |

## Komponenten-Architektur

### 1. App.tsx (Router-Container)
```tsx
- BrowserRouter mit basename="/Blog-App"
- Routes für alle Seiten
- Globale SCSS und i18n Imports
```

### 2. ModernHome.tsx (Homepage)
```tsx
- Hero-Section mit Titel und Beschreibung
- Navigation zum Blog via React Router Link
- Responsive Design mit SCSS Grid/Flexbox
```

### 3. BlogOverview.tsx (Blog-Liste)
```tsx
- Lädt Artikel aus data/blogPosts.ts
- Zeigt Artikel-Karten mit Vorschau
- Navigation zurück zur Homepage
- Links zu einzelnen Artikeln (/blog/:id)
```

### 4. BlogPost.tsx (Artikel-Ansicht)
```tsx
- Lädt einzelnen Artikel via useParams() und getPostById()
- Rendert Markdown-ähnlichen Content
- Navigation zurück zur Blog-Übersicht
- 404-Handling für nicht existierende Artikel
```

## SCSS-Architektur

### Variablen-System (variables.scss)
```scss
$color-primary: #ff7c2d;     // Orange (Logo-Farbe)
$color-secondary: #22223b;   // Dunkelblau
$color-accent: #ff8c3b;      // Helles Orange
$color-bg: #f3f4f6;          // Hellgrauer Hintergrund
$color-bg-card: #ffffff;     // Weiß für Karten
$color-text: #374151;        // Dunkler Text
$color-text-muted: #6b7280;  // Grauer Text
```

### Komponenten-Styling
- Jede Komponente hat eigene SCSS-Datei
- @use "../../styles/variables.scss" as vars; für Variablen-Import
- BEM-ähnliche CSS-Klassenstruktur
- Mobile-First responsive Design

## Datenstruktur

### BlogPost Interface
```typescript
interface BlogPost {
  id: string;           // URL-freundliche ID (z.B. "solo-mining-grundlagen")
  title: string;        // Artikel-Titel
  subtitle: string;     // Kurze Beschreibung
  content: string;      // Vollständiger Artikel-Inhalt (Markdown-ähnlich)
  author: string;       // Autor-Name
  publishDate: string;  // Veröffentlichungsdatum (ISO Format)
  readTime: string;     // Geschätzte Lesezeit (z.B. "8 min")
  tags: string[];       // Kategorien/Tags
  featured: boolean;    // Featured Artikel für Homepage
}
```

## Aktuelle Probleme

### ❌ Fehlende BlogPost Komponente
- **Problem**: BlogPost Verzeichnis fehlt oder ist korrupt
- **Lösung**: Komponente neu erstellen mit TypeScript und SCSS

### ❌ App.tsx Import-Fehler
- **Problem**: Import von BlogPost/BlogPost fehlschlägt
- **Lösung**: Nach Komponenten-Erstellung Import korrigieren

### ❌ i18n Komplexität
- **Problem**: Ungenutzte Übersetzungssystem-Komplexität
- **Lösung**: i18n entfernen oder auf Deutsch-only vereinfachen

## Entwicklungsworkflow

### Development Server starten
```bash
npm run dev
```

### Build für Produktion
```bash
npm run build
```

### Neue Blog-Artikel hinzufügen
1. **Englischen Original-Text** zu `src/data/articles-en.ts` hinzufügen
2. **Deutsche Übersetzung** zu `src/data/articles.ts` hinzufügen  
3. **Übersetzungspaar** in `src/data/translations.ts` verknüpfen
4. Eindeutige IDs vergeben (DE: `artikel-name`, EN: `article-name`)
5. Automatisch in BlogOverview verfügbar

### Neue Komponente erstellen
1. Verzeichnis in `src/components/` erstellen
2. `ComponentName.tsx` + `ComponentName.scss` erstellen
3. SCSS Variables importieren: `@use "../../styles/variables.scss" as vars;`
4. Komponente in entsprechender Parent-Komponente importieren

## Nächste Schritte

1. **BlogPost Komponente reparieren** - Korrupte Dateien neu erstellen
2. **App.tsx Import-Fehler beheben** - Nach Komponenten-Fix
3. **i18n System vereinfachen** - Nur Deutsch, unnötige Komplexität entfernen
4. **Weitere Blog-Artikel hinzufügen** - Content für Solo Mining Community
5. **SEO und Meta-Tags** - Für bessere Suchmaschinen-Optimierung

## Build-Status
- ✅ SCSS-System funktioniert
- ✅ Router-Navigation funktioniert  
- ✅ Blog-Datenstruktur vorhanden
- ❌ BlogPost Komponente fehlt/korrupt
- ❌ Build schlägt fehl wegen Import-Fehlern

---

*Letzte Aktualisierung: 15. September 2025*