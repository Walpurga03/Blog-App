import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBlogPost } from '../../hooks/useBlogPosts';
import './Blog.scss';

function Blog() {
  const { blogId } = useParams<{ blogId: string }>();
  const { t } = useTranslation();
  const { blogPost, loading, error } = useBlogPost(blogId || '');

  // Diese Funktion formatiert den Blog-Inhalt mit HTML
  const formatBlogContent = (content: string): string => {
    return content
      .replace(/\n\n(.*?):\n/g, '</p><h2>$1</h2><p>') // Überschriften erkennen
      .replace(/\n\n/g, '</p><p>') // Absätze
      .replace(/\n([A-Za-z].*?) – /g, '</p><div class="feature-item"><span class="feature-title">$1</span><p>') // Aufzählungspunkte mit Titel
      .replace(/\n([A-Za-z].*?):\n/g, '<br/><strong>$1:</strong><br/>') // Stichpunkte mit Titel
      .replace(/\n([0-9]+)\. /g, '<p><span class="step-number">$1</span> ') // Nummerierte Schritte
      .replace(/\n/g, '<br />') // Einfache Zeilenumbrüche
      + '</p>'; // Schließenden Tag am Ende hinzufügen
  };

  // Bloginhalt rendern
  const renderBlogContent = () => {
    if (loading) {
      return <div className="blog-loading">Lade Inhalt...</div>;
    }

    if (error || !blogPost) {
      return (
        <div className="blog-not-found">
          <h2>{t('blog.not_found')}</h2>
          <p>{t('blog.not_found_message')}</p>
        </div>
      );
    }

    // Meta-Tags für SEO aktualisieren
    document.title = blogPost.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', blogPost.meta?.description || '');
    }

    // Berechne die Lesezeit (ca. 200 Wörter pro Minute)
    const wordCount = blogPost.content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    
    return (
      <article className="blog-article">
        <div className="blog-meta">
          <div className="blog-meta-item">
            <span className="meta-icon">📅</span>
            <span>7. September 2025</span>
          </div>
          <div className="blog-meta-item">
            <span className="meta-icon">⏱️</span>
            <span>{readingTimeMinutes} Min. Lesezeit</span>
          </div>
          <div className="blog-meta-item">
            <span className="meta-icon">🏷️</span>
            <span>{blogPost.meta?.keywords.split(',')[0]}</span>
          </div>
        </div>
        
        <div 
          dangerouslySetInnerHTML={{ 
            __html: formatBlogContent(blogPost.content)
          }} 
        />
        
        <div className="blog-footer">
          <div className="share-section">
            <h3>Teilen</h3>
            <div className="share-buttons">
              <button className="share-button twitter">Twitter</button>
              <button className="share-button facebook">Facebook</button>
              <button className="share-button linkedin">LinkedIn</button>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="blog-container">
      <header className="blog-header">
        {blogPost && <h1>{blogPost.title}</h1>}
        {!blogPost && !loading && <h1>{t('blog.not_found')}</h1>}
        {loading && <h1>{t('blog.loading')}</h1>}
      </header>
      <main className="blog-content">
        {renderBlogContent()}
      </main>
    </div>
  );
}

export default Blog;
