import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import SiteNavigation from "@/components/SiteNavigation";
import HomeView from "@/pages/HomeView";
import RCUView from "@/pages/RCUView";
import NetworkView from "@/pages/NetworkView";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <SiteNavigation />
      <Switch>
        <Route path="/" component={HomeView} />
        <Route path="/rcu" component={RCUView} />
        <Route path="/network" component={NetworkView} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
