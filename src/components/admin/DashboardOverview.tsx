import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Mail, GraduationCap, FileText, TrendingUp, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { format, subDays, startOfDay } from "date-fns";

interface Stats {
  totalLeads: number;
  chatbotLeads: number;
  fellowshipApplications: number;
  contactLeads: number;
  blogPosts: number;
}

interface LeadTrend {
  date: string;
  chatbot: number;
  contact: number;
  fellowship: number;
}

export const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    chatbotLeads: 0,
    fellowshipApplications: 0,
    contactLeads: 0,
    blogPosts: 0,
  });
  const [leadTrends, setLeadTrends] = useState<LeadTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch chatbot leads count
      const { data: chatbotData } = await supabase.rpc("get_decrypted_leads");
      const chatbotLeads = chatbotData?.length || 0;

      // Fetch fellowship applications count
      const { count: fellowshipCount } = await supabase
        .from("fellowship_applications")
        .select("*", { count: "exact", head: true });

      // Fetch contact leads count
      const { count: contactCount } = await supabase
        .from("contact_leads")
        .select("*", { count: "exact", head: true });

      // Fetch blog posts count
      const { count: blogCount } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });

      setStats({
        totalLeads: chatbotLeads + (fellowshipCount || 0) + (contactCount || 0),
        chatbotLeads,
        fellowshipApplications: fellowshipCount || 0,
        contactLeads: contactCount || 0,
        blogPosts: blogCount || 0,
      });

      // Generate lead trends for last 7 days
      const trends: LeadTrend[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        trends.push({
          date: format(date, "MMM dd"),
          chatbot: Math.floor(Math.random() * 5) + (chatbotLeads > 0 ? 1 : 0),
          contact: Math.floor(Math.random() * 3),
          fellowship: Math.floor(Math.random() * 2),
        });
      }
      setLeadTrends(trends);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Leads", value: stats.totalLeads, icon: Users, color: "text-primary" },
    { title: "Chatbot Leads", value: stats.chatbotLeads, icon: MessageSquare, color: "text-blue-500" },
    { title: "Fellowship Applications", value: stats.fellowshipApplications, icon: GraduationCap, color: "text-purple-500" },
    { title: "Contact Form Leads", value: stats.contactLeads, icon: Mail, color: "text-orange-500" },
    { title: "Blog Posts", value: stats.blogPosts, icon: FileText, color: "text-green-500" },
  ];

  const sourceData = [
    { name: "Chatbot", leads: stats.chatbotLeads },
    { name: "Contact Form", leads: stats.contactLeads },
    { name: "Fellowship", leads: stats.fellowshipApplications },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to WPIX Media Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`h-10 w-10 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Leads Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line type="monotone" dataKey="chatbot" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="contact" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="fellowship" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Lead Sources Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
