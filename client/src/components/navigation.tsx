import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { LoginModal } from "./login-modal";

export function Navigation() {
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="navbar-brand">EDGERACK</span>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a href="#" className="text-white hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                  <a href="#" className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    RCU View
                  </a>
                  <a href="#" className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Network
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="text-slate-300 hover:bg-slate-700 hover:text-white"
                onClick={() => setShowLoginModal(true)}
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
}
