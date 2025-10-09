import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CommunitySuggestion {
  id: string;
  title: string;
  description: string;
  suggested_by: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  admin_notes: string | null;
  suggester_profile?: {
    full_name: string | null;
    email: string | null;
  } | null;
}

export default function CommunitySuggestions() {
  const [suggestions, setSuggestions] = useState<CommunitySuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const { data: suggestionsData, error: suggestionsError } = await supabase
        .from('community_suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (suggestionsError) throw suggestionsError;

      // Fetch profile data separately
      const userIds = [...new Set(suggestionsData?.map(s => s.suggested_by) || [])];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      // Combine the data
      const enrichedSuggestions = suggestionsData?.map(suggestion => ({
        ...suggestion,
        suggester_profile: profilesData?.find(p => p.id === suggestion.suggested_by) || null
      })) || [];

      setSuggestions(enrichedSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to load community suggestions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id: string, status: 'approved' | 'rejected') => {
    try {
      setProcessingId(id);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('community_suggestions')
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
          admin_notes: adminNotes[id] || null
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: status === 'approved' ? "Suggestion approved" : "Suggestion rejected",
        description: `The community suggestion has been ${status}.`,
      });

      fetchSuggestions();
      setAdminNotes(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      console.error("Error reviewing suggestion:", error);
      toast({
        title: "Error",
        description: "Failed to update suggestion status",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const renderSuggestionCard = (suggestion: CommunitySuggestion) => (
    <Card key={suggestion.id} className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{suggestion.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <User className="w-4 h-4" />
              {suggestion.suggester_profile?.full_name || suggestion.suggester_profile?.email || 'Unknown user'}
              <span className="text-muted-foreground">•</span>
              {new Date(suggestion.created_at).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge 
            variant={
              suggestion.status === 'approved' ? 'default' : 
              suggestion.status === 'rejected' ? 'destructive' : 
              'secondary'
            }
          >
            {suggestion.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
            {suggestion.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
            {suggestion.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
            {suggestion.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Description:</p>
          <p className="text-sm">{suggestion.description}</p>
        </div>

        {suggestion.status === 'pending' && (
          <>
            <div className="space-y-2">
              <Label htmlFor={`notes-${suggestion.id}`}>Admin Notes (Optional)</Label>
              <Textarea
                id={`notes-${suggestion.id}`}
                placeholder="Add notes about this suggestion..."
                value={adminNotes[suggestion.id] || ''}
                onChange={(e) => setAdminNotes(prev => ({ ...prev, [suggestion.id]: e.target.value }))}
                rows={2}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => handleReview(suggestion.id, 'approved')}
                disabled={processingId === suggestion.id}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                onClick={() => handleReview(suggestion.id, 'rejected')}
                disabled={processingId === suggestion.id}
                variant="destructive"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          </>
        )}

        {suggestion.admin_notes && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-1">Admin Notes:</p>
            <p className="text-sm text-muted-foreground">{suggestion.admin_notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return <div className="flex justify-center p-8">Loading suggestions...</div>;
  }

  const pendingSuggestions = suggestions.filter(s => s.status === 'pending');
  const approvedSuggestions = suggestions.filter(s => s.status === 'approved');
  const rejectedSuggestions = suggestions.filter(s => s.status === 'rejected');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Community Suggestions</h2>
        <p className="text-muted-foreground">Review and manage community suggestions from users</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending ({pendingSuggestions.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedSuggestions.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedSuggestions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {pendingSuggestions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No pending suggestions
              </CardContent>
            </Card>
          ) : (
            pendingSuggestions.map(renderSuggestionCard)
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          {approvedSuggestions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No approved suggestions
              </CardContent>
            </Card>
          ) : (
            approvedSuggestions.map(renderSuggestionCard)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          {rejectedSuggestions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No rejected suggestions
              </CardContent>
            </Card>
          ) : (
            rejectedSuggestions.map(renderSuggestionCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
