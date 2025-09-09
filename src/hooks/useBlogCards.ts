import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface BlogCard {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export function useBlogCards(limit?: number) {
  const { t, i18n } = useTranslation();
  // Initialisiere mit leerem Array statt undefined
  const [cards, setCards] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Blog-IDs mit dem neuen Benennungssystem
    const blogIds = ['1-blog', '2-blog'];
    
    // Karten erstellen
    const blogCards = blogIds.map(id => {
      return {
        id: id,
        title: t(`blog.${id}.card.title`, { defaultValue: id }),
        description: t(`blog.${id}.card.description`, { defaultValue: '' }),
        link: `/blog/${id}`
      };
    });
    
    // Ergebnis setzen, ggf. mit Limit
    setCards(limit ? blogCards.slice(0, limit) : blogCards);
    setLoading(false);
  }, [t, i18n.language, limit]);

  return { cards, loading };
}

export default useBlogCards;
