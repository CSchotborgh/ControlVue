# Overview

This is a real-time cooling unit monitoring and control system built with a React frontend and Express backend. The application provides an industrial dashboard interface for monitoring cooling unit data, equipment states, and environmental parameters. It features real-time data updates, user authentication, and a responsive design optimized for industrial use.

**Latest Update (2025-08-06)**: Complete GitHub repository documentation created including README.md, CONTRIBUTING.md, API.md, DEPLOYMENT.md, CHANGELOG.md, and LICENSE files. The repository now includes comprehensive instructions for developers, deployment guides, and professional documentation suitable for open-source distribution.

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