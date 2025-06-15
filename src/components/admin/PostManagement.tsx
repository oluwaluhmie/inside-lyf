
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MOCK_POSTS = [
  { id: 1, title: "Finding strength after loss", author: "Sarah M.", thread: "Broken but Healed", status: "Published", comments: 12 },
  { id: 2, title: "Navigating teenage rebellion", author: "Mark J.", thread: "Parenting", status: "Pending", comments: 8 },
  { id: 3, title: "Marriage after infidelity", author: "Anonymous", thread: "Unspoken Marriages", status: "Under Review", comments: 3 },
  { id: 4, title: "Coming out at 40", author: "Alex P.", thread: "Sexualities and Sex", status: "Published", comments: 24 }
];

interface PostManagementProps {
  userRole?: 'admin' | 'moderator';
  assignedSegments?: string[];
}

export default function PostManagement({ userRole = 'admin', assignedSegments = [] }: PostManagementProps) {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const { toast } = useToast();

  // Filter posts based on moderator permissions
  const filteredPosts = userRole === 'moderator' 
    ? posts.filter(post => assignedSegments.includes(post.thread))
    : posts;

  const handleApprovePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: "Published" } : post
    ));
    toast({
      title: "Post Approved",
      description: "The post has been successfully approved and published.",
    });
  };

  const handleRejectPost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: "Rejected" } : post
    ));
    toast({
      title: "Post Rejected",
      description: "The post has been rejected and will not be published.",
      variant: "destructive",
    });
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "Post Deleted",
      description: "The post has been permanently deleted.",
      variant: "destructive",
    });
  };

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Post Management</h3>
          {userRole === 'moderator' && (
            <p className="text-sm text-muted-foreground">
              Managing: {assignedSegments.join(', ')}
            </p>
          )}
        </div>
        {userRole === 'admin' && (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Featured Story
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Thread</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.thread}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  post.status === 'Published' ? 'bg-green-100 text-green-800' :
                  post.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  post.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {post.status}
                </span>
              </TableCell>
              <TableCell>{post.comments}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {post.status === 'Pending' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleApprovePost(post.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRejectPost(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
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
