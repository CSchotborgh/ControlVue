/**
 * EDGERACK Cooling Unit Control System - Theme Context
 * 
 * Provides theme switching functionality between the original "Blue" theme
 * and the new "ECX" dark theme with custom gradient background and colors.
 * This context manages the global theme state and applies appropriate CSS classes.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Available Theme Options
 * 
 * - Blue: Original EDGERACK theme with blue accents
 * - ECX: New dark theme with gradient background and custom colors
 */
type Theme = 'Blue' | 'ECX';

/**
 * Theme Context Interface
 * 
 * Defines the structure for theme context providing current theme state
 * and function to toggle between available themes.
 */
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the theme context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme Provider Props Interface
 * 
 * Defines the props required by the ThemeProvider component
 * for wrapping child components with theme context.
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Provider Component
 * 
 * Provides theme context to all child components and manages theme state
 * persistence in localStorage. Applies appropriate CSS classes to the
 * document element based on the current theme selection.
 * 
 * @param children - Child components to receive theme context
 * @returns JSX element providing theme context
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme from localStorage or default to Blue
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('edgerack-theme');
    return (savedTheme as Theme) || 'Blue';
  });

  /**
   * Toggle Theme Function
   * 
   * Switches between Blue and ECX themes, updating both state
   * and localStorage for persistence across sessions.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'Blue' ? 'ECX' : 'Blue');
  };

  /**
   * Theme Application Effect
   * 
   * Applies the appropriate CSS classes to the document element
   * when the theme changes and persists the selection to localStorage.
   * Uses a systematic approach to ensure clean theme transitions.
   */
  useEffect(() => {
    // Remove existing theme classes
    document.documentElement.classList.remove('theme-blue', 'theme-ecx');
    
    // Apply new theme class
    if (theme === 'ECX') {
      document.documentElement.classList.add('theme-ecx');
    } else {
      document.documentElement.classList.add('theme-blue');
    }

    // Persist theme selection
    localStorage.setItem('edgerack-theme', theme);
    
    // Force repaint to ensure theme changes are applied immediately
    document.documentElement.offsetHeight;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Use Theme Hook
 * 
 * Custom hook for accessing theme context in components.
 * Provides type-safe access to theme state and toggle function.
 * 
 * @returns Theme context with current theme and toggle function
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}