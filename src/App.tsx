import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import AIToolkit from "./pages/AIToolkit";
import WCF from "./pages/wcf";
import SevenDC from "./pages/7dc";
import AVER from "./pages/aver";
import VYBE from "./pages/vybe";
import NotFound from "./pages/NotFound";
import AdminLeads from "./pages/AdminLeads";
import AdminLogin from "./pages/AdminLogin";
import Chatbot from "@/components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Chatbot />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai-toolkit" element={<AIToolkit />} />
            <Route path="/wcf" element={<WCF />} />
            <Route path="/7dc" element={<SevenDC />} />
            <Route path="/aver" element={<AVER />} />
            <Route path="/vybe" element={<VYBE />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-leads" element={<AdminLeads />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
