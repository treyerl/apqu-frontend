# Project Setup

1. Creating Svelte Project

    ```bash
    npm create svelte@latest .
    npm install
    npm run dev
    ```

2. Install static adapter

    ```bash
    npm i -D @sveltejs/adapter-static
    ```

3. Tell SvelteKit to act as a SPA; [SPA-Mode](https://kit.svelte.dev/docs/adapter-static#spa-mode).

    ```javascript
    import adapter from '@sveltejs/adapter-static';
 
    export default {
      kit: {
        adapter: adapter({
          fallback: 'index.html'
        }),
        prerender: { entries: [] }
      }
    };
    ```
