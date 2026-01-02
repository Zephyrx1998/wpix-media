import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";

const getSessionId = () => {
  let sessionId = sessionStorage.getItem("wpix_session_id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem("wpix_session_id", sessionId);
  }
  return sessionId;
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await supabase.from("page_views").insert({
          page_path: location.pathname,
          page_title: document.title,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          session_id: getSessionId(),
        });
      } catch (error) {
        // Silently fail - analytics should not break the app
        console.debug("Page tracking error:", error);
      }
    };

    // Small delay to ensure the page is loaded
    const timeout = setTimeout(trackPageView, 100);
    return () => clearTimeout(timeout);
  }, [location.pathname]);
};
