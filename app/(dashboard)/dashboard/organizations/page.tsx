"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  ChevronDown, 
  Download, 
  Filter, 
  Globe, 
  LayoutDashboard, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Settings, 
  Trash, 
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

// Sample organization data
const organizations = [
  {
    id: "1",
    name: "Acme Inc.",
    domain: "acme.com",
    plan: "Enterprise",
    users: 42,
    status: "Active",
    createdAt: "Jan 15, 2023",
  },
  {
    id: "2",
    name: "Globex Corp",
    domain: "globex.com",
    plan: "Business",
    users: 18,
    status: "Active",
    createdAt: "Mar 22, 2023",
  },
  {
    id: "3",
    name: "Soylent Corp",
    domain: "soylent.com",
    plan: "Business",
    users: 7,
    status: "Inactive",
    createdAt: "Apr 10, 2023",
  },
  {
    id: "4",
    name: "Initech",
    domain: "initech.com",
    plan: "Enterprise",
    users: 31,
    status: "Active",
    createdAt: "Feb 8, 2023",
  },
  {
    id: "5",
    name: "Umbrella Corp",
    domain: "umbrella.com",
    plan: "Starter",
    users: 5,
    status: "Active",
    createdAt: "May 19, 2023",
  },
  {
    id: "6",
    name: "Massive Dynamic",
    domain: "massive.com",
    plan: "Business",
    users: 24,
    status: "Active",
    createdAt: "Jun 3, 2023",
  },
  {
    id: "7",
    name: "Wayne Enterprises",
    domain: "wayne.com",
    plan: "Enterprise",
    users: 56,
    status: "Active",
    createdAt: "Jan 5, 2023",
  },
];

export default function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOrgDialogOpen, setIsAddOrgDialogOpen] = useState(false);
  
  // Filter organizations based on search term
  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrganization = () => {
    toast.success("Organization added successfully");
    setIsAddOrgDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Organizations</h2>
            <p className="text-muted-foreground">
              Manage organizations and their settings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Dialog open={isAddOrgDialogOpen} onOpenChange={setIsAddOrgDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Building2 className="mr-2 h-4 w-4" />
                  Add Organization
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Organization</DialogTitle>
                  <DialogDescription>
                    Create a new organization in the platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="org-name" className="text-right">
                      Name
                    </Label>
                    <Input id="org-name" placeholder="Organization name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="domain" className="text-right">
                      Domain
                    </Label>
                    <Input id="domain" placeholder="company.com" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="plan" className="text-right">
                      Plan
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddOrgDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOrganization}>Add Organization</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search organizations..."
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
                  <DropdownMenuItem>Plan</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Created Date</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline-block">Export</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline-block">Bulk Import</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No organizations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrganizations.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div className="font-medium">{org.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{org.domain}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            org.plan === "Enterprise"
                              ? "default"
                              : org.plan === "Business"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {org.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{org.users}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            org.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {org.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{org.createdAt}</TableCell>
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
                              <Settings className="mr-2 h-4 w-4" />
                              Edit Organization
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Users
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Organization
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredOrganizations.length}</span> of{" "}
              <span className="font-medium">{organizations.length}</span> organizations
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredOrganizations.length === organizations.length}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredOrganizations.length === organizations.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}