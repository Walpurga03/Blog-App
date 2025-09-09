import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date?: string;       // Hinzugefügt
  author?: string;     // Hinzugefügt
  category?: string;   // Hinzugefügt
}

interface UseBlogPostResult {
  blogPost: BlogPost | null;
  loading: boolean;
  error: boolean;
}

export function useBlogPost(blogId: string): UseBlogPostResult {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    async function loadBlogPost() {
      setLoading(true);
      setError(false);

      try {
        // Test-Content für Entwicklungszwecke
        if (blogId === '1-blog') {
          setBlogPost({
            id: '1-blog',
            title: 'Bitaxe für den Heimgebrauch: Tipps und Tricks',
            content: `
              <h2>Einführung in Bitaxe Mining</h2>
              <p>Der Bitaxe ist ein kompakter Bitcoin-Miner, der speziell für den Heimgebrauch entwickelt wurde. Mit seiner geringen Größe und dem effizienten Design ist er ideal für Einsteiger im Bitcoin-Mining.</p>
              
              <p>In diesem Artikel erfahren Sie, wie Sie Ihren Bitaxe optimal einrichten und nutzen können.</p>
              
              <h3>Was macht Bitaxe besonders?</h3>
              <p>Der Bitaxe-Miner zeichnet sich durch folgende Eigenschaften aus:</p>
              <ul>
                <li>Kompaktes Design für einfache Platzierung</li>
                <li>Energieeffizient mit geringem Stromverbrauch</li>
                <li>Geräuscharm im Vergleich zu industriellen Minern</li>
                <li>Einfache Einrichtung auch für Anfänger</li>
              </ul>
              
              <h2>Optimale Aufstellung</h2>
              <p>Für die beste Leistung sollten Sie Ihren Bitaxe-Miner an einem kühlen, gut belüfteten Ort aufstellen. Die Umgebungstemperatur sollte idealerweise unter 25°C liegen.</p>
              
              <blockquote>
                <p>Tipp: Stellen Sie den Miner nicht in geschlossenen Schränken oder direkt an der Wand auf, um einen ausreichenden Luftstrom zu gewährleisten.</p>
              </blockquote>
              
              <h3>Kühlung optimieren</h3>
              <p>Die Kühlung ist entscheidend für die Langlebigkeit und Leistung Ihres Miners. Stellen Sie sicher, dass die Lüfter frei von Staub sind und ungehindert drehen können.</p>
            `,
            date: '15. August 2025',
            author: 'Solomining Team',
            category: 'Bitcoin Mining'
          });
        } else if (blogId === '2-blog') {
          setBlogPost({
            id: '2-blog',
            title: 'Was ist Bitaxe? Wie es funktioniert & wo man einen bekommt',
            content: `
              <h2>Was ist Bitaxe?</h2>
              <p>Bitaxe ist ein kompakter Bitcoin-Miner, der für Solo-Mining zu Hause entwickelt wurde. Im Gegensatz zu großen industriellen Mining-Anlagen ist Bitaxe für Einzelpersonen konzipiert, die in die Welt des Bitcoin-Minings einsteigen möchten.</p>
              
              <h3>Technische Spezifikationen</h3>
              <p>Der Bitaxe verfügt über folgende technische Merkmale:</p>
              <ul>
                <li>Hash-Rate: 1,5 TH/s (Terahashes pro Sekunde)</li>
                <li>Stromverbrauch: ca. 200 Watt</li>
                <li>ASIC-Chip: Custom-designed für optimale Effizienz</li>
                <li>Kühlung: Integrierte Lüfter für effiziente Wärmeableitung</li>
              </ul>
              
              <h2>Wie funktioniert Bitaxe?</h2>
              <p>Bitaxe verwendet spezialisierte ASIC-Chips (Application-Specific Integrated Circuit), die ausschließlich für das Mining von Kryptowährungen entwickelt wurden. Diese Chips führen mathematische Berechnungen durch, um neue Bitcoin-Blöcke zu validieren.</p>
              
              <p>Der Miner verbindet sich mit Ihrem lokalen Netzwerk und kommuniziert mit der Bitcoin-Blockchain, um am Mining-Prozess teilzunehmen.</p>
              
              <blockquote>
                <p>Beim Solo-Mining sucht Ihr Gerät selbstständig nach gültigen Blöcken, ohne einem Mining-Pool beizutreten. Dies bedeutet höhere potenzielle Belohnungen, aber auch seltenere Auszahlungen.</p>
              </blockquote>
            `,
            date: '10. September 2025',
            author: 'Solomining Team',
            category: 'Bitcoin Mining'
          });
        } else {
          // Versuche, die Datei zu laden wie zuvor...
          const blogPostModule = await import(`../locales/blog-posts/${blogId}.${currentLanguage}.json`);
          
          setBlogPost({
            id: blogId,
            title: blogPostModule.title || '',
            content: blogPostModule.content || '',
            date: blogPostModule.date,
            author: blogPostModule.author,
            category: blogPostModule.category
          });
        }
        
        setLoading(false);
      } catch (e) {
        console.error('Fehler beim Laden des Blog-Posts:', e);
        setError(true);
        setLoading(false);
      }
    }

    if (blogId) {
      loadBlogPost();
    } else {
      setError(true);
      setLoading(false);
    }
  }, [blogId, currentLanguage]);

  return { blogPost, loading, error };
}