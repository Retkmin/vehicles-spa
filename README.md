# Vehicle Information SPA - GT Motive Technical Test

A Single Page Application (SPA) built with Angular 20 that displays vehicle information using the NHTSA Vehicle API. This project demonstrates modern Angular development practices with clean architecture, state management, and professional UI components.

## Project Overview

This application provides an intuitive interface to browse vehicle brands and their detailed information including vehicle types and available models. Built as a technical assessment for GT Motive.

### Features

- **Vehicle Brand Listing**: Display all available vehicle brands with virtual scrolling for performance
- **Search Functionality**: Real-time search to filter vehicle brands
- **Brand Details**: Navigate to detailed brand information showing:
  - Vehicle types available for the brand
  - Complete model listings
- **Responsive Design**: Mobile-first responsive interface using Angular Material
- **State Management**: Robust state management with NgRx (Redux pattern)
- **Clean Architecture**: Domain-driven design with proper separation of concerns

## Technical Stack

### Core Technologies
- **Angular 20** - Latest stable version with standalone components
- **TypeScript 5.9** - Strict mode enabled for enhanced type safety
- **SCSS** - Styling with modern CSS preprocessor

### State Management & Reactive Programming
- **NgRx 20** - Redux pattern implementation for Angular
- **RxJS 7.8** - Reactive programming for data streams

### UI Framework
- **Angular Material 20** - Material Design components
- **Angular CDK** - Component Development Kit for advanced UI patterns

### Code Quality & Testing
- **Jest** - Modern testing framework replacing Jasmine/Karma
- **ESLint** - Code linting with Angular-specific rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit quality checks
- **Lint-staged** - Run linters on staged files only

## Architecture

The project follows **Clean Architecture** principles with **Domain-Driven Design (DDD)**:

```
src/app/
├── core/                    # Cross-cutting concerns
│   ├── interfaces/         # Shared interfaces
│   ├── services/          # Core services
│   ├── guards/            # Route guards
│   └── interceptors/      # HTTP interceptors
├── shared/                 # Shared components and utilities
│   ├── components/        # Reusable UI components
│   ├── pipes/            # Custom pipes
│   ├── directives/       # Custom directives
│   └── utils/            # Utility functions
└── modules/               # Feature modules
    └── vehicles/          # Vehicle domain module
        ├── data-access/   # Data access layer
        │   ├── state/    # NgRx store (actions, reducer, effects, selectors)
        │   └── services/ # API services
        ├── domain/        # Business logic layer
        │   ├── models/   # Domain models
        │   └── use-cases/# Business use cases
        └── ui/           # Presentation layer
            ├── pages/    # Smart components (containers)
            └── components/ # Dumb components (presentational)
```

## Quick Start

### Prerequisites
- Node.js 22.20.0 or higher
- npm 10.9.3 or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <folder>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Available Scripts

### Development
```bash
npm start              # Start development server
npm run watch          # Build in watch mode
```

### Building
```bash
npm run build          # Production build
npm run build:prod     # Production build (explicit)
```

### Testing
```bash
npm test              # Run tests with Jest
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:ci       # Run tests for CI/CD (no watch)
```

### Code Quality
```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues automatically
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

### Git Hooks
```bash
npm run prepare       # Setup Husky git hooks
npm run pre-commit    # Run pre-commit checks manually
```

## API Integration

The application integrates with the **NHTSA Vehicle API**:
- **Base URL**: `https://vpic.nhtsa.dot.gov/api/`
- **Documentation**: [NHTSA Vehicle API Documentation](https://vpic.nhtsa.dot.gov/api/)


## Testing Strategy

- **Unit Testing**: Jest with Angular Testing Utilities
- **Coverage Threshold**: 80% minimum coverage required
- **Test Types**:
  - Component testing
  - Service testing
  - State management testing (NgRx)
  - Integration testing

## Code Quality Standards

### Enforced Standards:
- **TypeScript Strict Mode**: Enhanced type safety
- **ESLint Rules**: Angular-specific linting rules
- **Prettier Configuration**: Consistent code formatting
- **Pre-commit Hooks**: Automated quality checks before commits
- **Conventional Commits**: Standardized commit messages

### Architecture Principles:
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Clean Architecture**: Separation of concerns with proper layering
- **Domain-Driven Design**: Business logic encapsulation
- **Facade Pattern**: Simplified interfaces for complex subsystems

## Responsive Design

The application is built with a mobile-first approach using Angular Material components, ensuring optimal user experience across all device sizes.

## Development Guidelines

### Adding New Features:
1. Create feature module under `modules/`
2. Follow the established architecture layers (data-access, domain, ui)
3. Implement proper state management with NgRx
4. Write comprehensive tests
5. Follow the established naming conventions

### State Management:
- Use NgRx for complex state management
- Implement facade pattern for simplified component interaction
- Follow reactive programming patterns with RxJS

## Browser Support

- Chrome (latest)

## License

This project is developed as a technical assessment for GT Motive.

---

## Conventional Commits

This project uses the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard for commit messages. See the official website for format and examples.


---

**Developed by**: Dario Alejandre Rodenas
