import { useParams, Link, Navigate } from "react-router-dom";
import { getPostById } from "../../data/articles";
import "./BlogPost.scss";

// Helper function to render tables from markdown
const renderTables = (content: string) => {
  const lines = content.split("\n");
  const tables: React.ReactElement[] = [];
  let currentTable: string[] = [];
  let tableIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith("|") && line.endsWith("|")) {
      currentTable.push(line);
    } else if (currentTable.length > 0) {
      // End of table, render it
      if (currentTable.length >= 2) { // At least header + separator
        const table = renderSingleTable(currentTable, tableIndex++);
        if (table) tables.push(table);
      }
      currentTable = [];
    }
  }
  
  // Handle last table if content ends with table
  if (currentTable.length >= 2) {
    const table = renderSingleTable(currentTable, tableIndex);
    if (table) tables.push(table);
  }
  
  return tables;
};

const renderSingleTable = (tableLines: string[], key: number) => {
  if (tableLines.length < 2) return null;
  
  // Parse header
  const headerCells = tableLines[0]
    .split("|")
    .slice(1, -1) // Remove empty first and last elements
    .map(cell => cell.trim());
  
  // Skip separator line (tableLines[1])
  
  // Parse body rows
  const bodyRows = tableLines.slice(2).map(line => 
    line.split("|")
      .slice(1, -1)
      .map(cell => cell.trim())
  );
  
  return (
    <div key={key} className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headerCells.map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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
            {post.content.split("\n").map((line, index) => {
              const trimmedLine = line.trim();
              
              // Headers
              if (trimmedLine.startsWith("### ")) {
                return <h3 key={index}>{trimmedLine.slice(4)}</h3>;
              }
              if (trimmedLine.startsWith("## ")) {
                return <h2 key={index}>{trimmedLine.slice(3)}</h2>;
              }
              if (trimmedLine.startsWith("# ")) {
                return <h1 key={index}>{trimmedLine.slice(2)}</h1>;
              }
              
              // Horizontal rules
              if (trimmedLine === "---") {
                return <hr key={index} />;
              }
              
              // Empty lines
              if (trimmedLine === "") {
                return <br key={index} />;
              }
              
              // Table detection (simplified)
              if (trimmedLine.startsWith("|") && trimmedLine.endsWith("|")) {
                // This is a table row - we'll handle tables in a separate function
                return null; // Skip for now, handle below
              }
              
              // Images
              if (trimmedLine.startsWith("![") && trimmedLine.includes("](")) {
                const match = trimmedLine.match(/!\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <div key={index} className="image-container">
                      <img src={match[2]} alt={match[1]} />
                    </div>
                  );
                }
              }
              
              // Image captions (italic text starting and ending with *)
              if (trimmedLine.startsWith("*") && trimmedLine.endsWith("*") && !trimmedLine.startsWith("**")) {
                return (
                  <div key={index} className="image-caption">
                    <em>{trimmedLine.slice(1, -1)}</em>
                  </div>
                );
              }
              
              // Bold text with **
              if (trimmedLine.includes("**")) {
                const parts = trimmedLine.split("**");
                return (
                  <p key={index}>
                    {parts.map((part, i) => 
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </p>
                );
              }
              
              // List items
              if (trimmedLine.startsWith("- ")) {
                return (
                  <li key={index} className="list-item">
                    {trimmedLine.slice(2)}
                  </li>
                );
              }
              
              // Links
              if (trimmedLine.includes("[") && trimmedLine.includes("](")) {
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                const parts = trimmedLine.split(linkRegex);
                return (
                  <p key={index}>
                    {parts.map((part, i) => {
                      if (i % 3 === 1) return <a key={i} href={parts[i + 1]}>{part}</a>;
                      if (i % 3 === 2) return null;
                      return part;
                    })}
                  </p>
                );
              }
              
              // Regular paragraphs
              return <p key={index}>{trimmedLine}</p>;
            })}
            
            {/* Handle tables separately */}
            {renderTables(post.content)}
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPost;
