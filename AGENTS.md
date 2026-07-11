# Repository Guidelines

## Project Structure & Module Organization
This is a Vite React application using React Router, Redux, Redux Saga, SCSS, and Axios. Application entry points are `src/main.jsx` and `src/App.jsx`. Route definitions live in `src/Routes/`. Redux state is organized under `src/Redux/Actions`, `src/Redux/Reducers`, `src/Redux/Sagas`, and `src/Redux/Store.jsx`. Reusable UI belongs in `src/Components`, shared utilities and API helpers in `src/Shared`, and page-level screens in `src/Views`. Static images and global styles live in `src/assets`; public static files belong in `public/`.

## Build, Test, and Development Commands
Install dependencies with:

```sh
npm install
```

Run environment-specific dev servers:

```sh
npm run start:dev
npm run start:staging
npm run start:production
```

Build deployable bundles with `npm run build:dev`, `npm run build:staging`, or `npm run build:production`. Run `npm run lint` before submitting changes; it checks `src/**/*.{js,jsx}` with ESLint. Use `npm run preview` to serve a built bundle locally.

## Coding Style & Naming Conventions
Use ES modules and React function components. Keep component folders named by role or feature, with `index.jsx` as the component entry and `style.scss` for colocated styles when needed. Match existing casing: component and view folders use PascalCase or established project names such as `MyRecipe`; Redux action constants use uppercase names in `ActionType.jsx`. Prefer double quotes where the surrounding file uses them, and keep formatting consistent with nearby code. ESLint is configured in `.eslintrc.cjs`; `react/prop-types`, `no-unused-vars`, and `no-undef` are currently disabled.

## Testing Guidelines
No test runner or `npm test` script is currently configured. When adding tests, introduce the test framework and script in the same change, preferably using Vite-compatible tooling such as Vitest and React Testing Library. Place tests near the code they cover, using names like `ComponentName.test.jsx`, and cover route guards, Redux saga flows, form validation, and API error handling for behavior changes.

## Commit & Pull Request Guidelines
Git history currently contains only generic initial commits, so use clear imperative commit messages such as `Add recipe filter validation` or `Fix auth token refresh`. Pull requests should include a concise summary, affected routes or screens, verification steps such as `npm run lint` and relevant builds, linked issues when available, and screenshots or short recordings for UI changes.

## Security & Configuration Tips
Environment files (`.env`, `.env.development`, `.env.staging`, `.env.production`) are ignored by Git. Do not commit secrets or local API URLs. Keep environment variable usage centralized through shared constants or API helpers, and document any newly required variables in the PR description.
