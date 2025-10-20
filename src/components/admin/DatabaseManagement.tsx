
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Download, Upload, RefreshCw } from "lucide-react";

const MOCK_DB_STATS = {
  totalRecords: 45892,
  storageUsed: "2.3 GB",
  lastBackup: "2024-01-15 14:30:00",
  activeConnections: 12
};

interface DatabaseManagementProps {
  userRole?: 'admin' | 'moderator';
}

export default function DatabaseManagement({ userRole = 'admin' }: DatabaseManagementProps) {
  if (userRole === 'moderator') {
    return (
      <div className="bg-white rounded-xl border p-6 pb-8">
        <div className="flex items-center gap-2 mb-6">
          <Database className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Database Overview</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Records</p>
            <p className="text-xl font-bold">{MOCK_DB_STATS.totalRecords.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-muted-foreground">Storage Used</p>
            <p className="text-xl font-bold">{MOCK_DB_STATS.storageUsed}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          As a moderator, you have read-only access to database statistics. Contact an administrator for database management tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6 pb-8 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Database Management</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Backup
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Restore
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Records</p>
            <p className="text-xl font-bold">{MOCK_DB_STATS.totalRecords.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-muted-foreground">Storage Used</p>
            <p className="text-xl font-bold">{MOCK_DB_STATS.storageUsed}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-muted-foreground">Last Backup</p>
            <p className="text-sm font-medium">{MOCK_DB_STATS.lastBackup}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-muted-foreground">Active Connections</p>
            <p className="text-xl font-bold">{MOCK_DB_STATS.activeConnections}</p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table Name</TableHead>
              <TableHead>Records</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">users</TableCell>
              <TableCell>12,847</TableCell>
              <TableCell>1.2 GB</TableCell>
              <TableCell>2024-01-15 10:30</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">View</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">posts</TableCell>
              <TableCell>8,934</TableCell>
              <TableCell>800 MB</TableCell>
              <TableCell>2024-01-15 14:20</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">View</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">comments</TableCell>
              <TableCell>24,111</TableCell>
              <TableCell>300 MB</TableCell>
              <TableCell>2024-01-15 15:45</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">View</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
