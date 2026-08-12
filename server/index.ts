import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection middleware for incoming requests
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("[Database] Middleware connection error:", err);
  }
  next();
});

// Health check API endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "lpg-smarttrack-api",
    timestamp: new Date().toISOString(),
  });
});

// Serve static files from dist/public in production mode
const staticPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));

// Handle client-side routing fallback - serve index.html for non-API routes
app.get("*", (_req, res) => {
  const indexPath = path.join(staticPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err && !res.headersSent) {
      res.status(200).send(`<!doctype html><html><body><div id="root"></div></body></html>`);
    }
  });
});

// Only listen on HTTP port when running as a standalone node server (not in Vercel serverless environment)
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  const server = createServer(app);
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

export default app;
