# Conventional Commits Guide

Este proyecto utiliza **Conventional Commits** para mantener un historial de commits claro y estructurado.

## Formato

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Tipos permitidos:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios solo en documentación
- `style`: Cambios que no afectan el significado del código (espacios, formato, etc.)
- `refactor`: Cambio de código que no corrige un bug ni añade una funcionalidad
- `perf`: Cambio de código que mejora el rendimiento
- `test`: Añadir tests faltantes o corregir tests existentes
- `build`: Cambios que afectan el sistema de build o dependencias externas
- `ci`: Cambios en archivos de configuración de CI
- `chore`: Otros cambios que no modifican archivos src o test
- `revert`: Revierte un commit anterior

## Ejemplos:

```bash
# Nueva funcionalidad
feat: add vehicle search functionality

# Corrección de bug
fix: resolve pagination issue in vehicle list

# Documentación
docs: update README with API endpoints

# Refactor
refactor: extract vehicle service to separate module

# Breaking change (añadir ! después del tipo)
feat!: change API response format for vehicles

# Con scope
feat(vehicles): add virtual scrolling to brand list
fix(auth): handle token expiration properly
```

## Comandos útiles:

```bash
# Usar commitizen para commits asistidos
npm run commit

# Verificar formato de commit manualmente
npx commitlint --edit

# Ver último commit
git log -1 --oneline
```

## Reglas:

1. **type** es obligatorio
2. **description** debe estar en lowercase
3. No usar punto al final de la description
4. Máximo 100 caracteres en el header
5. Usar imperativo en presente ("add" no "added" ni "adds")

## ¿Por qué Conventional Commits?

- **Changelog automático**: Generar CHANGELOG.md automáticamente
- **Semantic Versioning**: Determinar automáticamente el siguiente número de versión
- **Mejor colaboración**: Commits más legibles y estructurados
- **Tooling**: Integración con herramientas de CI/CD y release
