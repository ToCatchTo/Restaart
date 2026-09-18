/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// Lokální obsluha serverless funkcí z api/ při vývoji
function localApi(): Plugin {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/google-rating', async (_req, res) => {
        const { GET } = (await server.ssrLoadModule('/api/google-rating.ts')) as { GET: () => Promise<Response> }
        const response = await GET()
        res.statusCode = response.status
        response.headers.forEach((value, key) => res.setHeader(key, value))
        res.end(await response.text())
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Proměnné z .env* do process.env pro lokální běh serverless funkcí
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), localApi()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
    },
  }
})
