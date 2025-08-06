# Contributing to EDGERACK Cooling Unit Control System

Thank you for your interest in contributing to the EDGERACK Cooling Unit Control System! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Git
- Basic knowledge of TypeScript, React, and Express.js
- Familiarity with industrial monitoring systems (helpful but not required)

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/edgerack-cooling-system.git
   cd edgerack-cooling-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Verify setup**
   Open `http://localhost:5000` and ensure the application loads properly

## 🏗️ Development Guidelines

### Code Style

#### TypeScript Standards
- Use TypeScript for all new code
- Define proper types for all data structures
- Avoid using `any` type - use proper typing
- Use interface over type when defining object structures

#### React Components
- Use functional components with hooks
- Follow the existing component structure in `client/src/components/`
- Use proper prop typing with TypeScript interfaces
- Implement loading and error states for data fetching

#### Backend Development
- Follow RESTful API conventions
- Use proper HTTP status codes
- Implement proper error handling
- Validate all input data using Zod schemas

### File Organization

```
client/src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (shadcn/ui)
│   └── *.tsx          # Application-specific components
├── pages/             # Page components for routing
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── App.tsx            # Main application component

server/
├── index.ts           # Server entry point
├── routes.ts          # API route definitions
├── storage.ts         # Data storage interface
└── vite.ts           # Vite development integration

shared/
└── schema.ts          # Shared types and validation schemas
```

### Naming Conventions

- **Components**: PascalCase (e.g., `CoolingUnitDisplay.tsx`)
- **Files**: camelCase for utilities, PascalCase for components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **API Endpoints**: kebab-case (e.g., `/api/cooling-unit/data`)

## 🎨 UI/UX Guidelines

### Design System

The application uses a custom industrial design theme:

- **Colors**: Dark theme with high contrast for industrial environments
- **Typography**: Lato font family with normal weight (400) for body text, semi-bold (600) for headers
- **Components**: Use shadcn/ui components as base, customize for industrial use
- **Spacing**: Follow Tailwind spacing scale
- **Responsiveness**: Mobile-first approach with desktop optimization

### Component Guidelines

- Use consistent spacing and sizing
- Implement proper loading states
- Include error boundaries for data components
- Ensure accessibility with proper ARIA labels
- Test on both desktop and mobile devices

## 🔧 Technical Architecture

### Frontend Architecture

- **React 18** with functional components and hooks
- **TanStack Query** for server state management
- **Wouter** for lightweight routing
- **Tailwind CSS** for styling with custom theme
- **TypeScript** for type safety

### Backend Architecture

- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Zod** for data validation
- **Session-based authentication**
- **RESTful API design**

### Data Flow

1. Frontend components use TanStack Query hooks
2. API calls go through the query client
3. Backend routes validate data with Zod schemas
4. Storage interface handles data persistence
5. Real-time updates via polling

## 📊 Database Schema

### Core Tables

- **Users**: Authentication and profile data
- **CoolingUnitData**: Real-time and historical metrics
- **SystemConfig**: Application configuration
- **AuditLogs**: System activity tracking

### Schema Changes

- All schema changes must be made in `shared/schema.ts`
- Use Drizzle migrations for database changes
- Update both insert and select types
- Test schema changes thoroughly

## 🧪 Testing

### Current Testing Strategy

- Manual testing across all pages and features
- Browser compatibility testing
- Mobile responsiveness testing
- Real-time data update verification

### Test Coverage Goals

- Unit tests for utility functions
- Component testing with React Testing Library
- API endpoint testing
- Integration tests for critical user flows

## 🐛 Bug Reports

### Before Submitting

1. Search existing issues to avoid duplicates
2. Test on the latest version
3. Reproduce the issue consistently
4. Gather relevant system information

### Bug Report Template

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
Add screenshots if applicable.

**Environment**
- Browser: [e.g., Chrome 90]
- OS: [e.g., Windows 10]
- Node.js version: [e.g., 18.15.0]
```

## ✨ Feature Requests

### Feature Request Guidelines

- Describe the feature clearly
- Explain the use case and benefits
- Consider implementation complexity
- Discuss potential alternatives

### Industrial Focus

When proposing features, consider:
- Industrial monitoring requirements
- Real-time data needs
- User experience in industrial environments
- System reliability and performance

## 🔄 Pull Request Process

### Before Submitting

1. **Test thoroughly**: Ensure all features work as expected
2. **Check types**: Run `npm run type-check` without errors
3. **Code style**: Follow existing code patterns
4. **Documentation**: Update relevant documentation

### Pull Request Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Local testing completed
- [ ] All TypeScript types pass
- [ ] Responsive design tested
- [ ] Real-time data updates verified

## Screenshots
Include screenshots for UI changes.
```

### Review Process

1. **Automated checks**: TypeScript compilation and basic validation
2. **Code review**: Maintainer review for code quality and architecture
3. **Testing**: Functional testing of changes
4. **Deployment**: Integration testing in development environment

## 📚 Development Resources

### Key Technologies

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/)

### Industrial Monitoring Context

- Real-time systems require low latency
- Industrial interfaces prioritize function over form
- High contrast and clear typography for visibility
- Reliable data display with proper error handling

## 🤝 Community Guidelines

### Communication

- Be respectful and professional
- Provide constructive feedback
- Help other contributors when possible
- Focus on technical merit of contributions

### Collaboration

- Discuss major changes before implementation
- Share knowledge and best practices
- Document decisions and rationale
- Consider impact on existing users

## 📞 Getting Help

### Development Questions

- Check existing documentation first
- Search GitHub issues for similar questions
- Create a new issue with detailed context
- Join community discussions

### Contact Information

- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: Refer to README.md and inline comments
- **Code Questions**: Create detailed GitHub issues

---

**Thank you for contributing to the EDGERACK Cooling Unit Control System!**

Your contributions help improve industrial monitoring and control systems for users worldwide.