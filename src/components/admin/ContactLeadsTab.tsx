import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Search, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactLead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  service_interested: string | null;
  message: string | null;
  page_source: string | null;
  created_at: string;
}

export const ContactLeadsTab = () => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase.rpc("get_decrypted_contact_leads");
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching contact leads:", error);
      toast({
        title: "Error",
        description: "Failed to fetch contact leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    if (!searchTerm) {
      setFilteredLeads(leads);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = leads.filter(
      (lead) =>
        lead.name?.toLowerCase().includes(term) ||
        lead.email?.toLowerCase().includes(term) ||
        lead.company_name?.toLowerCase().includes(term) ||
        lead.service_interested?.toLowerCase().includes(term)
    );
    setFilteredLeads(filtered);
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
          <Mail className="h-8 w-8 text-orange-500" />
          Contact Form Leads
        </h1>
        <p className="text-muted-foreground">Leads from website contact forms</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contact leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>All Contact Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No contact leads yet</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Service Interested</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Source Page</TableHead>
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
                      <TableCell>{lead.company_name || "-"}</TableCell>
                      <TableCell>{lead.service_interested || "-"}</TableCell>
                      <TableCell className="max-w-xs truncate">{lead.message || "-"}</TableCell>
                      <TableCell>{lead.page_source || "-"}</TableCell>
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
