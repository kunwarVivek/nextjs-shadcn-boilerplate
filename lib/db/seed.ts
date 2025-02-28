import { getDbConnection } from "./index";
import { users, organizations, teams, teamLeads, subscriptions, invoices, auditLogs, organizationMembers } from "./schema";
import fs from "fs";
import path from "path";

async function seed() {
  console.log("🌱 Seeding database...");

  // Get database connection
  const db = await getDbConnection();

  // Clear existing data
  try {
    await db.delete(organizationMembers);
    await db.delete(auditLogs);
    await db.delete(invoices);
    await db.delete(subscriptions);
    await db.delete(teamLeads);
    await db.delete(teams);
    await db.delete(users);
    await db.delete(organizations);

    console.log("✅ Cleared existing data");
  } catch (error) {
    console.log("Tables don't exist yet, continuing with seeding...");
  }

  // Seed organizations
  const organizationsData = [
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

  await db.insert(organizations).values(organizationsData);
  console.log(`✅ Inserted ${organizationsData.length} organizations`);

  // Seed users
  const usersData = [
    {
      id: "1",
      name: "John Doe",
      email: "john@acme.com",
      role: "Admin",
      organization: "Acme Inc.",
      status: "Active",
      lastActive: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "2",
      name: "Sarah Davis",
      email: "sarah@globex.com",
      role: "Manager",
      organization: "Globex Corp",
      status: "Active",
      lastActive: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "3",
      name: "Michael Robinson",
      email: "michael@soylent.com",
      role: "User",
      organization: "Soylent Corp",
      status: "Inactive",
      lastActive: "2 days ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "4",
      name: "Alicia Johnson",
      email: "alicia@initech.com",
      role: "Admin",
      organization: "Initech",
      status: "Active",
      lastActive: "Just now",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david@umbrella.com",
      role: "User",
      organization: "Umbrella Corp",
      status: "Active",
      lastActive: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "6",
      name: "Emily Chen",
      email: "emily@massive.com",
      role: "Manager",
      organization: "Massive Dynamic",
      status: "Active",
      lastActive: "3 hours ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "7",
      name: "Robert Smith",
      email: "robert@wayne.com",
      role: "User",
      organization: "Wayne Enterprises",
      status: "Suspended",
      lastActive: "1 week ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  await db.insert(users).values(usersData);
  console.log(`✅ Inserted ${usersData.length} users`);

  // Seed teams
  const teamsData = [
    {
      id: "1",
      name: "Engineering",
      description: "Product development and engineering team",
      members: 12,
      organization: "Acme Inc.",
      leadId: "1",
      createdAt: "Jan 15, 2023",
    },
    {
      id: "2",
      name: "Marketing",
      description: "Brand, content, and growth marketing",
      members: 8,
      organization: "Acme Inc.",
      leadId: "2",
      createdAt: "Feb 3, 2023",
    },
    {
      id: "3",
      name: "Sales",
      description: "Enterprise sales and customer success",
      members: 15,
      organization: "Acme Inc.",
      leadId: "3",
      createdAt: "Jan 22, 2023",
    },
    {
      id: "4",
      name: "Product",
      description: "Product management and design",
      members: 7,
      organization: "Acme Inc.",
      leadId: "4",
      createdAt: "Mar 10, 2023",
    },
    {
      id: "5",
      name: "Finance",
      description: "Accounting and financial operations",
      members: 5,
      organization: "Acme Inc.",
      leadId: "5",
      createdAt: "Apr 5, 2023",
    },
    {
      id: "6",
      name: "Customer Support",
      description: "Technical support and customer service",
      members: 10,
      organization: "Acme Inc.",
      leadId: "6",
      createdAt: "Feb 18, 2023",
    },
  ];

  await db.insert(teams).values(teamsData);
  console.log(`✅ Inserted ${teamsData.length} teams`);

  // Seed team leads
  const teamLeadsData = [
    {
      id: "1",
      teamId: "1",
      userId: "1",
      name: "John Doe",
      email: "john@acme.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "2",
      teamId: "2",
      userId: "2",
      name: "Sarah Davis",
      email: "sarah@acme.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "3",
      teamId: "3",
      userId: "3",
      name: "Michael Robinson",
      email: "michael@acme.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "4",
      teamId: "4",
      userId: "4",
      name: "Alicia Johnson",
      email: "alicia@acme.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "5",
      teamId: "5",
      userId: "5",
      name: "David Wilson",
      email: "david@acme.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "6",
      teamId: "6",
      userId: "6",
      name: "Emily Chen",
      email: "emily@acme.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  await db.insert(teamLeads).values(teamLeadsData);
  console.log(`✅ Inserted ${teamLeadsData.length} team leads`);

  // Seed subscriptions
  const subscriptionsData = [
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

  await db.insert(subscriptions).values(subscriptionsData);
  console.log(`✅ Inserted ${subscriptionsData.length} subscriptions`);

  // Seed invoices
  const invoicesData = [
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

  await db.insert(invoices).values(invoicesData);
  console.log(`✅ Inserted ${invoicesData.length} invoices`);

  // Seed audit logs
  const auditLogsData = [
    {
      id: "1",
      userId: "1",
      userName: "John Doe",
      userEmail: "john@acme.com",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      action: "User Login",
      resource: "Authentication",
      ipAddress: "192.168.1.1",
      timestamp: "2023-07-15 09:23:45",
      status: "Success",
      severity: "Info",
    },
    {
      id: "2",
      userId: "2",
      userName: "Sarah Davis",
      userEmail: "sarah@globex.com",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      action: "Create User",
      resource: "User Management",
      ipAddress: "192.168.1.2",
      timestamp: "2023-07-15 10:15:22",
      status: "Success",
      severity: "Info",
    },
    {
      id: "3",
      userId: "3",
      userName: "Michael Robinson",
      userEmail: "michael@soylent.com",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      action: "Update Subscription",
      resource: "Subscription Management",
      ipAddress: "192.168.1.3",
      timestamp: "2023-07-15 11:05:17",
      status: "Success",
      severity: "Info",
    },
    {
      id: "4",
      userId: "4",
      userName: "Alicia Johnson",
      userEmail: "alicia@initech.com",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      action: "Failed Login Attempt",
      resource: "Authentication",
      ipAddress: "192.168.1.4",
      timestamp: "2023-07-15 12:45:33",
      status: "Failed",
      severity: "Warning",
    },
    {
      id: "5",
      userId: "5",
      userName: "David Wilson",
      userEmail: "david@umbrella.com",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      action: "Delete User",
      resource: "User Management",
      ipAddress: "192.168.1.5",
      timestamp: "2023-07-15 13:22:18",
      status: "Success",
      severity: "Warning",
    },
    {
      id: "6",
      userId: "6",
      userName: "Emily Chen",
      userEmail: "emily@massive.com",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      action: "API Key Created",
      resource: "API Management",
      ipAddress: "192.168.1.6",
      timestamp: "2023-07-15 14:10:05",
      status: "Success",
      severity: "Info",
    },
    {
      id: "7",
      userId: "0",
      userName: "System",
      userEmail: "system@enterprise-saas.com",
      userAvatar: "",
      action: "Database Backup",
      resource: "System",
      ipAddress: "192.168.1.7",
      timestamp: "2023-07-15 15:00:00",
      status: "Success",
      severity: "Info",
    },
    {
      id: "8",
      userId: "7",
      userName: "Robert Smith",
      userEmail: "robert@wayne.com",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      action: "Unauthorized Access Attempt",
      resource: "Organization Settings",
      ipAddress: "192.168.1.8",
      timestamp: "2023-07-15 16:30:45",
      status: "Failed",
      severity: "Critical",
    },
  ];

  await db.insert(auditLogs).values(auditLogsData);
  console.log(`✅ Inserted ${auditLogsData.length} audit logs`);

  // Seed organization members
  const organizationMembersData = [
    {
      id: "1",
      name: "John Doe",
      email: "john@acme.com",
      role: "Admin",
      department: "Engineering",
      status: "Active",
      lastActive: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      organizationId: "1",
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
      organizationId: "1",
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
      organizationId: "1",
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
      organizationId: "1",
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
      organizationId: "1",
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
      organizationId: "1",
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
      organizationId: "1",
    },
  ];

  await db.insert(organizationMembers).values(organizationMembersData);
  console.log(`✅ Inserted ${organizationMembersData.length} organization members`);

  console.log("✅ Database seeded successfully!");
}

seed().catch((e) => {
  console.error("Error seeding database:", e);
  process.exit(1);
});