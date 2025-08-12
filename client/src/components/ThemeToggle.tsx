/**
 * EDGERACK Cooling Unit Control System - Theme Toggle Component
 * 
 * Interactive toggle button for switching between Blue and ECX themes.
 * Displays theme names with visual feedback for the current selection.
 * Provides smooth transitions and maintains theme state across sessions.
 */

import { Button } from '@/components/ui/button';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Theme Toggle Component
 * 
 * Renders a dual-state button that allows users to switch between the original
 * "Blue" EDGERACK theme and the new "ECX" dark theme with custom gradient.
 * The button displays the current theme name and provides instant visual feedback.
 * 
 * @returns JSX element for the theme toggle button
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="relative flex items-center gap-2 px-3 py-1 text-sm font-medium transition-all duration-200 border-gray-600 hover:border-primary"
    >
      {/* Theme indicator with smooth transition */}
      <div className="flex items-center gap-1">
        {/* Current theme label */}
        <span className="text-foreground">
          {theme}
        </span>
        
        {/* Visual separator */}
        <span className="text-muted-foreground">|</span>
        
        {/* Next theme preview */}
        <span className="text-muted-foreground opacity-60">
          {theme === 'Blue' ? 'ECX' : 'Blue'}
        </span>
      </div>
    </Button>
  );
}