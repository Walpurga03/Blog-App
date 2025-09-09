import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date?: string;
  author?: string;
  category?: string;
  image?: string;
}

interface UseBlogPostResult {
  blogPost: BlogPost | null;
  loading: boolean;
  error: boolean;
}

// Blogpost-Inhalte zentral definieren für bessere Wartbarkeit
const blogPosts: Record<string, Record<string, BlogPost>> = {
  '1-blog': {
    de: {
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
    },
    en: {
      id: '1-blog',
      title: 'Bitaxe for Home Use: Tips and Tricks',
      content: `
        <h2>Introduction to Bitaxe Mining</h2>
        <p>The Bitaxe is a compact Bitcoin miner specifically designed for home use. With its small size and efficient design, it's ideal for beginners in Bitcoin mining.</p>
        
        <p>In this article, you'll learn how to optimally set up and use your Bitaxe.</p>
        
        <h3>What Makes Bitaxe Special?</h3>
        <p>The Bitaxe miner has the following features:</p>
        <ul>
          <li>Compact design for easy placement</li>
          <li>Energy efficient with low power consumption</li>
          <li>Quieter compared to industrial miners</li>
          <li>Easy setup even for beginners</li>
        </ul>
        
        <h2>Optimal Placement</h2>
        <p>For best performance, you should place your Bitaxe miner in a cool, well-ventilated location. The ambient temperature should ideally be below 25°C (77°F).</p>
        
        <blockquote>
          <p>Tip: Don't place the miner in closed cabinets or directly against a wall to ensure adequate airflow.</p>
        </blockquote>
        
        <h3>Optimizing Cooling</h3>
        <p>Cooling is crucial for the longevity and performance of your miner. Make sure the fans are free of dust and can rotate unhindered.</p>
      `,
      date: 'August 15, 2025',
      author: 'Solomining Team',
      category: 'Bitcoin Mining'
    }
  },
  '2-blog': {
    de: {
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
    },
    en: {
      id: '2-blog',
      title: 'What is Bitaxe? How It Works & Where To Get One',
      content: `
        <h2>What is Bitaxe?</h2>
        <p>Bitaxe is a compact Bitcoin miner developed for solo mining at home. Unlike large industrial mining operations, Bitaxe is designed for individuals who want to enter the world of Bitcoin mining.</p>
        
        <h3>Technical Specifications</h3>
        <p>The Bitaxe has the following technical features:</p>
        <ul>
          <li>Hash Rate: 1.5 TH/s (Terahashes per second)</li>
          <li>Power Consumption: approx. 200 watts</li>
          <li>ASIC Chip: Custom-designed for optimal efficiency</li>
          <li>Cooling: Integrated fans for efficient heat dissipation</li>
        </ul>
        
        <h2>How Does Bitaxe Work?</h2>
        <p>Bitaxe uses specialized ASIC chips (Application-Specific Integrated Circuit) that are exclusively developed for mining cryptocurrencies. These chips perform mathematical calculations to validate new Bitcoin blocks.</p>
        
        <p>The miner connects to your local network and communicates with the Bitcoin blockchain to participate in the mining process.</p>
        
        <blockquote>
          <p>With solo mining, your device independently searches for valid blocks without joining a mining pool. This means higher potential rewards but also less frequent payouts.</p>
        </blockquote>
      `,
      date: 'September 10, 2025',
      author: 'Solomining Team',
      category: 'Bitcoin Mining'
    }
  }
};

export function useBlogPost(blogId: string): UseBlogPostResult {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.substring(0, 2); // Nur den Sprachcode (z.B. 'de', 'en') verwenden

  useEffect(() => {
    async function loadBlogPost() {
      setLoading(true);
      setError(false);

      try {
        // Prüfen, ob der Blog in unserer Sammlung verfügbar ist
        if (blogPosts[blogId]) {
          // Prüfen, ob die aktuelle Sprache verfügbar ist, sonst auf Englisch zurückfallen
          const language = blogPosts[blogId][currentLanguage] ? currentLanguage : 'en';
          setBlogPost(blogPosts[blogId][language]);
        } else {
          // Fallback zu JSON-Dateien, wenn kein hart kodierter Inhalt vorhanden ist
          try {
            const blogPostModule = await import(`../locales/blog-posts/${blogId}.${currentLanguage}.json`);
            
            setBlogPost({
              id: blogId,
              title: blogPostModule.title || '',
              content: blogPostModule.content || '',
              date: blogPostModule.date,
              author: blogPostModule.author,
              category: blogPostModule.category
            });
          } catch (jsonError) {
            console.error('Fehler beim Laden der JSON-Datei:', jsonError);
            setError(true);
          }
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