"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  Calendar, 
  ChevronDown, 
  Download, 
  FileText, 
  Filter, 
  Info, 
  LayoutDashboard, 
  Search, 
  Shield, 
  User 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample audit log data
const auditLogs = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "john@acme.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "User Login",
    resource: "Authentication",
    ipAddress: "192.168.1.1",
    timestamp: "2023-07-15 09:23:45",
    status: "Success",
    severity: "Info",
  },
  {
    id: "2",
    user: {
      name: "Sarah Davis",
      email: "sarah@globex.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "Create User",
    resource: "User Management",
    ipAddress: "192.168.1.2",
    timestamp: "2023-07-15 10:15:22",
    status: "Success",
    severity: "Info",
  },
  {
    id: "3",
    user: {
      name: "Michael Robinson",
      email: "michael@soylent.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "Update Subscription",
    resource: "Subscription Management",
    ipAddress: "192.168.1.3",
    timestamp: "2023-07-15 11:05:17",
    status: "Success",
    severity: "Info",
  },
  {
    id: "4",
    user: {
      name: "Alicia Johnson",
      email: "alicia@initech.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "Failed Login Attempt",
    resource: "Authentication",
    ipAddress: "192.168.1.4",
    timestamp: "2023-07-15 12:45:33",
    status: "Failed",
    severity: "Warning",
  },
  {
    id: "5",
    user: {
      name: "David Wilson",
      email: "david@umbrella.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "Delete User",
    resource: "User Management",
    ipAddress: "192.168.1.5",
    timestamp: "2023-07-15 13:22:18",
    status: "Success",
    severity: "Warning",
  },
  {
    id: "6",
    user: {
      name: "Emily Chen",
      email: "emily@massive.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "API Key Created",
    resource: "API Management",
    ipAddress: "192.168.1.6",
    timestamp: "2023-07-15 14:10:05",
    status: "Success",
    severity: "Info",
  },
  {
    id: "7",
    user: {
      name: "System",
      email: "system@enterprise-saas.com",
      avatar: "",
    },
    action: "Database Backup",
    resource: "System",
    ipAddress: "192.168.1.7",
    timestamp: "2023-07-15 15:00:00",
    status: "Success",
    severity: "Info",
  },
  {
    id: "8",
    user: {
      name: "Robert Smith",
      email: "robert@wayne.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "Unauthorized Access Attempt",
    resource: "Organization Settings",
    ipAddress: "192.168.1.8",
    timestamp: "2023-07-15 16:30:45",
    status: "Failed",
    severity: "Critical",
  },
];

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Filter audit logs based on search term and filters
  const filteredLogs = auditLogs.filter(
    (log) => {
      const matchesSearch = 
        log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = selectedSeverity ? log.severity === selectedSeverity : true;
      const matchesStatus = selectedStatus ? log.status === selectedStatus : true;
      
      return matchesSearch && matchesSeverity && matchesStatus;
    }
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
            <p className="text-muted-foreground">
              Track and monitor all activities across the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full flex-1 items-center gap-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search audit logs..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline-block">Filter</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <div className="flex w-full flex-col gap-2">
                      <span className="text-xs font-medium">Severity</span>
                      <Select
                        value={selectedSeverity || ""}
                        onValueChange={(value) => setSelectedSeverity(value || null)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="All severities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All severities</SelectItem>
                          <SelectItem value="Info">Info</SelectItem>
                          <SelectItem value="Warning">Warning</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <div className="flex w-full flex-col gap-2">
                      <span className="text-xs font-medium">Status</span>
                      <Select
                        value={selectedStatus || ""}
                        onValueChange={(value) => setSelectedStatus(value || null)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All statuses</SelectItem>
                          <SelectItem value="Success">Success</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span className="hidden sm:inline-block">Date Range</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline-block">Export</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No audit logs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {log.user.avatar ? (
                              <AvatarImage src={log.user.avatar} />
                            ) : (
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <Shield className="h-4 w-4 text-primary" />
                              </div>
                            )}
                            <AvatarFallback>{log.user.name.charAt(0)}{log.user.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{log.user.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {log.user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{log.timestamp}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.status === "Success"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.severity === "Info" && (
                            <Info className="h-4 w-4 text-blue-500" />
                          )}
                          {log.severity === "Warning" && (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          )}
                          {log.severity === "Critical" && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          <span
                            className={
                              log.severity === "Info"
                                ? "text-blue-500"
                                : log.severity === "Warning"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }
                          >
                            {log.severity}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredLogs.length}</span> of{" "}
              <span className="font-medium">{auditLogs.length}</span> logs
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredLogs.length === auditLogs.length}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredLogs.length === auditLogs.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}