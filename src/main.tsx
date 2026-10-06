import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

// Pages
import App from "./App";
import Work from "./pages/Work";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import SkillsPage from "./pages/SkillsPage";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

// Context
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<App />} />

          {/* Work / Experience */}
          <Route path="/work" element={<Work />} />

          {/* Projects */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          {/* Skills */}
          <Route path="/skills" element={<SkillsPage />} />

          {/* Blogs */}
          <Route path="/blogs" element={<Blogs />} />

          {/* Individual Blog Post */}
          <Route path="/blogs/:slug" element={<BlogPost />} />

          {/* 404 - Always keep this last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
