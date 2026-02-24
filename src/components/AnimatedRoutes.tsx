import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import PageTransition from "./PageTransition";

// Eagerly load the home page for fast initial render
import Index from "../pages/Index";

// Lazy load all other pages
const AIToolkit = lazy(() => import("../pages/AIToolkit"));
const WCF = lazy(() => import("../pages/wcf"));
const SevenDC = lazy(() => import("../pages/7dc"));
const AVER = lazy(() => import("../pages/aver"));
const VYBE = lazy(() => import("../pages/vybe"));
const Fellowship = lazy(() => import("../pages/Fellowship"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AdminLeads = lazy(() => import("../pages/AdminLeads"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));

const LazyFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/ai-toolkit"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <AIToolkit />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/wcf"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <WCF />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/7dc"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <SevenDC />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/aver"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <AVER />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/vybe"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <VYBE />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/fellowship"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <Fellowship />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <Blog />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <BlogPost />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/admin-login"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <AdminLogin />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/admin-leads"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <AdminLeads />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LazyFallback />}>
              <PageTransition>
                <NotFound />
              </PageTransition>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
