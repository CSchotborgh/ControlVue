import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import UserLoginModal from './UserLoginModal';

export default function SiteNavigation() {
  const [location] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="navbar-brand">
                  EDGERACK
                </span>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <Link 
                    href="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/') 
                        ? 'text-white bg-gray-700 font-bold' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/cooling"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/cooling') 
                        ? 'text-white bg-gray-700 font-bold' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Cooling Unit
                  </Link>
                  <Link 
                    href="/user"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/user') 
                        ? 'text-white bg-gray-700 font-bold' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Admin
                  </Link>
                  <Link 
                    href="/config"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/config') 
                        ? 'text-white bg-gray-700 font-bold' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Config
                  </Link>
                  <Link 
                    href="/upgrade"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/upgrade') 
                        ? 'text-white bg-gray-700 font-bold' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Upgrade
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => setShowLoginModal(true)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'text-white bg-gray-700 font-bold' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/cooling"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/cooling') 
                  ? 'text-white bg-gray-700 font-bold' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Cooling Unit
            </Link>
            <Link 
              href="/user"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/user') 
                  ? 'text-white bg-gray-700 font-bold' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Admin
            </Link>
            <Link 
              href="/config"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/config') 
                  ? 'text-white bg-gray-700 font-bold' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Config
            </Link>
            <Link 
              href="/upgrade"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/upgrade') 
                  ? 'text-white bg-gray-700 font-bold' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Upgrade
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <UserLoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}