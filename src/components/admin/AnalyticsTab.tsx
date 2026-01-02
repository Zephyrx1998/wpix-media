import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Eye, FileText, MessageSquare, TrendingUp, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { format, subDays } from "date-fns";

interface PageViewData {
  page_path: string;
  count: number;
}

interface DailyView {
  date: string;
  views: number;
}

export const AnalyticsTab = () => {
  const [totalViews, setTotalViews] = useState(0);
  const [pageViews, setPageViews] = useState<PageViewData[]>([]);
  const [dailyViews, setDailyViews] = useState<DailyView[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    chatbotInteractions: 0,
    formSubmissions: 0,
    blogTraffic: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch page views
      const { data: views, error } = await supabase
        .from("page_views")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTotalViews(views?.length || 0);

      // Group by page path
      const pathCounts: Record<string, number> = {};
      views?.forEach((view) => {
        pathCounts[view.page_path] = (pathCounts[view.page_path] || 0) + 1;
      });

      const pageData = Object.entries(pathCounts)
        .map(([path, count]) => ({ page_path: path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setPageViews(pageData);

      // Group by day for last 7 days
      const dailyData: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const date = format(subDays(new Date(), i), "MMM dd");
        dailyData[date] = 0;
      }

      views?.forEach((view) => {
        const date = format(new Date(view.created_at), "MMM dd");
        if (dailyData.hasOwnProperty(date)) {
          dailyData[date]++;
        }
      });

      setDailyViews(
        Object.entries(dailyData).map(([date, views]) => ({ date, views }))
      );

      // Fetch other stats
      const { data: chatbotLeads } = await supabase.rpc("get_decrypted_leads");
      const { count: contactCount } = await supabase
        .from("contact_leads")
        .select("*", { count: "exact", head: true });
      const { count: fellowshipCount } = await supabase
        .from("fellowship_applications")
        .select("*", { count: "exact", head: true });

      setStats({
        chatbotInteractions: chatbotLeads?.length || 0,
        formSubmissions: (contactCount || 0) + (fellowshipCount || 0),
        blogTraffic: pageData.filter((p) => p.page_path.includes("/blog")).reduce((sum, p) => sum + p.count, 0),
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["hsl(153, 65%, 35%)", "#3b82f6", "#f97316", "#8b5cf6", "#ec4899", "#14b8a6"];

  const sourceData = [
    { name: "Chatbot", value: stats.chatbotInteractions },
    { name: "Forms", value: stats.formSubmissions },
    { name: "Blog", value: stats.blogTraffic },
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
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">Website traffic and engagement metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Page Views</p>
                <p className="text-3xl font-bold text-foreground">{totalViews}</p>
              </div>
              <Eye className="h-10 w-10 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Chatbot Interactions</p>
                <p className="text-3xl font-bold text-foreground">{stats.chatbotInteractions}</p>
              </div>
              <MessageSquare className="h-10 w-10 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Form Submissions</p>
                <p className="text-3xl font-bold text-foreground">{stats.formSubmissions}</p>
              </div>
              <Users className="h-10 w-10 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blog Traffic</p>
                <p className="text-3xl font-bold text-foreground">{stats.blogTraffic}</p>
              </div>
              <FileText className="h-10 w-10 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Page Views Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Top Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pageViews.slice(0, 6)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="page_path" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11}
                  width={100}
                  tickFormatter={(value) => value.length > 15 ? value.slice(0, 15) + "..." : value}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Lead Sources Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
