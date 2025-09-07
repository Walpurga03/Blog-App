function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Solomining</p>
        <div className="social-links">
          <a href="https://twitter.com/dtv_electronics" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://github.com/skot/bitaxe" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
