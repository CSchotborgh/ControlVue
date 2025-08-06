/**
 * EDGERACK Cooling Unit Control System - 404 Not Found Page
 * 
 * Displays a user-friendly error page when users navigate to non-existent routes.
 * This fallback page maintains the industrial aesthetic while providing clear
 * error messaging for system operators and maintenance personnel.
 */

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

/**
 * Not Found Component
 * 
 * Renders a 404 error page with industrial styling consistent with the
 * EDGERACK system design. Provides clear error messaging and maintains
 * the dark theme used throughout the monitoring application.
 * 
 * @returns JSX element for the 404 error page
 */
export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          {/* Error icon and title */}
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          {/* Developer-friendly error message */}
          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
