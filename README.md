# SoloMining Bitaxe Blog

Ein moderner, responsiver, mehrsprachiger Blog über den Bitaxe Bitcoin-Miner mit Hell-/Dunkel-Theme-Unterstützung.

![Bitaxe Mining](./src/assets/Bitaxe_Home.jpg)

## Features

- 🌐 Mehrsprachigkeit (Deutsch/Englisch)
- 🌓 Hell- und Dunkeltheme
- 📱 Vollständig responsive Design für alle Geräte
- 📝 Dynamische Blog-Inhalte
- 🚀 Optimiert für SEO
- 🎨 Modernes Design mit Animationen

## Technologien

- React 18 + TypeScript + Vite
- i18next für Internationalisierung
- SCSS für Styling
- React Router für Navigation
- React Context API für Themenverwaltung
- Dynamisches Laden von Blog-Inhalten

## Dokumentation

Wir haben eine umfassende Dokumentation erstellt, um die Entwicklung und Wartung zu erleichtern:

- [Projektstruktur](./PROJECT_STRUCTURE.md) - Übersicht der Projektstruktur und Dateien
- [Komponenten](./docs/COMPONENTS.md) - Dokumentation der wichtigsten Komponenten
- [Übersetzungssystem](./docs/TRANSLATIONS.md) - Anleitung zur Verwaltung von Übersetzungen
- [Theme-System](./docs/THEME_SYSTEM.md) - Dokumentation des Hell-/Dunkeltheme-Systems
- [App-Dokumentation](./docs/APP_DOCUMENTATION.md) - Detaillierte Erklärung der App-Hauptdateien
- [Styling-System](./docs/STYLING_SYSTEM.md) - Erklärung der SCSS-Variablen und Themes
- [Theme-Context](./docs/THEME_CONTEXT.md) - Dokumentation der Theme-Context-Implementierung
- [Theme-Toggle](./docs/THEME_TOGGLE.md) - Erklärung der Theme-Toggle-Komponente
- [Neuen Blog-Beitrag erstellen](./docs/ADDING_NEW_BLOG.md) - Anleitung zum Hinzufügen neuer Inhalte

## Entwicklung

Um das Projekt lokal zu entwickeln, folge diesen Schritten:

```bash
# Repository klonen
git clone https://github.com/Walpurga03/Blog-App.git

# In das Verzeichnis wechseln
cd Blog-App

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Für die Produktion bauen
npm run build

# Auf GitHub Pages veröffentlichen
npm run deploy
```

## Deployment

Die Website wird auf GitHub Pages veröffentlicht und ist über folgende URL erreichbar:
https://Walpurga03.github.io/Blog-App/

Das Deployment erfolgt automatisch durch den GitHub Actions Workflow oder manuell mit dem `npm run deploy` Befehl.

## Projekt erweitern

### Neue Blog-Beiträge hinzufügen

Siehe [Neuen Blog-Beitrag erstellen](./docs/ADDING_NEW_BLOG.md) für eine detaillierte Anleitung.

### Neue Sprache hinzufügen

1. Erstellen Sie eine neue Datei `src/locales/[language-code].json`
2. Kopieren Sie die Struktur aus einer bestehenden Sprachdatei
3. Übersetzen Sie alle Texte
4. Erstellen Sie entsprechende Blog-Post-Dateien unter `src/locales/blog-posts/`
5. Aktualisieren Sie die i18n-Konfiguration in `src/i18n.ts`

### Styling anpassen

- Globale Stile befinden sich in `src/App.scss`
- Themendefinitionen in `src/styles/themes.scss`
- SCSS-Variablen in `src/styles/variables.scss`
- Komponentenspezifische Stile in den jeweiligen `.scss`-Dateien

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe [LICENSE](./LICENSE) für Details.
```
