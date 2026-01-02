import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  LogOut,
  MessageSquare,
  GraduationCap,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const navItems = [
  { href: "/admin-leads", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin-leads?tab=chatbot", icon: MessageSquare, label: "Chatbot Leads" },
  { href: "/admin-leads?tab=contact", icon: Mail, label: "Contact Leads" },
  { href: "/admin-leads?tab=fellowship", icon: GraduationCap, label: "Fellowship" },
  { href: "/admin-leads?tab=blog", icon: FileText, label: "Blog Manager" },
  { href: "/admin-leads?tab=analytics", icon: BarChart3, label: "Analytics" },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.search;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/wpix-logo.png" 
            alt="WPIX Media" 
            className="h-8 w-auto"
          />
          <span className="font-bold text-foreground">Admin</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href || 
            (item.href === "/admin-leads" && location.pathname === "/admin-leads" && !location.search);
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
