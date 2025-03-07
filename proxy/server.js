const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Environment variables
const API_KEY = process.env.API_KEY;
const UPSTREAM_URL = process.env.UPSTREAM_URL;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://localhost',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting (100 requests per 15 minutes)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// API Proxy Configuration
app.use('/api', createProxyMiddleware({
  target: UPSTREAM_URL,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onProxyReq: (proxyReq) => {
    if (API_KEY) {
      proxyReq.setHeader('Authorization', `Bearer ${API_KEY}`);
    }
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// HTTPS Server Configuration
const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH)
};

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Secure proxy server running on port ${port}`);
});