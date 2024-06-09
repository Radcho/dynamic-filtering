# Case Study - Dynamic Filtering

This is a project done as a case study for an interview.

## Usage

Install dependencies using:

```sh
npm i
```

Run the app locally with:

```sh
npm run dev
# OR
npm run build
npm run preview
```

The app contains one test file made for testing the filter parser service. You can run it by using:

```sh
npm run test
```

## Structure

The app has the following structure:

- `.vscode` - VS Code development settings
- `public` - deployed with the app, contains only the favicon
- `src`
  - `assets` - contains static files such as filter jsons and css
  - `components` - contains all app components, with each one containing:
    - `Component.tsx` - main exported component
    - `Component.style.module.css` - scoped component styles
    - `index.ts` - reexport of the main exported component
    - Other internal components
  - `mock` - contains mocking logic for the work orders
  - `services` - contains the filter parsing service
  - `store` - contains the Redux store
  - `utils` - various little helper functions
  - `App.tsx` - main App component
  - `main.tsx` - React entrypoint script
  - `types.ts` - contains most reused types throughout the app (since there's not too many of them)
  - `vite-env.d.ts` - type definitions for vite's dynamic imports, etc.
- `index.html` - app entrypoint
- Various tooling configuration files (`.prettierrc`, `eslint.config.js`, `vite.config.ts`, `typescript(?:.node)?.json`)
