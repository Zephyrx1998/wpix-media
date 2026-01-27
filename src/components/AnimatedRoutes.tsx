import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Index from "../pages/Index";
import AIToolkit from "../pages/AIToolkit";
import WCF from "../pages/wcf";
import SevenDC from "../pages/7dc";
import AVER from "../pages/aver";
import VYBE from "../pages/vybe";
import Fellowship from "../pages/Fellowship";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import NotFound from "../pages/NotFound";
import AdminLeads from "../pages/AdminLeads";
import AdminLogin from "../pages/AdminLogin";

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
            <PageTransition>
              <AIToolkit />
            </PageTransition>
          }
        />
        <Route
          path="/wcf"
          element={
            <PageTransition>
              <WCF />
            </PageTransition>
          }
        />
        <Route
          path="/7dc"
          element={
            <PageTransition>
              <SevenDC />
            </PageTransition>
          }
        />
        <Route
          path="/aver"
          element={
            <PageTransition>
              <AVER />
            </PageTransition>
          }
        />
        <Route
          path="/vybe"
          element={
            <PageTransition>
              <VYBE />
            </PageTransition>
          }
        />
        <Route
          path="/fellowship"
          element={
            <PageTransition>
              <Fellowship />
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <Blog />
            </PageTransition>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageTransition>
              <BlogPost />
            </PageTransition>
          }
        />
        <Route
          path="/admin-login"
          element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          }
        />
        <Route
          path="/admin-leads"
          element={
            <PageTransition>
              <AdminLeads />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
