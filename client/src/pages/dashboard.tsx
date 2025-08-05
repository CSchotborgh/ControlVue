import { Navigation } from "@/components/navigation";
import { CoolingUnit } from "@/components/cooling-unit";
import { RCUView } from "@/components/rcu-view";
import { NetworkView } from "@/components/network-view";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { isLoggedIn, toggleLogin } = useAuth();

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Login Status Display */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={toggleLogin}
            >
              Toggle Log In State
            </Button>
            <div className="text-sm text-slate-300">
              Status: <span className="font-medium text-white">{isLoggedIn ? 'Logged In' : 'Logged Out'}</span>
            </div>
          </div>
        </div>

        <CoolingUnit />
        <RCUView />
        <NetworkView />
      </div>
    </div>
  );
}
