# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

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
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
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
]);
```

## Project Notes

### Redundancy Findings (To Be Fixed Later)
- **Unused Components**: `TabNavigation.tsx`, `VideoGrid.tsx`, `ContactForm.tsx`, `Footer.tsx`, `Hero.tsx` are created but not imported/used in `App.tsx`. Instead, tab buttons, video grid, contact form, footer, and hero content are hardcoded directly in `App.tsx`.
- **Unused Dependencies**: `react-router-dom`, `framer-motion` (only used in unused components), `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate` appear unused.
- **Unused Libraries**: `src/lib/db.ts` and `src/lib/videoService.ts` have MongoDB functionality commented out for Vercel deployment.
- **Duplicate Logic**: `VideoCardMux.tsx` and `VideoCardVimeo.tsx` have very similar modal and UI structures.
- **Hardcoded Content**: About section, hero section, contact form, and footer are all inline in `App.tsx` instead of using the separate component files.

### Media Decode Error Analysis
The "PIPELINE_ERROR_DECODE: video decode error!" in Vercel deployment is likely due to:
- Browser/platform-specific video decoding issues
- Codec compatibility problems with Vercel's hosting environment
- Video format issues (MP4 files in `/public/`)
- Network/CDN issues affecting video streaming
- Mux player configuration or API issues

### Splash Screen Changes
- Video source changed from `/povintrovid.mp4` to `/splashPOV.mp4`
- Removed `muted` attribute to enable sound playback
- Note: Browsers may require user interaction before allowing unmuted autoplay
