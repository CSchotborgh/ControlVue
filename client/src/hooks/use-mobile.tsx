/**
 * EDGERACK Cooling Unit Control System - Mobile Detection Hook
 * 
 * Provides responsive design support for the industrial monitoring interface.
 * This hook detects screen size changes and enables adaptive layouts for
 * tablet and mobile devices used in data center environments.
 */

import * as React from "react"

// Mobile breakpoint at 768px (tablet size) for industrial touch interfaces
const MOBILE_BREAKPOINT = 768

/**
 * Mobile Detection Hook
 * 
 * Detects whether the current viewport is below the mobile breakpoint.
 * Used throughout the application to provide responsive layouts that work
 * on both desktop workstations and mobile devices for field technicians.
 * 
 * @returns Boolean indicating if the current viewport is mobile-sized
 * 
 * @example
 * const isMobile = useIsMobile();
 * return (
 *   <div className={isMobile ? "grid-cols-1" : "grid-cols-3"}>
 *     {content}
 *   </div>
 * );
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create a media query listener for the mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Update state when viewport size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set up event listener for viewport changes
    mql.addEventListener("change", onChange)
    
    // Set initial state based on current viewport
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Cleanup event listener on unmount
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return boolean (converts undefined to false)
  return !!isMobile
}
