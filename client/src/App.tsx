import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

import Layout from "@/components/Layout";

// Pages
import HomePage from "@/pages/home-page";
import FeaturesPage from "@/pages/features-page";
import HowItWorksPage from "@/pages/how-it-works-page";
import BookingPage from "@/pages/booking-page";
import DashboardPage from "@/pages/dashboard-page";
import AboutPage from "@/pages/about-page";
import ContactPage from "@/pages/contact-page";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/features" component={FeaturesPage} />
        <Route path="/how-it-works" component={HowItWorksPage} />
        <ProtectedRoute path="/booking" component={BookingPage} />
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/auth" component={AuthPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
