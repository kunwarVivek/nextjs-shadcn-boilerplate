"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Building2, 
  Calendar, 
  Check, 
  CreditCard, 
  Download, 
  FileText, 
  LayoutDashboard, 
  MoreHorizontal, 
  Search, 
  X 
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Sample subscription data
const subscriptions = [
  {
    id: "1",
    organization: "Acme Inc.",
    plan: "Enterprise",
    status: "Active",
    amount: "$999.00",
    billingCycle: "Monthly",
    nextBilling: "Jul 15, 2023",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "2",
    organization: "Globex Corp",
    plan: "Business",
    status: "Active",
    amount: "$499.00",
    billingCycle: "Monthly",
    nextBilling: "Jul 22, 2023",
    paymentMethod: "Mastercard ending in 5555",
  },
  {
    id: "3",
    organization: "Soylent Corp",
    plan: "Business",
    status: "Past Due",
    amount: "$499.00",
    billingCycle: "Monthly",
    nextBilling: "Jul 10, 2023",
    paymentMethod: "Visa ending in 1234",
  },
  {
    id: "4",
    organization: "Initech",
    plan: "Enterprise",
    status: "Active",
    amount: "$9,999.00",
    billingCycle: "Annually",
    nextBilling: "Jan 8, 2024",
    paymentMethod: "American Express ending in 9876",
  },
  {
    id: "5",
    organization: "Umbrella Corp",
    plan: "Starter",
    status: "Active",
    amount: "$99.00",
    billingCycle: "Monthly",
    nextBilling: "Jul 19, 2023",
    paymentMethod: "Visa ending in 6789",
  },
  {
    id: "6",
    organization: "Massive Dynamic",
    plan: "Business",
    status: "Canceled",
    amount: "$499.00",
    billingCycle: "Monthly",
    nextBilling: "N/A",
    paymentMethod: "Mastercard ending in 4321",
  },
];

// Sample invoices data
const invoices = [
  {
    id: "INV-001",
    organization: "Acme Inc.",
    amount: "$999.00",
    status: "Paid",
    date: "Jun 15, 2023",
  },
  {
    id: "INV-002",
    organization: "Globex Corp",
    amount: "$499.00",
    status: "Paid",
    date: "Jun 22, 2023",
  },
  {
    id: "INV-003",
    organization: "Soylent Corp",
    amount: "$499.00",
    status: "Unpaid",
    date: "Jun 10, 2023",
  },
  {
    id: "INV-004",
    organization: "Acme Inc.",
    amount: "$999.00",
    status: "Paid",
    date: "May 15, 2023",
  },
  {
    id: "INV-005",
    organization: "Globex Corp",
    amount: "$499.00",
    status: "Paid",
    date: "May 22, 2023",
  },
  {
    id: "INV-006",
    organization: "Umbrella Corp",
    amount: "$99.00",
    status: "Paid",
    date: "Jun 19, 2023",
  },
  {
    id: "INV-007",
    organization: "Massive Dynamic",
    amount: "$499.00",
    status: "Refunded",
    date: "Jun 3, 2023",
  },
];

// Subscription plans
const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$99",
    description: "Perfect for small teams just getting started",
    features: [
      "Up to 5 users",
      "Basic analytics",
      "Standard support",
      "1GB storage",
      "API access (100 req/day)",
    ],
    recommended: false,
  },
  {
    id: "business",
    name: "Business",
    price: "$499",
    description: "For growing businesses with advanced needs",
    features: [
      "Up to 20 users",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "API access (1,000 req/day)",
      "Custom domains",
      "Team management",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$999",
    description: "For large organizations with complex requirements",
    features: [
      "Unlimited users",
      "Enterprise analytics",
      "24/7 dedicated support",
      "Unlimited storage",
      "Unlimited API access",
      "Custom domains",
      "Advanced team management",
      "SSO integration",
      "Custom branding",
      "Dedicated account manager",
    ],
    recommended: false,
  },
];

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("subscriptions");
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  
  // Filter subscriptions based on search term
  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpgradeSubscription = () => {
    toast.success("Subscription upgraded successfully");
    setIsUpgradeDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Subscriptions</h2>
            <p className="text-muted-foreground">
              Manage subscription plans and billing
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscriptions" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search subscriptions..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Billing Cycle</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No subscriptions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                              <Building2 className="h-4 w-4 text-primary" />
                            </div>
                            <div className="font-medium">{sub.organization}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              sub.plan === "Enterprise"
                                ? "default"
                                : sub.plan === "Business"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {sub.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>{sub.amount}</TableCell>
                        <TableCell>{sub.billingCycle}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{sub.nextBilling}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              sub.status === "Active"
                                ? "default"
                                : sub.status === "Past Due"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {sub.status}
                          </Badge>
                        </TableCell>
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
                              <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                    Upgrade Plan
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Upgrade Subscription</DialogTitle>
                                    <DialogDescription>
                                      Upgrade the subscription plan for {sub.organization}.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      {plans.map((plan) => (
                                        <div
                                          key={plan.id}
                                          className={`rounded-lg border p-4 ${
                                            plan.name === sub.plan
                                              ? "border-primary bg-primary/5"
                                              : ""
                                          }`}
                                        >
                                          <div className="mb-2 flex items-center justify-between">
                                            <h3 className="font-medium">{plan.name}</h3>
                                            {plan.name === sub.plan && (
                                              <Badge variant="outline">Current</Badge>
                                            )}
                                          </div>
                                          <p className="text-2xl font-bold">{plan.price}</p>
                                          <p className="text-sm text-muted-foreground">
                                            per month
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsUpgradeDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleUpgradeSubscription}>
                                      Upgrade Subscription
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Update Payment Method
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Invoices
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <X className="mr-2 h-4 w-4" />
                                Cancel Subscription
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
          </TabsContent>
          
          <TabsContent value="invoices" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No invoices found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <div className="font-medium">{invoice.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                              <Building2 className="h-4 w-4 text-primary" />
                            </div>
                            <div>{invoice.organization}</div>
                          </div>
                        </TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{invoice.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invoice.status === "Paid"
                                ? "default"
                                : invoice.status === "Unpaid"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="plans" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.id} className={plan.recommended ? "border-primary" : ""}>
                  {plan.recommended && (
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Recommended
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground"> /month</span>
                    </div>
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" variant={plan.recommended ? "default" : "outline"}>
                      {plan.recommended ? "Get Started" : "Learn More"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}