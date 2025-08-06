/**
 * EDGERACK Cooling Unit Control System - Main Server Entry Point
 * 
 * This is the primary server file that initializes the Express.js application,
 * sets up middleware, registers API routes, and configures the development/production
 * environment. The server handles both API requests and serves the frontend client.
 */

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Initialize the Express application instance
const app = express();

// Parse incoming JSON requests with a body parser middleware
// This allows the server to automatically parse JSON payloads from client requests
app.use(express.json());

// Parse URL-encoded form data (for traditional form submissions)
// Extended: false means using the querystring library for parsing
app.use(express.urlencoded({ extended: false }));

/**
 * Request Logging Middleware
 * 
 * This middleware captures and logs all API requests for monitoring and debugging purposes.
 * It tracks request duration, response status codes, and response data for API endpoints.
 * The logging helps monitor cooling unit data flow and system performance.
 */
app.use((req, res, next) => {
  // Record the start time to calculate request duration
  const start = Date.now();
  const path = req.path;
  
  // Variable to capture the JSON response data for logging
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Override the res.json method to capture response data
  // This allows us to log what data was sent back to the client
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // Log the request details when the response is finished
  res.on("finish", () => {
    const duration = Date.now() - start;
    
    // Only log API requests (not static file requests)
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // Include response data in the log for debugging
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Truncate long log lines to keep console output readable
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      // Use the custom log function from vite.ts
      log(logLine);
    }
  });

  // Continue to the next middleware in the chain
  next();
});

/**
 * Main Server Initialization
 * 
 * This async function initializes the complete server setup including:
 * - API route registration
 * - Error handling middleware
 * - Development/Production environment configuration
 * - Static file serving (production) or Vite dev server (development)
 * - Server startup and port binding
 */
(async () => {
  // Register all API routes for cooling unit data, control settings, and authentication
  // This returns an HTTP server instance that we'll use for both API and static serving
  const server = await registerRoutes(app);

  /**
   * Global Error Handler Middleware
   * 
   * This catches any unhandled errors that occur in route handlers or middleware.
   * It ensures all errors are properly formatted and returned as JSON responses.
   * Critical for maintaining API consistency when cooling unit operations fail.
   */
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Extract status code from error object, defaulting to 500 for unknown errors
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Return structured error response to client
    res.status(status).json({ message });
    
    // Re-throw the error for logging and debugging purposes
    throw err;
  });

  /**
   * Environment-Specific Setup
   * 
   * Development: Sets up Vite dev server for hot module replacement and fast development
   * Production: Serves pre-built static files from the client build directory
   * 
   * IMPORTANT: Vite setup must come AFTER all API routes to prevent the catch-all
   * route from interfering with API endpoints
   */
  if (app.get("env") === "development") {
    // Development mode: Use Vite for hot reloading and development features
    await setupVite(app, server);
  } else {
    // Production mode: Serve pre-built static files
    serveStatic(app);
  }

  /**
   * Server Startup Configuration
   * 
   * The server MUST use the PORT environment variable as it's the only port
   * accessible from external networks in the Replit environment.
   * Default to 5000 for local development compatibility.
   */
  const port = parseInt(process.env.PORT || '5000', 10);
  
  // Start the server with specific configuration for industrial monitoring reliability
  server.listen({
    port,                    // Use environment-specified port
    host: "0.0.0.0",        // Accept connections from any IP (required for Replit)
    reusePort: true,        // Allow port reuse for zero-downtime restarts
  }, () => {
    // Log successful server startup for monitoring and debugging
    log(`serving on port ${port}`);
  });
})();
