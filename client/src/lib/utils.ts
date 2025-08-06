/**
 * EDGERACK Cooling Unit Control System - Utility Functions
 * 
 * This file provides utility functions used throughout the application,
 * including CSS class name merging for dynamic styling and other helper functions.
 */

import { clsx, type ClassValue } from "clsx"    // Conditional class name library
import { twMerge } from "tailwind-merge"        // Tailwind CSS class conflict resolution

/**
 * Conditional Class Name Utility
 * 
 * Combines multiple class name inputs and resolves Tailwind CSS conflicts.
 * This is essential for the shadcn/ui component system and allows for
 * dynamic styling based on component states and props.
 * 
 * @param inputs - Array of class name values (strings, objects, arrays)
 * @returns Merged and optimized class name string
 * 
 * @example
 * cn("bg-blue-500", isActive && "bg-red-500") // Resolves conflicts properly
 * cn("p-4", "px-6") // Results in "py-4 px-6" (merges padding correctly)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
