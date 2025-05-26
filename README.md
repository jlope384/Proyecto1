# Calculadora Web

Una calculadora web construida con **Vite + React**, con pruebas automatizadas, historias visuales en Storybook, y cumplimiento de estilo con ESLint sin punto y coma.

## Características

- Suma, resta y multiplicación
- Límite de 9 caracteres
- Errores para resultados negativos o mayores a 999999999
- Punto decimal
- Componentes modulares: `Calculator`, `Display`, `Key`, `Keypad`
- Linter con reglas personalizadas (`eslint.config.js`)
- Historias con Storybook
- Tests con Testing Library

## Scripts

```bash
npm run dev        # Inicia la app en desarrollo
npm run lint       # Corre ESLint con configuración personalizada
npm run storybook  # Levanta Storybook
