# EDGERACK Cooling Unit Control System

> **A real-time industrial cooling unit monitoring and control system built with React, TypeScript, and Express.js**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)
![React](https://img.shields.io/badge/react-v18+-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-v5+-blue.svg)

## 🏭 Overview

The EDGERACK Cooling Unit Control System is a professional industrial monitoring application designed to provide real-time control and monitoring of cooling unit operations. This system replicates the functionality of actual EDGERACK internal systems, featuring authentic data integration and industrial-grade user interfaces.

### Key Features

- **Real-time Monitoring**: Live cooling unit data with automatic updates
- **Industrial Dashboard**: Professional UI optimized for industrial environments
- **User Authentication**: Secure login system with session management
- **Multi-page Navigation**: Comprehensive routing across all system functions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **TypeScript Integration**: Full type safety across frontend and backend
- **Database Integration**: PostgreSQL with Drizzle ORM for data persistence

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- PostgreSQL database (optional - uses in-memory storage by default)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edgerack-cooling-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000` to access the application

## 🏗️ Architecture

### Technology Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Express.js with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom EDGERACK industrial theme
- **Database**: PostgreSQL with Drizzle ORM (configurable)
- **State Management**: TanStack Query for server state, React Context for auth
- **Routing**: Wouter for lightweight client-side routing

### Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components for routing
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and configurations
│   │   └── App.tsx        # Main application component
├── server/                # Express backend application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage interface
│   └── vite.ts          # Vite integration for development
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schemas and validation
├── package.json         # Project dependencies and scripts
└── README.md           # Project documentation
```

## 📱 Application Pages

### Home (`/`)
- System overview and status dashboard
- Real-time cooling unit metrics
- Critical alerts and notifications

### Cooling Unit (`/cooling`)
- Detailed cooling unit monitoring
- Temperature readings and controls
- Equipment status indicators
- Historical data charts

### Admin (`/user`)
- User management and authentication
- System administration controls
- User activity monitoring

### Configuration (`/config`)
- System configuration settings
- Network configuration management
- General settings and preferences

### Upgrade (`/upgrade`)
- Software package management
- System upgrade controls
- Upgrade history and logs

## 🎨 Design System

The application uses a custom industrial design theme optimized for EDGERACK systems:

- **Typography**: Lato font family with normal weight for readability
- **Color Scheme**: Dark industrial theme with high contrast
- **Components**: Professional UI components designed for industrial use
- **Responsive**: Mobile-first approach with desktop optimization

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production application
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run code linting

### Development Workflow

1. **Frontend Development**: Components are located in `client/src/`
2. **Backend Development**: API routes and logic in `server/`
3. **Shared Types**: Database schemas and validation in `shared/`
4. **Styling**: Tailwind CSS with custom industrial theme

### Hot Reloading

The development server supports hot module replacement for both frontend and backend changes. The Vite development server automatically restarts when backend files change.

## 🗄️ Database

### Schema

The application uses a structured database schema defined with Drizzle ORM:

- **Users**: User authentication and profile data
- **Cooling Unit Data**: Real-time and historical cooling metrics
- **System Configuration**: Application settings and preferences
- **Audit Logs**: System activity and change tracking

### Storage Options

- **Development**: In-memory storage (default)
- **Production**: PostgreSQL with Neon serverless driver
- **Configuration**: Environment-based storage selection

## 🔐 Authentication

The system implements session-based authentication with:

- Username/password login
- Secure session management
- Route protection for authenticated users
- Automatic session timeout

## 📊 Real-time Data

Real-time cooling unit data is provided through:

- RESTful API endpoints
- TanStack Query for data fetching and caching
- Automatic polling for live updates
- Optimistic UI updates

## 🚀 Deployment

### Replit Deployment

This project is optimized for deployment on Replit:

1. Import the repository to Replit
2. Dependencies are automatically installed
3. The application starts with `npm run dev`
4. Access via the provided Replit URL

### Custom Deployment

For custom deployment:

1. Set up PostgreSQL database
2. Configure environment variables
3. Build the application with `npm run build`
4. Deploy to your preferred hosting platform

## 🤝 Contributing

We welcome contributions to improve the EDGERACK Cooling Unit Control System. Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code style and conventions
- Development workflow
- Pull request process
- Issue reporting

## 📋 Requirements

### System Requirements

- **Node.js**: v18.0 or higher
- **Memory**: 512MB RAM minimum
- **Storage**: 100MB available space
- **Network**: Internet connection for external dependencies

### Browser Support

- **Chrome**: v90+
- **Firefox**: v88+
- **Safari**: v14+
- **Edge**: v90+

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure port 5000 is available
2. **Dependencies**: Run `npm install` to resolve missing packages
3. **TypeScript errors**: Run `npm run type-check` for detailed error information
4. **Database connection**: Verify PostgreSQL configuration if using external database

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React, TypeScript, Tailwind CSS
- **Backend Development**: Express.js, Drizzle ORM, PostgreSQL
- **UI/UX Design**: Industrial interface design and user experience
- **System Architecture**: Full-stack application design

## 📞 Support

For support and questions:

- **Documentation**: Refer to this README and inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests
- **Development**: Follow the contributing guidelines for code contributions

---

**Built with ❤️ for industrial monitoring and control systems**