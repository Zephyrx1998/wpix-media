import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Search, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  brand_name: string | null;
  phone: string | null;
  project_type: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export const ChatbotLeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase.rpc("get_decrypted_leads");
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to fetch chatbot leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name?.toLowerCase().includes(term) ||
          lead.email?.toLowerCase().includes(term) ||
          lead.brand_name?.toLowerCase().includes(term) ||
          lead.message?.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }
    
    setFilteredLeads(filtered);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;

      setLeads(leads.map((lead) => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));

      toast({
        title: "Status Updated",
        description: "Lead status has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating lead:", error);
      toast({
        title: "Error",
        description: "Failed to update lead status",
        variant: "destructive",
      });
    }
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
          <MessageSquare className="h-8 w-8 text-primary" />
          Chatbot Leads
        </h1>
        <p className="text-muted-foreground">Leads collected from the AI chatbot</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>All Chatbot Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No leads found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Project Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(lead.created_at), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>{lead.name || "-"}</TableCell>
                      <TableCell>{lead.email || "-"}</TableCell>
                      <TableCell>{lead.phone || "-"}</TableCell>
                      <TableCell>{lead.brand_name || "-"}</TableCell>
                      <TableCell>{lead.project_type || "-"}</TableCell>
                      <TableCell className="max-w-xs truncate">{lead.message || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={
                          lead.status === "new" ? "default" :
                          lead.status === "contacted" ? "secondary" :
                          lead.status === "qualified" ? "outline" :
                          lead.status === "converted" ? "default" : "secondary"
                        }>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => updateLeadStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
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
