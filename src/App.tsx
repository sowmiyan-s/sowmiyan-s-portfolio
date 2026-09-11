import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import SiteLayout from "@/components/layout/SiteLayout";
import PageTransition from "@/components/layout/PageTransition";
import { ECG_LOOP_DURATION_MS } from "@/lib/loadingUtils";

// Helper: wrap a lazy import so the Suspense fallback always displays
// for at least 1 full ECG heartbeat animation loop (2.5s)
const lazyWithMinLoop = (factory: () => Promise<{ default: React.ComponentType<any> }>) =>
    lazy(() =>
        Promise.all([
            factory(),
            new Promise(resolve => setTimeout(resolve, ECG_LOOP_DURATION_MS)),
        ]).then(([moduleExport]) => moduleExport)
    );

// Lazy-loaded pages for high performance and fast initial load
const Home = lazyWithMinLoop(() => import("./pages/Home.tsx"));
const AchievementsPage = lazyWithMinLoop(() => import("./pages/AchievementsPage.tsx"));
const ProjectsPage = lazyWithMinLoop(() => import("./pages/ProjectsPage.tsx"));
const ContactPage = lazyWithMinLoop(() => import("./pages/ContactPage.tsx"));
const Admin = lazyWithMinLoop(() => import("./pages/Admin.tsx"));
const ProjectDetail = lazyWithMinLoop(() => import("./pages/ProjectDetail.tsx"));
const NotFound = lazyWithMinLoop(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

import UnifiedLoader from "@/components/common/UnifiedLoader";

const PageLoader = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-transparent">
        <UnifiedLoader text="INITIALIZING CORE..." size="md" />
    </div>
);

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Suspense fallback={<PageLoader />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/achievements" element={<PageTransition><AchievementsPage /></PageTransition>} />
                    <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
                    <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                    <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
                    <Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
                    <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <ErrorBoundary>
                    <SiteLayout>
                        <AnimatedRoutes />
                    </SiteLayout>
                </ErrorBoundary>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
