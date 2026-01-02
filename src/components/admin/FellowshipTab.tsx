import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Search, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FellowshipApplication {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  skill_interest: string | null;
  experience_level: string | null;
  motivation: string | null;
  created_at: string;
}

export const FellowshipTab = () => {
  const [applications, setApplications] = useState<FellowshipApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<FellowshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, skillFilter]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase.rpc("get_decrypted_fellowship_applications");
      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching fellowship applications:", error);
      toast({
        title: "Error",
        description: "Failed to fetch fellowship applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.full_name?.toLowerCase().includes(term) ||
          app.email?.toLowerCase().includes(term) ||
          app.city?.toLowerCase().includes(term)
      );
    }
    
    if (skillFilter !== "all") {
      filtered = filtered.filter((app) => 
        app.skill_interest?.toLowerCase().includes(skillFilter.toLowerCase())
      );
    }
    
    setFilteredApplications(filtered);
  };

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
          <GraduationCap className="h-8 w-8 text-purple-500" />
          Fellowship Applications
        </h1>
        <p className="text-muted-foreground">WPIX Learn & Earn Fellowship program applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={skillFilter} onValueChange={setSkillFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by skill" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skills</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="video">Video Editing</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="social">Social Media</SelectItem>
            <SelectItem value="tech">Tech</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>All Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No applications yet</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Skill Interest</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Motivation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(app.created_at), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>{app.full_name || "-"}</TableCell>
                      <TableCell>{app.email || "-"}</TableCell>
                      <TableCell>{app.phone || "-"}</TableCell>
                      <TableCell>{app.city || "-"}</TableCell>
                      <TableCell>{app.skill_interest || "-"}</TableCell>
                      <TableCell>{app.experience_level || "-"}</TableCell>
                      <TableCell className="max-w-xs truncate">{app.motivation || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
