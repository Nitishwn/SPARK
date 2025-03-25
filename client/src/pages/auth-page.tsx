import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'wouter';
import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { insertUserSchema } from '@shared/schema';
import { Car, Lock, Shield } from 'lucide-react';

// Extend schemas for form validation
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Use the existing insertUserSchema but add confirmation
const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");

  // Redirect if already logged in
  if (user) {
    return <Redirect to={user.isAdmin ? "/admin" : "/dashboard"} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Form Column */}
              <div>
                <Tabs 
                  defaultValue="login" 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <Card>
                      <CardHeader>
                        <CardTitle>Welcome Back</CardTitle>
                        <CardDescription>
                          Sign in to access your SPARK dashboard
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <LoginForm />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <Card>
                      <CardHeader>
                        <CardTitle>Create an Account</CardTitle>
                        <CardDescription>
                          Join SPARK and revolutionize your parking experience
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RegisterForm setActiveTab={setActiveTab} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Hero Column */}
              <div className="bg-primary text-white rounded-xl p-8 hidden md:block">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-6">Transform Your Parking Experience</h2>
                  <p className="mb-8">
                    SPARK uses cutting-edge AI and IoT technology to make finding, booking, and navigating 
                    to parking spots effortless.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-white/20 p-2 rounded-full mr-4">
                        <Car className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Real-time Spot Detection</h3>
                        <p className="text-sm text-white/80">
                          Find available parking spots instantly with our smart sensors network
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-white/20 p-2 rounded-full mr-4">
                        <Shield className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Enhanced Security</h3>
                        <p className="text-sm text-white/80">
                          Camera monitoring and instant alerts ensure your vehicle stays safe
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-white/20 p-2 rounded-full mr-4">
                        <Lock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Guaranteed Spots</h3>
                        <p className="text-sm text-white/80">
                          Book in advance and secure your parking space before arrival
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-6">
                  <p className="text-sm text-white/80 mb-4">
                    Join thousands of satisfied SPARK users across 50+ cities
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div 
                          key={i}
                          className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-xs font-medium"
                        >
                          {['JD', 'AK', 'MT', 'RB'][i-1]}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <strong>10,000+</strong> active users
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function LoginForm() {
  const { loginMutation } = useAuth();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder="Enter your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}

interface RegisterFormProps {
  setActiveTab: (tab: string) => void;
}

function RegisterForm({ setActiveTab }: RegisterFormProps) {
  const { registerMutation } = useAuth();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      isAdmin: false,
    },
  });
  
  function onSubmit(values: RegisterFormValues) {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = values;
    registerMutation.mutate(userData, {
      onSuccess: () => {
        // Switch to login tab on successful registration
        setActiveTab("login");
      }
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your full name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Choose a username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="Create a password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="Confirm your password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
