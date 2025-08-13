# Overview

This is a real-time cooling unit monitoring and control system built with a React frontend and Express backend. The application provides an industrial dashboard interface for monitoring cooling unit data, equipment states, and environmental parameters. It features real-time data updates, user authentication, and a responsive design optimized for industrial use.

**Latest Update (2025-08-13)**: Enhanced responsive design and navigation consistency across the entire EDGERACK cooling unit control system. Implemented:

- **Consistent Expand All Button Design**: Standardized "Expand All"/"Collapse All" buttons across all pages using shadcn/ui Button component with outline variant and consistent styling
- **Responsive Navigation Enhancement**: Updated navigation bar to span full width (`w-full`) instead of constrained width (`max-w-7xl`) for better responsive behavior across all screen sizes
- **Cross-Page Button Consistency**: Updated CoolingView, ConfigView, and RCUView to use matching button design with HomeView for unified user experience
- **Enhanced UX**: All expandable sections now default to expanded state on dedicated /cooling page for immediate data access

Previous Update (2025-08-12): Successfully implemented Replit-style dark UI aesthetic across the entire EDGERACK cooling unit control system and cleaned up unused assets. Implemented:

- **Replit Dark Theme Implementation**: Applied Replit's signature dark UI colors - deep dark background (hsl(222, 28%, 8%)), card surfaces (hsl(217, 33%, 17%)), and signature blue accent (hsl(217, 91%, 59%))
- **Enhanced Color Consistency**: Updated primary colors, accent colors, and status indicators to match Replit's design system
- **Component-Level Updates**: Modified ConfigView.tsx, RCUView.tsx, and Vue components to use Replit blue variants
- **CSS Variable Updates**: Comprehensive Replit-style color palette with proper contrast ratios and accessibility
- **Framework Integration**: Updated Tailwind configuration with Replit blue primary color spectrum and dark theme variables
- **Project Cleanup**: Removed unused attached_assets files to maintain clean project structure

Previous comprehensive color selector system implementation included:

- **Complete Color Selector System**: Added 100+ color variables across all CSS files with comprehensive HSL color palettes for maximum customization flexibility
- **Multi-Spectrum Color Support**: Complete color ranges (50-900) for primary, secondary, warning, error, info, and neutral color families
- **Industrial Theme Extensions**: Enhanced EDGERACK-specific color variables with professional industrial monitoring aesthetics
- **Framework Integration**: Extended Tailwind CSS configuration with comprehensive color mappings and custom CSS variable support
- **Cross-Platform Compatibility**: Color selectors implemented in React (client/src/index.css), Vue (vue-client/src/style.css), and legacy CSS files

Previous comprehensive code commenting implementation included exhaustive JSDoc-style comments and inline documentation throughout all critical files including:

- **Complete Backend Documentation**: All server files (index.ts, routes.ts, storage.ts) and shared schema with detailed function descriptions, parameter documentation, and implementation notes
- **Comprehensive Frontend Documentation**: All React components, hooks, utilities, and page components with detailed descriptions of functionality, props, state management, and usage examples  
- **Complete Hook Documentation**: All React hooks (use-auth, use-real-time-data, use-mobile, use-toast) with comprehensive function descriptions, parameter documentation, and usage examples
- **Full UI Component Documentation**: Major components (SiteNavigation, UserLoginModal) and all page views (HomeView, CoolingView, AdminView, ConfigView, not-found) with detailed implementation notes
- **Complete Styling Documentation**: Global CSS file with detailed color variable documentation, font usage guidelines, and theme implementation notes
- **Professional Repository Documentation**: Complete GitHub repository documentation suite including README.md, CONTRIBUTING.md, API.md, DEPLOYMENT.md, CHANGELOG.md, SECURITY.md, and LICENSE files suitable for open-source distribution

The project now features enterprise-level documentation standards with consistent commenting patterns, detailed technical explanations, and comprehensive developer guidance throughout all codebase components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom EDGERACK industrial theme
- **State Management**: React Context for authentication, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Memory-based storage for development (production-ready storage interface defined)
- **API Design**: RESTful endpoints with real-time data simulation

## Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle with migrations support
- **ORM**: Drizzle ORM with Zod schema validation
- **Connection**: Neon serverless PostgreSQL driver for cloud deployment
- **Schema**: Structured tables for users, cooling unit data, and control settings

## Authentication and Authorization
- **Authentication**: Simple login system with session-based state management
- **State Management**: React Context provider for authentication state
- **Session Storage**: In-memory storage for development (extensible to database)

## External Dependencies
- **Database Provider**: Neon (serverless PostgreSQL)
- **UI Components**: Radix UI primitives for accessible components
- **Form Handling**: React Hook Form with Zod validation
- **Real-time Updates**: TanStack Query with polling for live data
- **Development Tools**: Replit-specific plugins for development environment integration

## Key Design Patterns
- **Separation of Concerns**: Clear separation between client, server, and shared code
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Real-time Data**: Polling-based updates with configurable intervals
- **Responsive Design**: Mobile-first approach with industrial UI theming
- **Modular Architecture**: Component-based frontend with reusable UI elements