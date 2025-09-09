import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useBlogPost } from '../../hooks/useBlogPost';
import { useBlogCards } from '../../hooks/useBlogCards';
import './Blog.scss';
// Importieren Sie Icon-Komponenten
import { FaCalendarAlt, FaUser, FaTag, FaClock, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

// Statische Bilder importieren für Fallbacks
import Image1 from '../../assets/images/blog/1-blog.jpg';
import Image2 from '../../assets/images/blog/2-blog.jpg';

function Blog() {
  const { blogId } = useParams<{ blogId: string }>();
  const { t } = useTranslation();
  const { blogPost, loading, error } = useBlogPost(blogId || '');
  const { cards } = useBlogCards(3); // Laden Sie 3 verwandte Artikel
  const [readingTime, setReadingTime] = useState("5 min");

  // Berechnen Sie die Lesezeit basierend auf dem Inhalt
  useEffect(() => {
    if (blogPost?.content) {
      // Durchschnittliche Lesegeschwindigkeit: ~200-250 Wörter pro Minute
      const wordCount = blogPost.content.split(/\s+/).length;
      const readingTimeMinutes = Math.ceil(wordCount / 225);
      setReadingTime(`${readingTimeMinutes} min`);
    }
  }, [blogPost]);

  // Diese Funktion formatiert den Blog-Inhalt mit HTML
  const formatBlogContent = (content: string): string => {
    return content;
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="loading-blog">
          <div className="loading-spinner"></div>
          <p>{t('blog.loading', 'Loading article...')}</p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="blog-container">
        <div className="blog-not-found">
          <h2>{t('blog.not_found_title', 'Article Not Found')}</h2>
          <p>
            {t(
              'blog.not_found_message',
              'Sorry, the article you are looking for does not exist or has been removed.'
            )}
          </p>
          <Link to="/" className="back-button">
            {t('blog.back_to_home', 'Back to Home')}
          </Link>
        </div>
      </div>
    );
  }

  // Holen Sie sich das richtige Bild für diesen Blog-Beitrag
  const getBlogImage = () => {
    if (blogId === '1-blog') return Image1;
    if (blogId === '2-blog') return Image2;
    return Image1; // Fallback
  };

  // Hilfsfunktion zum Abrufen von Bildern für Karten
  const getImageForCard = (cardId: string) => {
    if (cardId === '1-blog') return Image1;
    if (cardId === '2-blog') return Image2;
    return Image1; // Fallback
  };

  return (
    <div className="blog-container">
      {/* Hero-Bereich mit Titelbild und Überschrift */}
      <div className="blog-hero">
        <img 
          src={getBlogImage()} 
          alt={blogPost.title} 
          className="hero-image" 
        />
        <div className="hero-overlay">
          <h1 className="blog-title">{blogPost.title}</h1>
        </div>
      </div>
      
      <div className="blog-content-wrapper">
        {/* Metadaten-Bereich */}
        <div className="blog-meta">
          <div className="meta-item">
            <FaCalendarAlt /> {blogPost.date || '09 Sep 2025'}
          </div>
          <div className="meta-item">
            <FaUser /> {blogPost.author || 'Solomining Team'}
          </div>
          <div className="meta-item">
            <FaTag /> {blogPost.category || 'Bitcoin Mining'}
          </div>
          <div className="meta-item">
            <FaClock /> {readingTime}
          </div>
        </div>
        
        {/* Hauptinhalt */}
        <div 
          className="blog-content" 
          dangerouslySetInnerHTML={{ __html: formatBlogContent(blogPost.content) }}
        />
        
        {/* Footer mit Teilen-Optionen */}
        <div className="blog-footer">
          <h3 className="share-title">{t('blog.share_article', 'Share this article')}</h3>
          <div className="social-share">
            <div className="share-button twitter">
              <FaTwitter />
            </div>
            <div className="share-button facebook">
              <FaFacebook />
            </div>
            <div className="share-button linkedin">
              <FaLinkedin />
            </div>
          </div>
        </div>
        
        {/* Verwandte Artikel */}
        {cards && cards.length > 0 && (
          <div className="related-articles">
            <h3>{t('blog.related_articles', 'Related Articles')}</h3>
            <div className="related-grid">
              {cards
                .filter(card => card.id !== blogId) // Aktuellen Artikel ausfiltern
                .slice(0, 3) // Maximal 3 verwandte Artikel anzeigen
                .map(card => (
                  <Link key={card.id} to={`/blog/${card.id}`} className="related-card">
                    <img 
                      src={getImageForCard(card.id)} 
                      alt={card.title}
                      className="card-image" 
                    />
                    <div className="card-content">
                      <h4>{card.title}</h4>
                      <p>{card.description.substring(0, 70)}...</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
