import { Link } from "react-router-dom";
import { getAllPosts } from "../../data/articles";
import "./BlogOverview.scss";

function BlogOverview() {
  const posts = getAllPosts();

  return (
    <div className="blog-overview">
      <div className="container">
        <nav className="blog-nav">
          <Link to="/" className="back-link">← Zurück zur Startseite</Link>
        </nav>
        
        <header className="blog-header">
          <h1>Blog Übersicht</h1>
          <p>Entdecke unsere neuesten Artikel über Solo Mining</p>
        </header>
        
        <section className="blog-grid">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="blog-card">
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-date">{new Date(post.publishDate).toLocaleDateString('de-DE')}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                
                <h3>{post.title}</h3>
                <p>{post.subtitle}</p>
                
                <div className="blog-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                
                {post.featured && <span className="featured-badge">Featured</span>}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

export default BlogOverview;
