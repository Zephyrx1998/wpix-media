import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FlashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited) {
      setIsVisible(false);
      return;
    }

    // Hide after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasVisited", "true");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <img
              src="/lovable-uploads/hv-logo.jpg"
              alt="WPIX Media"
              className="w-32 h-32 rounded-full shadow-2xl"
            />
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl font-bold text-white"
            >
              WPIX Media
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlashScreen;
