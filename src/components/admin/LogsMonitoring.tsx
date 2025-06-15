
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Search, Filter, RefreshCw, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { AdminRole } from "@/types/adminRoles";

const MOCK_LOGS = [
  { id: 1, timestamp: "2024-01-21 14:30:25", level: "ERROR", service: "Auth Service", message: "Failed login attempt from IP 192.168.1.102", details: "Invalid password for user john@email.com", correlationId: "abc123" },
  { id: 2, timestamp: "2024-01-21 14:29:18", level: "INFO", service: "Post Service", message: "New post created", details: "Post ID: 1234, User: sarah@email.com", correlationId: "def456" },
  { id: 3, timestamp: "2024-01-21 14:28:45", level: "WARN", service: "Database", message: "High connection count detected", details: "Current connections: 85/100", correlationId: "ghi789" },
  { id: 4, timestamp: "2024-01-21 14:27:12", level: "INFO", service: "Circle Service", message: "User joined circle", details: "User: mike@email.com joined Parenting circle", correlationId: "jkl012" },
  { id: 5, timestamp: "2024-01-21 14:26:33", level: "ERROR", service: "Payment Service", message: "Payment processing failed", details: "Transaction ID: txn_789, Amount: $9.99", correlationId: "mno345" },
];

const PERFORMANCE_METRICS = [
  { metric: "Response Time", value: "245ms", status: "good", threshold: "< 500ms" },
  { metric: "Error Rate", value: "0.12%", status: "good", threshold: "< 1%" },
  { metric: "CPU Usage", value: "68%", status: "warning", threshold: "< 80%" },
  { metric: "Memory Usage", value: "45%", status: "good", threshold: "< 70%" },
  { metric: "Database Connections", value: "85/100", status: "warning", threshold: "< 90" },
  { metric: "Active Sessions", value: "1,247", status: "good", threshold: "< 2000" },
];

interface LogsMonitoringProps {
  userRole: AdminRole;
}

export default function LogsMonitoring({ userRole }: LogsMonitoringProps) {
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(false);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesService = serviceFilter === "all" || log.service === serviceFilter;
    
    return matchesSearch && matchesLevel && matchesService;
  });

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'ERROR': return 'destructive';
      case 'WARN': return 'secondary';
      case 'INFO': return 'default';
      default: return 'outline';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR': return <XCircle className="w-4 h-4" />;
      case 'WARN': return <AlertTriangle className="w-4 h-4" />;
      case 'INFO': return <Info className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'good': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const exportLogs = () => {
    const data = {
      logs: filteredLogs,
      exportDate: new Date().toISOString(),
      filters: { searchTerm, levelFilter, serviceFilter },
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {PERFORMANCE_METRICS.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <Badge variant={getMetricStatus(metric.status)} className="text-xs mt-1">
                {metric.threshold}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            High CPU usage detected on server-02. Consider scaling resources.
          </AlertDescription>
        </Alert>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Scheduled maintenance window: Tomorrow 2:00 AM - 4:00 AM UTC
          </AlertDescription>
        </Alert>
      </div>

      {/* Logs Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Real-time application logs and monitoring</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? "bg-green-50" : ""}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                Auto Refresh
              </Button>
              <Button onClick={exportLogs} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
                <SelectItem value="WARN">Warning</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="Auth Service">Auth Service</SelectItem>
                <SelectItem value="Post Service">Post Service</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="Circle Service">Circle Service</SelectItem>
                <SelectItem value="Payment Service">Payment Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logs Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Correlation ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={getLevelBadgeVariant(log.level)} className="flex items-center gap-1 w-fit">
                      {getLevelIcon(log.level)}
                      {log.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.service}</TableCell>
                  <TableCell className="max-w-xs truncate">{log.message}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">{log.details}</TableCell>
                  <TableCell className="font-mono text-xs">{log.correlationId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
