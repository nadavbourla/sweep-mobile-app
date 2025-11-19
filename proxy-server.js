/**
 * Simple proxy server for web development to bypass CORS issues
 * 
 * Installation:
 *   npm install express http-proxy-middleware cors
 * 
 * Usage:
 *   1. Run this server: node proxy-server.js
 *   2. Add EXPO_PUBLIC_USE_PROXY=true to your .env file
 *   3. Restart your Expo dev server
 * 
 * Note: This is only needed for web development. iOS/Android don't have CORS restrictions.
 */

const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const cors = require("cors")

const app = express()
const PORT = 3001

// Enable CORS for all routes
app.use(cors())

// Proxy all requests to the platform API
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://platform.ke-la.com",
    changeOrigin: true,
    // Keep the full path including /api/investigate/v1
    pathRewrite: {
      "^/api": "/api", // Keep /api prefix
    },
    onProxyReq: (proxyReq, req, res) => {
      // Log the proxied request
      console.log(`Proxying ${req.method} ${req.url} -> ${proxyReq.path}`)
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err.message)
      res.status(500).json({ error: "Proxy error", message: err.message })
    },
  }),
)

app.listen(PORT, () => {
  console.log(`\n✅ Proxy server running on http://localhost:${PORT}`)
  console.log(`📡 Proxying requests to https://platform.ke-la.com`)
  console.log(`\n💡 Add EXPO_PUBLIC_USE_PROXY=true to your .env file to use this proxy\n`)
})

