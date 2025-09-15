import { Link } from "react-router-dom";
import "./ModernHome.scss";

function ModernHome() {

  return (
    <div className="modern-home">
      <div className="container">
        <h1>Solo Bitcoin Mining Community</h1>
        <p>Entdecke die Welt des Solo Bitcoin Minings</p>
        
        <div className="hero-actions">
          <Link to="/blog" className="btn btn-primary">
            Blog entdecken
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ModernHome;
