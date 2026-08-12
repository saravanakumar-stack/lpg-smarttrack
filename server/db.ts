import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

/**
 * Extract safe diagnostic info from error objects without exposing credentials or URIs.
 */
function getSafeErrorDiagnostics(error: unknown) {
  if (!error || typeof error !== "object") {
    return { name: "UnknownError", code: "UNKNOWN", message: String(error) };
  }

  const err = error as Record<string, unknown>;
  const name = String(err.name || "Error");
  const code = String(err.code || err.codeName || "N/A");

  // Sanitize message: redact any mongodb:// or mongodb+srv:// connection URIs containing credentials
  let message = String(err.message || "");
  message = message.replace(/mongodb(\+srv)?:\/\/[^\s@]+@/gi, "mongodb$1://<credentials_redacted>@");
  message = message.replace(/mongodb(\+srv)?:\/\/[^\s]+/gi, "mongodb$1://<redacted>");

  return { name, code, message };
}

/**
 * Safely clean MONGODB_URI without hard-coding or exposing credentials.
 * Removes surrounding quotes, inserts missing @ delimiter if omitted before cluster hostname,
 * and strips invalid ports from mongodb+srv:// URIs.
 */
export function cleanMongoUri(rawUri: string): string {
  let uri = rawUri.trim().replace(/^["']|["']$/g, "");

  // Fix missing @ delimiter before cluster/mongodb.net in mongodb+srv:// URIs if omitted
  if (uri.includes(".mongodb.net") && !uri.split(".mongodb.net")[0].includes("@")) {
    uri = uri.replace(
      /(mongodb\+srv:\/\/[^@\s]+?)(cluster[0-9]*|[a-z0-9-]+\.mongodb\.net)/i,
      (_m, p1, p2) => p1 + "@" + p2
    );
  }

  // If it's a mongodb+srv:// URI, remove any port specification if accidentally included (e.g. :27017 or :3000)
  if (uri.startsWith("mongodb+srv://")) {
    uri = uri.replace(/(mongodb\+srv:\/\/[^\/\?]+?)(:\d+)([\/\?].*)?$/i, (_match, p1, _p2, p3) => p1 + (p3 || ""));
  }

  return uri;
}

/**
 * Deterministically load environment variables from the project-root .env file.
 * Supports both standard KEY=VALUE format and unprefixed connection string lines.
 */
export function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });

    // Fallback: If process.env.MONGODB_URI is still empty, check if .env contains an unprefixed connection string line
    if (!process.env.MONGODB_URI || !process.env.MONGODB_URI.trim()) {
      try {
        const content = fs.readFileSync(envPath, "utf-8");
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("mongodb://") || trimmed.startsWith("mongodb+srv://")) {
            process.env.MONGODB_URI = trimmed;
            break;
          } else if (trimmed.startsWith("MONGODB_URI=")) {
            const val = trimmed.slice("MONGODB_URI=".length).trim();
            if (val) {
              process.env.MONGODB_URI = val;
              break;
            }
          }
        }
      } catch (_err) {
        /* ignore read errors */
      }
    }
  } else {
    dotenv.config({ override: true });
  }
}

// Load env on module initialization
loadEnv();

/**
 * Connect to MongoDB database using MONGODB_URI environment variable.
 * Gracefully logs status and warnings without halting server if MONGODB_URI is unconfigured.
 */
export async function connectDB(): Promise<typeof mongoose | null> {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  loadEnv();

  const rawUri = process.env.MONGODB_URI;
  const isConfigured = Boolean(rawUri && rawUri.trim());

  console.log(`[Database] MONGODB_URI configured: ${isConfigured ? "YES" : "NO"}`);

  if (!isConfigured || !rawUri) {
    console.warn(
      "[Database] MONGODB_URI environment variable is not configured. Server starting without database connection."
    );
    return null;
  }

  const cleanUri = cleanMongoUri(rawUri);

  try {
    const conn = await mongoose.connect(cleanUri);
    console.log("[Database] MongoDB connection result: CONNECTED");
    return conn;
  } catch (error) {
    const diag = getSafeErrorDiagnostics(error);
    console.error("[Database] MongoDB connection result: FAILED");
    console.error(`[Database] Error Name: ${diag.name}`);
    console.error(`[Database] Error Code: ${diag.code}`);
    console.error(`[Database] Error Message: ${diag.message}`);
    return null;
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("[Database] MongoDB connection lost.");
});

mongoose.connection.on("error", (err) => {
  const diag = getSafeErrorDiagnostics(err);
  console.error(`[Database] MongoDB connection error: ${diag.name} (${diag.code}) - ${diag.message}`);
});
