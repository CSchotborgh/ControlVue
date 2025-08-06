/**
 * EDGERACK Cooling Unit Control System - Application Entry Point
 * 
 * This is the main entry point for the React application. It renders the root
 * App component into the DOM and applies the global CSS styles including the
 * EDGERACK industrial theme and Tailwind CSS framework.
 */

import { createRoot } from "react-dom/client";  // React 18 concurrent rendering
import App from "./App";                        // Main application component
import "./index.css";                          // Global styles and Tailwind CSS

// Mount the React application to the root DOM element
// The exclamation mark (!) asserts that the element exists
createRoot(document.getElementById("root")!).render(<App />);
