# Komponentendokumentation

Dieses Dokument enthält detaillierte Beschreibungen der wichtigsten Komponenten in der SoloMining Blog App.

## Blog-Komponente

**Datei**: `src/components/Blog/Blog.tsx`  
**Zweck**: Zeigt einen einzelnen Blog-Beitrag an, der dynamisch basierend auf der URL-Parameter geladen wird.

### Funktionalität
- Verwendet `useParams` von react-router-dom, um die Blog-ID aus der URL zu extrahieren
- Nutzt den `useBlogPost`-Hook, um Blog-Inhalte basierend auf der ID und der aktuellen Sprache zu laden
- Formatiert den Blog-Inhalt mit HTML-Tags für bessere Lesbarkeit
- Aktualisiert Meta-Tags für SEO-Zwecke
- Zeigt Ladezustand und Fehler an

### Eigenschaften
- Dynamisches Laden von Blog-Inhalten
- Mehrsprachige Unterstützung
- Responsives Layout
- HTML-Formatierung für strukturierte Blog-Inhalte

## ModernHome-Komponente

**Datei**: `src/components/Home/ModernHome.tsx`  
**Zweck**: Hauptkomponente für die Startseite der Anwendung.

### Funktionalität
- Lädt Blog-Karten mit dem `useBlogCards`-Hook
- Zeigt einen Hero-Bereich mit CTA (Call-to-Action) an
- Stellt Hauptfunktionen des Bitaxe-Miners vor
- Integriert den `ProfessionalCardSlider` zur Anzeige von Blog-Beiträgen
- Bietet einen Newsletter-Anmeldungsbereich

### Eigenschaften
- Responsive Design für verschiedene Bildschirmgrößen
- Animierte Elemente für bessere Benutzererfahrung
- Optimierte Darstellung auf großen Bildschirmen mit angepasstem Padding
- Dynamisches Laden von Blog-Karten basierend auf der Benutzersprache

## ProfessionalCardSlider-Komponente

**Datei**: `src/components/CardSlider/ProfessionalCardSlider.tsx`  
**Zweck**: Zeigt Blog-Karten in einem ansprechenden, interaktiven Slider-Format an.

### Funktionalität
- Zeigt Karten als horizontalen Slider mit Touch-Support
- Ermöglicht Navigation mit Schaltflächen
- Unterstützt responsive Layouts
- Bietet Animation und visuelle Effekte

### Eigenschaften
- Glatte Übergangsanimationen
- Benutzerdefinierte Navigationspfeile
- Responsive Anpassung der Kartengröße
- Link-Integration für Navigation zu Blog-Beiträgen

## ThemeContext

**Datei**: `src/context/ThemeContext.tsx`  
**Zweck**: Verwaltet den Themenzustand (hell/dunkel) der Anwendung.

### Funktionalität
- Stellt einen Context-Provider für das Theme bereit
- Speichert die Benutzereinstellung im localStorage
- Erkennt die Systemeinstellung für das Theme
- Bietet Funktionen zum Umschalten des Themes

### Eigenschaften
- Persistenz der Themeneinstellung über Sitzungen hinweg
- Systemtheme-Erkennung
- Zugriff auf Themenstatus und Umschaltfunktion über Context

## useBlogPosts Hook

**Datei**: `src/hooks/useBlogPosts.ts`  
**Zweck**: Stellt Funktionen zum dynamischen Laden von Blog-Inhalten bereit.

### Funktionalität
- `useBlogPost`: Lädt einen einzelnen Blog-Beitrag basierend auf ID und Sprache
- `useBlogCards`: Lädt mehrere Blog-Karten für die Übersichtsseite
- Behandelt Ladezustände und Fehler
- Unterstützt mehrsprachige Inhalte

### Eigenschaften
- Dynamisches Importieren von JSON-Dateien
- Fehlerbehandlung
- Sprachspezifisches Laden von Inhalten
- Trennung von UI-Übersetzungen und Blog-Inhalten

## ModernLayout-Komponente

**Datei**: `src/components/Layout/ModernLayout.tsx`  
**Zweck**: Definiert das Hauptlayout der Anwendung.

### Funktionalität
- Integriert Header und Footer
- Rendert Kinder-Komponenten im Hauptbereich
- Stellt ein konsistentes Layout für alle Seiten bereit

### Eigenschaften
- Responsives Layout
- Konsistente Navigation und Branding
- Theme-Integration
- Mehrsprachige Unterstützung

## ThemeToggle-Komponente

**Datei**: `src/components/UI/ThemeToggle.tsx`  
**Zweck**: Button zum Umschalten zwischen hellem und dunklem Theme.

### Funktionalität
- Verwendet den ThemeContext, um auf das aktuelle Theme zuzugreifen
- Bietet eine Schaltfläche zum Umschalten des Themes
- Zeigt ein visuelles Icon basierend auf dem aktuellen Theme an

### Eigenschaften
- Animierter Übergangseffekt
- Zugängliche Benutzerschnittstelle
- Visuelles Feedback zum aktuellen Themenzustand
