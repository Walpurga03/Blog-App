# Solomining Bitaxe Blog

Ein responsiver, mehrsprachiger Blog über den Bitaxe Bitcoin-Miner.

## Features

- Responsive Design für alle Geräte
- Mehrsprachige Unterstützung (Deutsch/Englisch)
- Moderne UI mit SCSS
- Einfache Navigation

## Technologien

- React + TypeScript + Vite
- i18next für Internationalisierung
- SCSS für Styling

## Entwicklung

Um das Projekt lokal zu entwickeln, folge diesen Schritten:

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Für die Produktion bauen
npm run build

# Auf GitHub Pages veröffentlichen
npm run deploy
```

## Deployment

Die Website wird auf GitHub Pages veröffentlicht und ist über folgende URL erreichbar:
https://Walpurga03.github.io/Blog-App/

Das Deployment erfolgt automatisch durch den GitHub Actions Workflow oder manuell mit dem `npm run deploy` Befehl.

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
