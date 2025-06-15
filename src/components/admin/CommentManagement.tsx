
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MOCK_COMMENTS = [
  { id: 1, postTitle: "Finding strength after loss", author: "John D.", content: "Thank you for sharing this. I'm going through something similar...", status: "Approved", postId: 1, thread: "Broken but Healed" },
  { id: 2, postTitle: "Navigating teenage rebellion", author: "Lisa K.", content: "Have you tried talking to them about boundaries?", status: "Pending", postId: 2, thread: "Parenting" },
  { id: 3, postTitle: "Marriage after infidelity", author: "Mike R.", content: "This is a very sensitive topic that requires professional help.", status: "Flagged", postId: 3, thread: "Unspoken Marriages" },
  { id: 4, postTitle: "Coming out at 40", author: "Emma S.", content: "Your courage is inspiring. Welcome to the community!", status: "Approved", postId: 4, thread: "Sexualities and Sex" }
];

interface CommentManagementProps {
  userRole?: 'admin' | 'moderator';
  assignedSegments?: string[];
}

export default function CommentManagement({ userRole = 'admin', assignedSegments = [] }: CommentManagementProps) {
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const { toast } = useToast();

  // Filter comments based on moderator permissions
  const filteredComments = userRole === 'moderator' 
    ? comments.filter(comment => assignedSegments.includes(comment.thread))
    : comments;

  const handleApproveComment = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, status: "Approved" } : comment
    ));
    toast({
      title: "Comment Approved",
      description: "The comment has been approved and is now visible.",
    });
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    toast({
      title: "Comment Deleted",
      description: "The comment has been permanently deleted.",
      variant: "destructive",
    });
  };

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Comment Management</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {userRole === 'moderator' 
            ? `Managing comments for: ${assignedSegments.join(', ')}`
            : 'Review and manage user comments across all posts'
          }
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead>Thread</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredComments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell className="font-medium max-w-xs truncate">{comment.postTitle}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{comment.thread}</TableCell>
              <TableCell>{comment.author}</TableCell>
              <TableCell className="max-w-md">
                <p className="truncate">{comment.content}</p>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  comment.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  comment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {comment.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {comment.status === 'Pending' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleApproveComment(comment.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
