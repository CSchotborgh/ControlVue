/**
 * EDGERACK Cooling Unit Control System - Authentication Context & Hook
 * 
 * Provides authentication state management throughout the application.
 * This context manages user login/logout states and provides authentication
 * methods for controlling access to sensitive system configuration and monitoring data.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Authentication Context Type Definition
 * 
 * Defines the shape of the authentication context that's available
 * throughout the application for managing user access and sessions.
 */
interface AuthContextType {
  isLoggedIn: boolean;     // Current authentication status
  toggleLogin: () => void; // Toggle authentication state (for demo/testing)
  login: () => void;       // Set user as authenticated
  logout: () => void;      // Clear user authentication
}

// Create the authentication context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * 
 * Wraps the application and provides authentication state to all child components.
 * This provider manages the login state and makes authentication methods available
 * throughout the component tree for access control and user management.
 * 
 * @param children - React components that need access to authentication state
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // Track user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Toggle Login State
   * Used primarily for demo purposes and testing authentication flows
   */
  const toggleLogin = () => {
    setIsLoggedIn(prev => !prev);
  };

  /**
   * Login Function
   * Sets the user as authenticated, typically called after successful
   * credential validation through the login modal
   */
  const login = () => {
    setIsLoggedIn(true);
  };

  /**
   * Logout Function
   * Clears authentication state and returns user to login-required state
   */
  const logout = () => {
    setIsLoggedIn(false);
  };

  // Provide authentication state and methods to child components
  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Authentication Hook
 * 
 * Custom hook that provides access to authentication state and methods.
 * Must be used within an AuthProvider component to function properly.
 * 
 * @returns Authentication context with login state and control methods
 * @throws Error if used outside of an AuthProvider
 * 
 * @example
 * const { isLoggedIn, login, logout } = useAuth();
 * if (!isLoggedIn) {
 *   return <LoginForm onLogin={login} />;
 * }
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  // Ensure hook is used within provider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
