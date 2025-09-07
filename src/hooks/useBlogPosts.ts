import { useEffect, useState } from 'react';
import i18n from 'i18next';

export interface BlogPost {
  title: string;
  content: string;
  meta: {
    description: string;
    keywords: string;
  };
  card: {
    title: string;
    description: string;
  };
}

export interface BlogPosts {
  [key: string]: BlogPost | null;
}

// Diese Funktion lädt einen Blog-Post basierend auf der ID und aktuellen Sprache
export const useBlogPost = (blogId: string): { blogPost: BlogPost | null; loading: boolean; error: string | null } => {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      setError(null);
      try {
        // Dynamisches Importieren der Blogpost-Datei basierend auf ID und Sprache
        const module = await import(`../locales/blog-posts/${blogId}.${currentLanguage}.json`);
        setBlogPost(module.default);
        setLoading(false);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError(`Fehler beim Laden des Blog-Posts. ${err}`);
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [blogId, currentLanguage]);

  return { blogPost, loading, error };
};

// Diese Funktion lädt alle Blog-Post-Cards für die Übersichtsseite
export const useBlogCards = (blogIds: string[]): { blogCards: BlogPosts; loading: boolean } => {
  const [blogCards, setBlogCards] = useState<BlogPosts>({});
  const [loading, setLoading] = useState<boolean>(true);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchBlogCards = async () => {
      setLoading(true);
      const cards: BlogPosts = {};

      for (const id of blogIds) {
        try {
          const module = await import(`../locales/blog-posts/${id}.${currentLanguage}.json`);
          cards[id] = { 
            title: module.default.title,
            content: '', // Wir benötigen nicht den vollständigen Inhalt für die Karten
            meta: module.default.meta,
            card: module.default.card
          };
        } catch (err) {
          console.error(`Error loading blog card for ${id}:`, err);
          cards[id] = null;
        }
      }

      setBlogCards(cards);
      setLoading(false);
    };

    fetchBlogCards();
  }, [blogIds, currentLanguage]);

  return { blogCards, loading };
};
