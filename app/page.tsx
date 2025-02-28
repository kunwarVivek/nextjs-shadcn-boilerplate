import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Building2, CreditCard, Lock, Shield, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="font-bold text-xl">EnterpriseSaaS</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Enterprise Management, Simplified
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            A comprehensive B2B SaaS platform designed to streamline your organization's operations, 
            enhance team collaboration, and drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Comprehensive Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="text-muted-foreground">
                Complete user CRUD operations with role-based access control, authentication, and activity logging.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organization Management</h3>
              <p className="text-muted-foreground">
                Multi-tenant architecture with organization hierarchy management and custom domain mapping.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Subscription Management</h3>
              <p className="text-muted-foreground">
                Multiple subscription tiers with usage tracking, automated invoicing, and payment processing.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Reporting</h3>
              <p className="text-muted-foreground">
                Comprehensive analytics with custom report generation and data export capabilities.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Audit System</h3>
              <p className="text-muted-foreground">
                Complete audit trails with activity logs, compliance tracking, and security monitoring.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">White-labeling</h3>
              <p className="text-muted-foreground">
                Customizable branding, themes, and enterprise-specific features for a tailored experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Enterprise?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of organizations that have streamlined their operations with our platform.
          </p>
          <Link href="/register">
            <Button size="lg">Get Started Today</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-5 w-5" />
                <span className="font-bold text-lg">EnterpriseSaaS</span>
              </div>
              <p className="text-muted-foreground">
                Comprehensive B2B SaaS solution for enterprise management.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="/integrations" className="text-muted-foreground hover:text-foreground">Integrations</Link></li>
                <li><Link href="/roadmap" className="text-muted-foreground hover:text-foreground">Roadmap</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/documentation" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                <li><Link href="/api" className="text-muted-foreground hover:text-foreground">API Reference</Link></li>
                <li><Link href="/guides" className="text-muted-foreground hover:text-foreground">Guides</Link></li>
                <li><Link href="/support" className="text-muted-foreground hover:text-foreground">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link href="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EnterpriseSaaS. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}