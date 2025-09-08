import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

// Define the blog card type
export interface BlogCard {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

export const useBlogCards = () => {
  const { t, i18n } = useTranslation();
  const [blogCards, setBlogCards] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBlogCards = async () => {
      setLoading(true);
      try {
        // Define available blog cards
        const availableBlogs = [
          {
            id: 'bitaxe_what_it_is',
            image: '/src/assets/images/blog/bitaxe-what-it-is.webp',
            slug: 'bitaxe-what-it-is'
          },
          {
            id: 'bitaxe_home',
            image: '/src/assets/images/blog/bitaxe-home.webp',
            slug: 'bitaxe-home'
          }
        ];

        // Map available blogs with translated content
        const cards = availableBlogs.map(blog => ({
          id: blog.id,
          title: t(`blog_cards.${blog.id}.title`),
          description: t(`blog_cards.${blog.id}.description`),
          image: blog.image,
          slug: blog.slug
        }));

        setBlogCards(cards);
      } catch (error) {
        console.error('Error loading blog cards:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogCards();
  }, [t, i18n.language]); // Re-run when language changes

  return { blogCards, loading };
};

export default useBlogCards;
