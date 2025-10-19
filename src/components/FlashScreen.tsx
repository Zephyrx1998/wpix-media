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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src="/lovable-uploads/wpix-logo.png"
              alt="WPIX Media"
              className="w-64 h-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlashScreen;
