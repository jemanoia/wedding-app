import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves project sites from /<repo-name>/.
  // During local development and non-GitHub builds, use root.
  base: repositoryName ? `/${repositoryName}/` : '/'
});
