"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Building2, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const companyFormSchema = z.object({
  companySize: z.string({
    required_error: "Please select your company size",
  }),
  industry: z.string({
    required_error: "Please select your industry",
  }),
  companyDescription: z.string().optional(),
});

const teamFormSchema = z.object({
  teamName: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  teamSize: z.string({
    required_error: "Please select your team size",
  }),
  teamDescription: z.string().optional(),
});

const domainFormSchema = z.object({
  domain: z.string().optional(),
  subdomain: z.string().min(3, {
    message: "Subdomain must be at least 3 characters.",
  }),
});

export default function OnboardingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("company");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companySize: "",
      industry: "",
      companyDescription: "",
    },
  });
  
  const teamForm = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      teamName: "",
      teamSize: "",
      teamDescription: "",
    },
  });
  
  const domainForm = useForm<z.infer<typeof domainFormSchema>>({
    resolver: zodResolver(domainFormSchema),
    defaultValues: {
      domain: "",
      subdomain: "",
    },
  });

  function onCompanySubmit(values: z.infer<typeof companyFormSchema>) {
    console.log(values);
    setActiveTab("team");
  }
  
  function onTeamSubmit(values: z.infer<typeof teamFormSchema>) {
    console.log(values);
    setActiveTab("domain");
  }
  
  function onDomainSubmit(values: z.infer<typeof domainFormSchema>) {
    console.log(values);
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Onboarding completed successfully");
      router.push("/dashboard");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="font-bold text-xl">EnterpriseSaaS</span>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Set up your organization</h1>
            <p className="text-muted-foreground mt-2">
              Let's get your organization set up for success
            </p>
          </div>
          
          <div className="bg-card rounded-lg border shadow-xs p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="company" disabled={activeTab !== "company" && activeTab !== "team" && activeTab !== "domain"}>
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${activeTab === "company" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {activeTab === "team" || activeTab === "domain" ? <Check className="h-4 w-4" /> : "1"}
                    </div>
                    Company
                  </div>
                </TabsTrigger>
                <TabsTrigger value="team" disabled={activeTab !== "team" && activeTab !== "domain"}>
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${activeTab === "team" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {activeTab === "domain" ? <Check className="h-4 w-4" /> : "2"}
                    </div>
                    Team
                  </div>
                </TabsTrigger>
                <TabsTrigger value="domain" disabled={activeTab !== "domain"}>
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${activeTab === "domain" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      3
                    </div>
                    Domain
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="company">
                <Form {...companyForm}>
                  <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-6">
                    <FormField
                      control={companyForm.control}
                      name="companySize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-500">201-500 employees</SelectItem>
                              <SelectItem value="501-1000">501-1000 employees</SelectItem>
                              <SelectItem value="1000+">1000+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={companyForm.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={companyForm.control}
                      name="companyDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your company"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This will help us customize your experience.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        Continue
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="team">
                <Form {...teamForm}>
                  <form onSubmit={teamForm.handleSubmit(onTeamSubmit)} className="space-y-6">
                    <FormField
                      control={teamForm.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Engineering, Marketing, etc." {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be your first team in the organization.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teamForm.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-5">1-5 members</SelectItem>
                              <SelectItem value="6-10">6-10 members</SelectItem>
                              <SelectItem value="11-25">11-25 members</SelectItem>
                              <SelectItem value="26-50">26-50 members</SelectItem>
                              <SelectItem value="50+">50+ members</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teamForm.control}
                      name="teamDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What does this team do?"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setActiveTab("company")}
                      >
                        Back
                      </Button>
                      <Button type="submit">
                        Continue
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="domain">
                <Form {...domainForm}>
                  <form onSubmit={domainForm.handleSubmit(onDomainSubmit)} className="space-y-6">
                    <FormField
                      control={domainForm.control}
                      name="subdomain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subdomain</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input placeholder="your-company" {...field} />
                              <div className="flex items-center bg-muted px-3 rounded-r-md border border-l-0">
                                .enterprise-saas.com
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            This will be your organization's URL.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={domainForm.control}
                      name="domain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Domain (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="app.yourcompany.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            You can set up a custom domain later.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setActiveTab("team")}
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Completing setup...
                          </>
                        ) : (
                          "Complete Setup"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}