/**
 * EDGERACK Cooling Unit Control System - Main Application Component
 * 
 * This is the root React component that sets up the entire application architecture.
 * It configures routing, authentication, data fetching, and UI providers to create
 * a complete industrial monitoring dashboard for EDGERACK cooling units.
 */

import { Switch, Route } from "wouter";                    // Lightweight routing for SPA navigation
import { queryClient } from "./lib/queryClient";           // TanStack Query client for server state
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";         // Toast notifications for user feedback
import { TooltipProvider } from "@/components/ui/tooltip"; // Tooltip provider for enhanced UX
import { AuthProvider } from "@/hooks/use-auth";           // Authentication context and state
import SiteNavigation from "@/components/SiteNavigation";  // Main navigation header component

// Page components for the five main application routes
import HomeView from "@/pages/HomeView";      // Dashboard and real-time monitoring
import AdminView from "@/pages/AdminView";    // User administration and settings
import CoolingView from "@/pages/CoolingView"; // Detailed cooling unit readings
import ConfigView from "@/pages/ConfigView";  // Network and system configuration
import UpgradeView from "@/pages/UpgradeView"; // System upgrade management
import NotFound from "@/pages/not-found";     // 404 fallback page

/**
 * Router Component
 * 
 * Handles client-side routing and provides the overall layout structure.
 * The dark theme (bg-gray-900) matches the industrial EDGERACK aesthetic
 * and provides optimal contrast for monitoring displays in data center environments.
 */
function Router() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Site navigation header - always visible across all pages */}
      <SiteNavigation />
      
      {/* Main routing configuration for the five system pages */}
      <Switch>
        <Route path="/" component={HomeView} />          {/* Default: Dashboard overview */}
        <Route path="/user" component={AdminView} />     {/* Admin/User management */}
        <Route path="/cooling" component={CoolingView} /> {/* Detailed cooling data */}
        <Route path="/config" component={ConfigView} />  {/* System configuration */}
        <Route path="/upgrade" component={UpgradeView} /> {/* System upgrades */}
        <Route component={NotFound} />                   {/* 404 fallback */}
      </Switch>
    </div>
  );
}

/**
 * Main App Component
 * 
 * Sets up the complete application provider hierarchy and context management.
 * This structure ensures proper data flow, authentication state, and UI consistency
 * throughout the entire cooling unit monitoring application.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Tooltip provider enables hover information throughout the app */}
      <TooltipProvider>
        {/* Authentication context manages login state and user sessions */}
        <AuthProvider>
          {/* Toast notifications for user feedback on actions */}
          <Toaster />
          {/* Main application routing and page content */}
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
