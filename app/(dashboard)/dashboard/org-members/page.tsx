"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  ChevronDown, 
  Download, 
  Filter, 
  LayoutDashboard, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Shield, 
  Trash, 
  UserCog, 
  Users 
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";

// Sample organization members data
const members = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acme.com",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "2",
    name: "Sarah Davis",
    email: "sarah@acme.com",
    role: "Manager",
    department: "Marketing",
    status: "Active",
    lastActive: "5 hours ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "3",
    name: "Michael Robinson",
    email: "michael@acme.com",
    role: "User",
    department: "Sales",
    status: "Inactive",
    lastActive: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "4",
    name: "Alicia Johnson",
    email: "alicia@acme.com",
    role: "Admin",
    department: "Product",
    status: "Active",
    lastActive: "Just now",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@acme.com",
    role: "User",
    department: "Finance",
    status: "Active",
    lastActive: "1 day ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "6",
    name: "Emily Chen",
    email: "emily@acme.com",
    role: "Manager",
    department: "Customer Support",
    status: "Active",
    lastActive: "3 hours ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "7",
    name: "Robert Smith",
    email: "robert@acme.com",
    role: "User",
    department: "Engineering",
    status: "Suspended",
    lastActive: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function OrgMembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [userRole, setUserRole] = useState("org-admin"); // Options: "org-admin", "org-user"
  
  // Filter members based on search term
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = () => {
    toast.success("Member invitation sent successfully");
    setIsAddMemberDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Organization Members</h2>
            <p className="text-muted-foreground">
              Manage members of Acme Inc. organization
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            {userRole === "org-admin" && (
              <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite New Member</DialogTitle>
                    <DialogDescription>
                      Invite a new member to join your organization. They will receive an email invitation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" placeholder="Email address" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="department" className="text-right">
                        Department
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddMember}>Send Invitation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        
        {/* Role Switcher (for demo purposes) */}
        <div className="bg-card p-4 rounded-lg border shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {userRole === "org-admin" ? (
                <Shield className="h-5 w-5 text-primary" />
              ) : (
                <Users className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {userRole === "org-admin" ? "Organization Administrator View" : "Organization User View"}
              </h2>
              <p className="text-muted-foreground">
                {userRole === "org-admin" 
                  ? "You have full access to manage Acme Inc. organization members" 
                  : "You have limited access to view Acme Inc. organization members"}
              </p>
            </div>
            <select 
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="org-admin">Organization Admin View</option>
              <option value="org-user">Organization User View</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search members..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline-block">Filter</span >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Role</DropdownMenuItem>
                  <DropdownMenuItem>Department</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Last Active</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              {userRole === "org-admin" && (
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline-block">Export</span>
                </Button>
              )}
              {userRole === "org-admin" && (
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline-block">Bulk Import</span>
                </Button>
              )}
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  {userRole === "org-admin" && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={userRole === "org-admin" ? 6 : 5} className="h-24 text-center">
                      No members found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}{member.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.role === "Admin"
                              ? "default"
                              : member.role === "Manager"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.status === "Active"
                              ? "default"
                              : member.status === "Inactive"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.lastActive}</TableCell>
                      {userRole === "org-admin" && (
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <UserCog className="mr-2 h-4 w-4" />
                                Edit Member
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Remove Member
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredMembers.length}</span> of{" "}
              <span className="font-medium">{members.length}</span> members
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredMembers.length === members.length}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredMembers.length === members.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}