import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home.tsx";
import AchievementsPage from "./pages/AchievementsPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Admin from "./pages/Admin.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import CustomCursor from "@/components/CustomCursor";
import RadarLoader from "@/components/RadarLoader";
import NameTicker from "@/components/NameTicker";
import { useSiteSettings } from "@/lib/siteSettings";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Global preloader duration
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div 
                            key="loader"
                            initial={{ opacity: 1 }}
                            exit={{ 
                                opacity: 0,
                                filter: "blur(20px)",
                                transition: { duration: 0.8, ease: "easeInOut" }
                            }}
                            className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center gap-12"
                        >
                            <div className="relative scale-150">
                                <RadarLoader />
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <motion.p 
                                    className="text-[10px] font-mono text-red-600 tracking-[0.6em] uppercase manifest-text"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    INITIALIZING_TACTICAL_ENTRY
                                </motion.p>
                                <div className="w-48 h-1 bg-white/5 border border-white/10 relative overflow-hidden">
                                    <motion.div 
                                        className="absolute inset-y-0 left-0 bg-red-600"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "linear" }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <BrowserRouter>
                    <CustomCursor />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/achievements" element={<AchievementsPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/project/:id" element={<ProjectDetail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <GlobalTicker />
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

const GlobalTicker = () => {
    const { show_global_ticker } = useSiteSettings();
    if (!show_global_ticker) return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none">
            <NameTicker variant="divider" />
        </div>
    );
};

export default App;
