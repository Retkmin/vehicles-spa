# Vehicles Module Structure

This directory will contain the vehicles feature module following DDD architecture:

```
vehicles/
├── data-access/           # Data access layer
│   ├── state/            # NgRx store management
│   │   ├── vehicles.actions.ts
│   │   ├── vehicles.reducer.ts
│   │   ├── vehicles.effects.ts
│   │   └── vehicles.selectors.ts
│   ├── services/         # API services
│   │   └── vehicles.api.service.ts
│   └── vehicles.facade.ts # Facade pattern
├── domain/               # Business logic layer
│   ├── models/          # Domain models and DTOs
│   │   └── vehicle.model.ts
│   ├── value-objects/   # Value objects (DDD)
│   └── use-cases/       # Business use cases
├── ui/                  # Presentation layer
│   ├── pages/          # Smart components (containers)
│   │   ├── vehicle-list-page/
│   │   └── vehicle-detail-page/
│   └── components/     # Dumb components (presentational)
│       ├── vehicle-list/
│       ├── vehicle-item/
│       └── vehicle-filter/
├── vehicles.routes.ts   # Module routing
└── index.ts            # Barrel exports
```

## Implementation Status
- [ ] Domain models
- [ ] API service integration with NHTSA
- [ ] NgRx state management
- [ ] UI components with Angular Material
- [ ] Virtual scrolling for performance
- [ ] Search and filtering
- [ ] Responsive design
