# Übersetzungssystem-Dokumentation

Diese Dokumentation beschreibt, wie das Übersetzungssystem in der SoloMining Blog App funktioniert und wie neue Inhalte hinzugefügt werden können.

## Übersicht

Die Anwendung unterstützt mehrere Sprachen durch die Verwendung von:
- **i18next**: Framework für Internationalisierung
- **react-i18next**: React-Bindings für i18next
- **JSON-Dateien**: Separate Dateien für UI-Übersetzungen und Blog-Inhalte

## Struktur der Übersetzungsdateien

### UI-Übersetzungen
- Befinden sich in `src/locales/[language-code].json`
- Enthalten alle Übersetzungen für statische UI-Elemente
- Werden beim Start der Anwendung geladen

### Blog-Inhalte
- Befinden sich in `src/locales/blog-posts/`
- Dateinamenformat: `[blog-id].[language-code].json`
- Werden dynamisch geladen, wenn der entsprechende Blog-Beitrag angefordert wird

## JSON-Format für Blog-Beiträge

Jede Blog-Post-JSON-Datei hat folgende Struktur:

```json
{
  "title": "Titel des Blog-Beitrags",
  "content": "Der vollständige Inhalt des Blog-Beitrags...",
  "meta": {
    "description": "Kurze Beschreibung für SEO",
    "keywords": "Schlüsselwörter für SEO"
  },
  "card": {
    "title": "Titel für die Karten-Ansicht",
    "description": "Kurze Beschreibung für die Karten-Ansicht"
  }
}
```

## Verwendung im Code

### Für UI-Elemente

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('my_component.title')}</h1>
      <p>{t('my_component.description')}</p>
    </div>
  );
}
```

### Für Blog-Inhalte

```tsx
import { useBlogPost } from '../../hooks/useBlogPosts';

function BlogComponent() {
  const { blogId } = useParams<{ blogId: string }>();
  const { blogPost, loading, error } = useBlogPost(blogId || '');
  
  if (loading) return <div>Loading...</div>;
  if (error || !blogPost) return <div>Error loading blog</div>;
  
  return (
    <article>
      <h1>{blogPost.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
    </article>
  );
}
```

## Blog-Karten laden

```tsx
import { useBlogCards } from '../../hooks/useBlogPosts';

function HomeComponent() {
  const availableBlogIds = ['bitaxe-overview', 'solo-mining-guide', 'bitaxe-setup'];
  const { blogCards, loading } = useBlogCards(availableBlogIds);
  
  // Karten für die Anzeige vorbereiten
  const blogPosts = !loading ? 
    availableBlogIds
      .filter(id => blogCards[id] !== null)
      .map(id => ({
        id,
        title: blogCards[id]?.card.title || id,
        description: blogCards[id]?.card.description || '',
        imageUrl: `/images/${id}.jpg`
      })) : [];
  
  return (
    <div>
      {blogPosts.map(post => (
        <BlogCard 
          key={post.id}
          title={post.title}
          description={post.description}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}
```

## Neuen Blog-Beitrag hinzufügen

Um einen neuen Blog-Beitrag hinzuzufügen, befolgen Sie diese Schritte:

1. **Erstellen Sie JSON-Dateien für jede unterstützte Sprache**:
   - Erstellen Sie Dateien unter `src/locales/blog-posts/`:
     - `[blog-id].de.json` für Deutsch
     - `[blog-id].en.json` für Englisch

2. **Struktur der JSON-Datei**:
   ```json
   {
     "title": "Titel des Blog-Beitrags",
     "content": "Der vollständige Inhalt des Blog-Beitrags...",
     "meta": {
       "description": "Kurze Beschreibung für SEO",
       "keywords": "Schlüsselwörter für SEO"
     },
     "card": {
       "title": "Titel für die Karten-Ansicht",
       "description": "Kurze Beschreibung für die Karten-Ansicht"
     }
   }
   ```

3. **Bilder hinzufügen**:
   - Fügen Sie Bilder für den Blog-Beitrag unter `/public/images/` hinzu
   - Verwenden Sie konsistente Dateinamen, idealerweise basierend auf der Blog-ID

4. **Blog-ID zur Liste der verfügbaren Beiträge hinzufügen**:
   - In `src/components/Home/ModernHome.tsx` die ID zur `availableBlogIds`-Liste hinzufügen
   - Fügen Sie den Bildpfad zum `BLOG_IMAGES`-Objekt hinzu

## Content-Formatierung

Der Inhalt eines Blog-Beitrags wird mit HTML-Tags formatiert. Der Blog-Beitrag verwendet einen einfachen Parser, der Markdown-ähnliche Syntaxelemente in HTML umwandelt:

- `\n\n(Überschrift):\n` → `</p><h2>Überschrift</h2><p>`
- `\n\n` → `</p><p>` (Absatz)
- `\n(Text) – ` → `</p><p class="feature-item"><span class="feature-title">Text</span> – ` (Aufzählungspunkt mit Titel)
- `\n(Text):\n` → `<br/><strong>Text:</strong><br/>` (Stichpunkte mit Titel)
- `\n(Zahl). ` → `<br/><span class="step-number">Zahl.</span> ` (Nummerierte Schritte)
- `\n` → `<br />` (Einfacher Zeilenumbruch)

## Sprache ändern

Die Anwendung erkennt die Benutzersprache automatisch oder verwendet die im localStorage gespeicherte Einstellung. Um die Sprache programmatisch zu ändern:

```tsx
import i18n from 'i18next';

// Sprache ändern
i18n.changeLanguage('de');
```
