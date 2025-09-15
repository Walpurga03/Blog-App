import { useParams, Link, Navigate } from "react-router-dom";
import { getPostById } from "../../data/articles";
import "./BlogPost.scss";

function BlogPost() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <Navigate to="/blog" replace />;
  }

  const post = getPostById(id);

  if (!post) {
    return (
      <div className="blog-post">
        <div className="container">
          <nav className="blog-nav">
            <Link to="/blog" className="back-link">← Zurück zur Blog-Übersicht</Link>
          </nav>
          <div className="post-not-found">
            <h1>Blog-Artikel nicht gefunden</h1>
            <p>Der gesuchte Artikel existiert nicht oder wurde entfernt.</p>
            <Link to="/blog" className="btn btn-primary">Zurück zur Übersicht</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="container">
        <nav className="blog-nav">
          <Link to="/blog" className="back-link">← Zurück zur Blog-Übersicht</Link>
        </nav>

        <article className="post-content">
          <header className="post-header">
            <div className="post-meta">
              <span className="post-date">{new Date(post.publishDate).toLocaleDateString("de-DE")}</span>
              <span className="post-read-time">{post.readTime} Lesezeit</span>
              <span className="post-author">von {post.author}</span>
            </div>
            
            <h1 className="post-title">{post.title}</h1>
            {post.subtitle && <p className="post-subtitle">{post.subtitle}</p>}
            
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </header>

          <div className="post-body">
            {post.content.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("# ")) {
                return <h1 key={index}>{paragraph.slice(2)}</h1>;
              }
              if (paragraph.startsWith("## ")) {
                return <h2 key={index}>{paragraph.slice(3)}</h2>;
              }
              if (paragraph.startsWith("### ")) {
                return <h3 key={index}>{paragraph.slice(4)}</h3>;
              }
              if (paragraph.trim() === "---") {
                return <hr key={index} />;
              }
              if (paragraph.trim() === "") {
                return <br key={index} />;
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPost;
