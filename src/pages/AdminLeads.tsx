import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { ChatbotLeadsTab } from "@/components/admin/ChatbotLeadsTab";
import { ContactLeadsTab } from "@/components/admin/ContactLeadsTab";
import { FellowshipTab } from "@/components/admin/FellowshipTab";
import { BlogManagerTab } from "@/components/admin/BlogManagerTab";
import { AnalyticsTab } from "@/components/admin/AnalyticsTab";

const AdminLeads = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const currentTab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/admin-login");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (!roles) {
        toast({
          title: "Access Denied",
          description: "You don't have admin permissions",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/admin-login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const renderContent = () => {
    switch (currentTab) {
      case "chatbot":
        return <ChatbotLeadsTab />;
      case "contact":
        return <ContactLeadsTab />;
      case "fellowship":
        return <FellowshipTab />;
      case "blog":
        return <BlogManagerTab />;
      case "analytics":
        return <AnalyticsTab />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminLeads;
