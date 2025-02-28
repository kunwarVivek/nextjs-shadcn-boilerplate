"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  ChevronDown, 
  Download, 
  Filter, 
  Grid3X3, 
  LayoutDashboard, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Settings, 
  Trash, 
  UserPlus, 
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Sample team data
const teams = [
  {
    id: "1",
    name: "Engineering",
    description: "Product development and engineering team",
    members: 12,
    organization: "Acme Inc.",
    lead: {
      name: "John Doe",
      email: "john@acme.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    createdAt: "Jan 15, 2023",
  },
  {
    id: "2",
    name: "Marketing",
    description: "Brand, content, and growth marketing",
    members: 8,
    organization: "Acme Inc.",
    lead: {
      name: "Sarah Davis",
      email: "sarah@acme.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    createdAt: "Feb 3, 2023",
  },
  {
    id: "3",
    name: "Sales",
    description: "Enterprise sales and customer success",
    members: 15,
    organization: "Acme Inc.",
    lead: {
      name: "Michael Robinson",
      email: "michael@acme.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    createdAt: "Jan 22, 2023",
  },
  {
    id: "4",
    name: "Product",
    description: "Product management and design",
    members: 7,
    organization: "Acme Inc.",
    lead: {
      name: "Alicia Johnson",
      email: "alicia@acme.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    createdAt: "Mar 10, 2023",
  },
  {
    id: "5",
    name: "Finance",
    description: "Accounting and financial operations",
    members: 5,
    organization: "Acme Inc.",
    lead: {
      name: "David Wilson",
      email: "david@acme.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    createdAt: "Apr 5, 2023",
  },
  {
    id: "6",
    name: "Customer Support",
    description: "Technical support and customer service",
    members: 10,
    organization: "Acme Inc.",
    lead: {
      name: "Emily Chen",
      email: "emily@acme.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    createdAt: "Feb 18, 2023",
  },
];

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddTeamDialogOpen, setIsAddTeamDialogOpen] = useState(false);
  
  // Filter teams based on search term
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeam = () => {
    toast.success("Team added successfully");
    setIsAddTeamDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Teams</h2>
            <p className="text-muted-foreground">
              Manage teams and team members across your organization
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Dialog open={isAddTeamDialogOpen} onOpenChange={setIsAddTeamDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Grid3X3 className="mr-2 h-4 w-4" />
                  Add Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Team</DialogTitle>
                  <DialogDescription>
                    Create a new team in your organization.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="team-name" className="text-right">
                      Name
                    </Label>
                    <Input id="team-name" placeholder="Team name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="team-description" className="text-right">
                      Description
                    </Label>
                    <Input id="team-description" placeholder="Team description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="team-lead" className="text-right">
                      Team Lead
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select team lead" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="sarah">Sarah Davis</SelectItem>
                        <SelectItem value="michael">Michael Robinson</SelectItem>
                        <SelectItem value="alicia">Alicia Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="organization" className="text-right">
                      Organization
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select organization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acme">Acme Inc.</SelectItem>
                        <SelectItem value="globex">Globex Corp</SelectItem>
                        <SelectItem value="soylent">Soylent Corp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddTeamDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTeam}>Add Team</Button>
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
                  placeholder="Search teams..."
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
                  <DropdownMenuItem>Organization</DropdownMenuItem>
                  <DropdownMenuItem>Team Lead</DropdownMenuItem>
                  <DropdownMenuItem>Created Date</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
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
                  <TableHead>Team</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Team Lead</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No teams found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium">{team.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {team.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{team.members}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={team.lead.avatar} />
                            <AvatarFallback>{team.lead.name.charAt(0)}{team.lead.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{team.lead.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {team.lead.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span>{team.organization}</span>
                        </div>
                      </TableCell>
                      <TableCell>{team.createdAt}</TableCell>
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
                              Edit Team
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Add Members
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Team
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
              Showing <span className="font-medium">{filteredTeams.length}</span> of{" "}
              <span className="font-medium">{teams.length}</span> teams
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredTeams.length === teams.length}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredTeams.length === teams.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}