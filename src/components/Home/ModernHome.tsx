import './ModernHome.scss';
import HeroSection from './Sections/HeroSection';
import FeaturesSection from './Sections/FeaturesSection';
import BlogSection from './Sections/BlogSection';

function ModernHome() {
  return (
    <div className="modern-home">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Blog Section */}
      <BlogSection />
    </div>
  );
}

export default ModernHome;
