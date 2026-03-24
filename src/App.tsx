import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home.tsx";
import AchievementsPage from "./pages/AchievementsPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import Admin from "./pages/Admin.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import CustomCursor from "@/components/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<Home />} /> 
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
