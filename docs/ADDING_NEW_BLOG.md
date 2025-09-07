# Anleitung: Neuen Blog-Beitrag erstellen

Diese Anleitung beschreibt den Prozess zur Erstellung eines neuen Blog-Beitrags für die SoloMining Blog App.

## Übersicht

Um einen neuen Blog-Beitrag zu erstellen, müssen folgende Schritte ausgeführt werden:

1. JSON-Dateien für den Inhalt erstellen
2. Bilder hinzufügen
3. Blog-ID zur Liste der verfügbaren Beiträge hinzufügen

## 1. JSON-Dateien erstellen

Für jeden Blog-Beitrag müssen separate JSON-Dateien für jede unterstützte Sprache erstellt werden.

### Dateistruktur

Erstellen Sie folgende Dateien unter `src/locales/blog-posts/`:
- `[blog-id].de.json` für die deutsche Version
- `[blog-id].en.json` für die englische Version

Ersetzen Sie `[blog-id]` durch eine eindeutige ID für den Blog-Beitrag, z.B. `mining-efficiency`.

### JSON-Format

Verwenden Sie das folgende Format für die JSON-Dateien:

```json
{
  "title": "Vollständiger Titel des Blog-Beitrags",
  "content": "Der vollständige Inhalt des Blog-Beitrags...\n\nNeuer Absatz...",
  "meta": {
    "description": "Eine kurze SEO-Beschreibung des Beitrags (150-160 Zeichen)",
    "keywords": "keyword1, keyword2, keyword3"
  },
  "card": {
    "title": "Kürzerer Titel für die Karten-Ansicht",
    "description": "Kurze Beschreibung für die Karten-Ansicht (2-3 Sätze)"
  }
}
```

### Inhalt formatieren

Der Inhalt wird mit einem einfachen Parser formatiert, der Textmarkierungen in HTML umwandelt:

- `\n\n` → Neuer Absatz
- `\n\nÜberschrift:\n` → Neue Überschrift (H2)
- `\n` → Zeilenumbruch
- `\nPunkt – ` → Aufzählungspunkt mit Titel
- `\nPunkt:\n` → Stichpunkt mit Titel
- `\n1. ` → Nummerierter Schritt

**Beispiel**:

```json
{
  "content": "Einführung zum Thema Mining.\n\nEffizienz steigern:\nIn diesem Abschnitt behandeln wir, wie Sie die Effizienz Ihres Miners verbessern können.\n\nOptimierung – Der erste Schritt zur Effizienzsteigerung ist die Optimierung der Einstellungen.\n\nKühlung – Sorgen Sie für ausreichende Kühlung, um Überhitzung zu vermeiden.\n\nSchritte zur Optimierung:\n1. Überprüfen Sie die aktuellen Einstellungen\n2. Passen Sie die Spannung an\n3. Überwachen Sie die Temperatur"
}
```

Dies wird so formatiert:

```html
<p>Einführung zum Thema Mining.</p>

<h2>Effizienz steigern:</h2>
<p>In diesem Abschnitt behandeln wir, wie Sie die Effizienz Ihres Miners verbessern können.</p>

<p class="feature-item"><span class="feature-title">Optimierung</span> – Der erste Schritt zur Effizienzsteigerung ist die Optimierung der Einstellungen.</p>

<p class="feature-item"><span class="feature-title">Kühlung</span> – Sorgen Sie für ausreichende Kühlung, um Überhitzung zu vermeiden.</p>

<p>Schritte zur Optimierung:<br/>
<span class="step-number">1.</span> Überprüfen Sie die aktuellen Einstellungen<br/>
<span class="step-number">2.</span> Passen Sie die Spannung an<br/>
<span class="step-number">3.</span> Überwachen Sie die Temperatur</p>
```

## 2. Bilder hinzufügen

### Bildformate

- Für die Karten-Ansicht: 16:9 Vorschaubild (empfohlene Größe: 800x450 Pixel)
- Für den Blog-Beitrag: Bilder nach Bedarf (optimale Breite: 1200 Pixel)

### Bildverzeichnis

Speichern Sie die Bilder unter:
- `/public/images/` für Bilder, die im Browser geladen werden
- `/src/assets/` für Bilder, die direkt in React-Komponenten importiert werden

### Dateinamen

Verwenden Sie konsistente Dateinamen, idealerweise basierend auf der Blog-ID:
- `[blog-id].jpg` für das Hauptbild
- `[blog-id]-1.jpg`, `[blog-id]-2.jpg` usw. für zusätzliche Bilder

## 3. Blog-ID zur Liste hinzufügen

Öffnen Sie die Datei `src/components/Home/ModernHome.tsx` und aktualisieren Sie folgende Stellen:

### BLOG_IMAGES-Objekt aktualisieren

```tsx
const BLOG_IMAGES = {
  'bitaxe-overview': '/images/bitaxe-gamma.jpg',
  'solo-mining-guide': '/images/solo-mining.jpg',
  'bitaxe-setup': '/images/bitaxe-setup.jpg',
  'neue-blog-id': '/images/neue-blog-id.jpg' // Neue Zeile hinzufügen
};
```

### availableBlogIds-Liste aktualisieren

```tsx
// Alle Blog-IDs, die wir anzeigen möchten
const availableBlogIds = [
  'bitaxe-overview', 
  'solo-mining-guide', 
  'bitaxe-setup',
  'neue-blog-id' // Neue ID hinzufügen
];
```

## Testen des neuen Blog-Beitrags

1. Starten Sie die Entwicklungsumgebung mit `npm run dev`
2. Überprüfen Sie, ob die neue Blog-Karte auf der Startseite erscheint
3. Klicken Sie auf die Karte, um den vollständigen Blog-Beitrag anzuzeigen
4. Testen Sie beide Sprachversionen durch Umschalten der Sprache
5. Überprüfen Sie, ob das dunkle und helle Theme korrekt funktionieren

## Häufige Probleme und Lösungen

### Blog-Karte erscheint nicht

- Überprüfen Sie, ob die Blog-ID korrekt zur Liste hinzugefügt wurde
- Stellen Sie sicher, dass die JSON-Dateien korrekt formatiert sind
- Prüfen Sie, ob das Bildpfad-Mapping im BLOG_IMAGES-Objekt korrekt ist

### Inhalt wird nicht korrekt formatiert

- Überprüfen Sie die Formatierung in der JSON-Datei
- Stellen Sie sicher, dass Zeilenumbrüche als `\n` und nicht als tatsächliche Umbrüche im JSON enthalten sind

### Bilder werden nicht geladen

- Überprüfen Sie, ob die Bilder im richtigen Verzeichnis gespeichert sind
- Prüfen Sie die Bildpfade in der Anwendung
- Stellen Sie sicher, dass die Bildnamen korrekt sind

## Beispiel für einen vollständigen Blog-Beitrag

### mining-efficiency.de.json
```json
{
  "title": "Effizienzsteigerung beim Bitcoin Mining",
  "content": "In diesem Artikel behandeln wir verschiedene Methoden zur Steigerung der Effizienz beim Bitcoin Mining mit dem Bitaxe.\n\nEnergieverbrauch optimieren:\nDer Energieverbrauch ist einer der wichtigsten Faktoren beim Mining. Mit einigen einfachen Anpassungen können Sie die Effizienz deutlich steigern.\n\nSpannungsanpassung – Durch Reduzierung der Spannung bei gleichbleibender Leistung können Sie den Energieverbrauch senken.\n\nKühlung – Eine optimale Kühlung sorgt für stabilere Leistung und längere Lebensdauer.\n\nSchritte zur Optimierung:\n1. Messen Sie den aktuellen Verbrauch\n2. Reduzieren Sie die Spannung schrittweise\n3. Überwachen Sie die Temperatur\n4. Finden Sie den optimalen Betriebspunkt",
  "meta": {
    "description": "Tipps und Techniken zur Steigerung der Effizienz beim Bitcoin Mining mit dem Bitaxe Miner",
    "keywords": "Bitaxe, Effizienz, Bitcoin Mining, Energieverbrauch, Optimierung"
  },
  "card": {
    "title": "Mining-Effizienz steigern",
    "description": "Tipps zur Optimierung des Energieverbrauchs und zur Steigerung der Mining-Effizienz."
  }
}
```

### mining-efficiency.en.json
```json
{
  "title": "Improving Efficiency in Bitcoin Mining",
  "content": "In this article, we'll explore various methods to increase efficiency in Bitcoin mining with the Bitaxe.\n\nOptimizing Energy Consumption:\nEnergy consumption is one of the most important factors in mining. With a few simple adjustments, you can significantly increase efficiency.\n\nVoltage Adjustment – By reducing the voltage while maintaining performance, you can lower energy consumption.\n\nCooling – Optimal cooling ensures more stable performance and longer lifespan.\n\nSteps for Optimization:\n1. Measure current consumption\n2. Reduce voltage incrementally\n3. Monitor temperature\n4. Find the optimal operating point",
  "meta": {
    "description": "Tips and techniques to improve efficiency in Bitcoin mining with the Bitaxe miner",
    "keywords": "Bitaxe, efficiency, Bitcoin mining, energy consumption, optimization"
  },
  "card": {
    "title": "Improve Mining Efficiency",
    "description": "Tips for optimizing energy consumption and increasing mining efficiency."
  }
}
```
