import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n";
import ModernHome from "./components/Home/ModernHome";
import BlogOverview from "./components/BlogOverview/BlogOverview";
import BlogPost from "./components/BlogPost/BlogPost";

function App() {
  return (
    <Router basename="/Blog-App">
      <Routes>
        <Route path="/" element={<ModernHome />} />
        <Route path="/blog" element={<BlogOverview />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
