import { useBlogCards } from '../../../hooks/useBlogCards';
import ProfessionalCardSlider from '../../CardSlider/ProfessionalCardSlider';
import './BlogSection.scss';
import { useTranslation } from 'react-i18next';

function FeaturedBlogContent() {
  const { t } = useTranslation();
  const { cards, loading } = useBlogCards();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  const blogCards = Array.isArray(cards) ? cards : [];
  
  return (
    <div className="featured-blog-content">
      {blogCards.length > 0 ? (
        <ProfessionalCardSlider cards={blogCards} />
      ) : (
        <div className="no-blogs">
          {t('blog.no_posts', 'No blog posts available at the moment.')}
        </div>
      )}
    </div>
  );
}

function BlogSection() {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <FeaturedBlogContent />
      </div>
    </section>
  );
}

export default BlogSection;
