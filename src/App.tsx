import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import AIToolkit from "./pages/AIToolkit";
import WCF from "./pages/WCF";
import SevenDC from "./pages/7DC";
import AVER from "./pages/AVER";
import VYBE from "./pages/VYBE";
import NotFound from "./pages/NotFound";
import FlashScreen from "@/components/FlashScreen";
import ThemeToggle from "@/components/ThemeToggle";
import Chatbot from "@/components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FlashScreen />
        <ThemeToggle />
        <Chatbot />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai-toolkit" element={<AIToolkit />} />
            <Route path="/wcf" element={<WCF />} />
            <Route path="/7dc" element={<SevenDC />} />
            <Route path="/aver" element={<AVER />} />
            <Route path="/vybe" element={<VYBE />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
