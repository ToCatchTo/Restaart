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

// Lokální mock API administrace místo proxy (MOCK_API=true)
function mockApi(): Plugin {
  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = new URL(req.url ?? '/', 'http://localhost').pathname
        if (!path.startsWith('/api/') || path === '/api/google-rating') return next()
        const { resolveMock } = (await server.ssrLoadModule('/mocks/api.ts')) as { resolveMock: (path: string) => unknown }
        const body = resolveMock(path)
        res.statusCode = body === undefined ? 404 : 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(body ?? { error: 'Not found' }))
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Proměnné z .env* do process.env pro lokální běh serverless funkcí
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), localApi(), ...(process.env.MOCK_API === 'true' ? [mockApi()] : [])],
    // Lokální vývoj: API administrace přes proxy kvůli CORS
    server: {
      proxy: {
        '/api': { target: 'https://admin.restaart.cz', changeOrigin: true },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
    },
  }
})
