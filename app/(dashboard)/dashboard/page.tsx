"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Building2, 
  CreditCard, 
  FileText, 
  Grid3X3, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Settings, 
  Users, 
  X 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const areaChartData = [
  { name: "Jan", users: 400, sessions: 240 },
  { name: "Feb", users: 300, sessions: 139 },
  { name: "Mar", users: 200, sessions: 980 },
  { name: "Apr", users: 278, sessions: 390 },
  { name: "May", users: 189, sessions: 480 },
  { name: "Jun", users: 239, sessions: 380 },
  { name: "Jul", users: 349, sessions: 430 },
];

const barChartData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 40 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 50 },
  { name: "Fri", value: 45 },
  { name: "Sat", value: 25 },
  { name: "Sun", value: 15 },
];

const pieChartData = [
  { name: "Admin", value: 400 },
  { name: "Manager", value: 300 },
  { name: "User", value: 300 },
  { name: "Guest", value: 200 },
];

const userActivityData = [
  { name: "Jan", users: 400, sessions: 240 },
  { name: "Feb", users: 300, sessions: 139 },
  { name: "Mar", users: 200, sessions: 980 },
  { name: "Apr", users: 278, sessions: 390 },
  { name: "May", users: 189, sessions: 480 },
  { name: "Jun", users: 239, sessions: 380 },
  { name: "Jul", users: 349, sessions: 430 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState("platform-admin"); // Options: "platform-admin", "org-admin", "org-user"

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              <span className="font-bold text-xl">EnterpriseSaaS</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Main
              </h2>
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-md bg-accent px-4 py-2 text-accent-foreground"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/users"
                  className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </Link>
                {userRole !== "org-user" && (
                  <Link
                    href="/dashboard/organizations"
                    className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <Building2 className="h-5 w-5" />
                    <span>Organizations</span>
                  </Link>
                )}
                {userRole !== "org-user" && (
                  <Link
                    href="/dashboard/subscriptions"
                    className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Subscriptions</span>
                  </Link>
                )}
                <Link
                  href="/dashboard/analytics"
                  className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Administration
              </h2>
              <div className="space-y-1">
                <Link
                  href="/dashboard/teams"
                  className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Grid3X3 className="h-5 w-5" />
                  <span>Teams</span>
                </Link>
                {userRole !== "org-user" && (
                  <Link
                    href="/dashboard/audit"
                    className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Audit Logs</span>
                  </Link>
                )}
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
            
            {/* Role Switcher (for demo purposes) */}
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Demo Controls
              </h2>
              <div className="space-y-1 px-4">
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="platform-admin">Platform Admin View</option>
                  <option value="org-admin">Organization Admin View</option>
                  <option value="org-user">Organization User View</option>
                </select>
              </div>
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@acme.com</p>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                <span className="font-bold text-xl">EnterpriseSaaS</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-auto py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Main
                </h2>
                <div className="space-y-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-md bg-accent px-4 py-2 text-accent-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/dashboard/users"
                    className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Users className="h-5 w-5" />
                    <span>Users</span>
                  </Link>
                  {userRole !== "org-user" && (
                    <Link
                      href="/dashboard/organizations"
                      className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Building2 className="h-5 w-5" />
                      <span>Organizations</span>
                    </Link>
                  )}
                  {userRole !== "org-user" && (
                    <Link
                      href="/dashboard/subscriptions"
                      className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Subscriptions</span>
                    </Link>
                  )}
                  <Link
                    href="/dashboard/analytics"
                    className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Analytics</span>
                  </Link>
                </div>
              </div>
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Administration
                </h2>
                <div className="space-y-1">
                  <Link
                    href="/dashboard/teams"
                    className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Grid3X3 className="h-5 w-5" />
                    <span>Teams</span>
                  </Link>
                  {userRole !== "org-user" && (
                    <Link
                      href="/dashboard/audit"
                      className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FileText className="h-5 w-5" />
                      <span>Audit Logs</span>
                    </Link>
                  )}
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 rounded-md px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>
              
              {/* Role Switcher (for demo purposes) */}
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Demo Controls
                </h2>
                <div className="space-y-1 px-4">
                  <select 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <option value="platform-admin">Platform Admin View</option>
                    <option value="org-admin">Organization Admin View</option>
                    <option value="org-user">Organization User View</option>
                  </select>
                </div>
              </div>
            </nav>
            <div className="border-t p-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john@acme.com</p>
                </div>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {/* Role-specific welcome message */}
          <div className="mb-6 bg-card p-4 rounded-lg border shadow-xs">
            {userRole === "platform-admin" && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Platform Administrator View</h2>
                  <p className="text-muted-foreground">You have full access to all organizations and platform settings</p>
                </div>
              </div>
            )}
            {userRole === "org-admin" && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Organization Administrator View</h2>
                  <p className="text-muted-foreground">You have full access to manage Acme Inc. organization settings and users</p>
                </div>
              </div>
            )}
            {userRole === "org-user" && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Organization User View</h2>
                  <p className="text-muted-foreground">You have limited access to Acme Inc. organization resources</p>
                </div>
              </div>
            )}
          </div>

          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "platform-admin" ? "1,248" : "42"}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {userRole === "platform-admin" ? "Active Organizations" : "Active Teams"}
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "platform-admin" ? "42" : "6"}
                </div>
                <p className="text-xs text-muted-foreground">
                  +4.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {userRole === "platform-admin" ? "Monthly Revenue" : "Monthly Usage"}
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "platform-admin" ? "$24,389" : "78%"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {userRole === "platform-admin" ? "+18.2% from last month" : "of your allocation"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRole === "platform-admin" ? "573" : "28"}
                </div>
                <p className="text-xs text-muted-foreground">
                  +7.4% from last hour
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>
                  User and session activity over the past 7 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={userActivityData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="users" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="sessions" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>
                  {userRole === "platform-admin" ? "User Roles Distribution" : "Team Members Distribution"}
                </CardTitle>
                <CardDescription>
                  {userRole === "platform-admin" ? "Distribution of users by role" : "Distribution of members by role"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <div className="mt-6">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {userRole === "platform-admin" ? "Subscription Usage" : "Resource Usage"}
                      </CardTitle>
                      <CardDescription>
                        {userRole === "platform-admin" 
                          ? "Current usage across all subscriptions" 
                          : "Current usage of allocated resources"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>API Calls</div>
                          <div className="font-medium">78%</div>
                        </div>
                        <Progress value={78} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>Storage</div>
                          <div className="font-medium">45%</div>
                        </div>
                        <Progress value={45} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>User Seats</div>
                          <div className="font-medium">
                            {userRole === "platform-admin" ? "92%" : "42%"}
                          </div>
                        </div>
                        <Progress value={userRole === "platform-admin" ? 92 : 42} />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Activity</CardTitle>
                      <CardDescription>
                        User activity for the current week
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Latest actions across the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                            <AvatarFallback>SD</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Sarah Davis
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Created a new team: Engineering
                            </p>
                            <p className="text-xs text-muted-foreground">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                            <AvatarFallback>MR</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Michael Robinson
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {userRole === "platform-admin" 
                                ? "Upgraded subscription to Enterprise" 
                                : "Updated project timeline"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              5 hours ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Alicia Johnson
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {userRole === "platform-admin" 
                                ? "Added 5 new users to Marketing team" 
                                : "Commented on sales report"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Yesterday
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Analytics</CardTitle>
                    <CardDescription>
                      Comprehensive analytics data will be displayed here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-[400px] items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Detailed analytics dashboard coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Reports</CardTitle>
                    <CardDescription>
                      Access and download your custom reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-[400px] items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Report generation module coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}