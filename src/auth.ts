import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  BETTER_AUTH_SECRET: string;
  CMS_BASE_URL: string;
  CMS_BOOTSTRAP_TOKEN: string;
}

export function createAuth(env: Env) {
  const db = drizzle(env.DB);
  return betterAuth({
    appName: "AI Knowledge Hub CMS",
    baseURL: env.CMS_BASE_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 12,
      maxPasswordLength: 128
    },
    trustedOrigins: [env.CMS_BASE_URL],
    advanced: { useSecureCookies: true }
  });
}
