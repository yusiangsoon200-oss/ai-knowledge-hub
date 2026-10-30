import { createAuth, type Env } from "./auth";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({ ok: true, service: "ai-knowledge-hub-cms" });
    }

    if (url.pathname === "/admin" || url.pathname === "/admin/") {
      return Response.redirect(new URL("/admin/login.html", url), 302);
    }

    // Protect dashboard and all future admin pages at the Worker boundary.
    // Client-side redirects are only a usability feature, never an access control.
    if (url.pathname.startsWith("/admin/") && !url.pathname.startsWith("/admin/login")) {
      const auth = createAuth(env);
      const session = await auth.api.getSession({ headers: request.headers });
      if (!session) {
        return Response.redirect(new URL("/admin/login.html", url), 302);
      }
    }

    if (url.pathname.startsWith("/api/auth/")) {
      if (url.pathname === "/api/auth/sign-up/email" && request.method === "POST") {
        const suppliedToken = request.headers.get("x-cms-bootstrap-token");
        if (!env.CMS_BOOTSTRAP_TOKEN || suppliedToken !== env.CMS_BOOTSTRAP_TOKEN) {
          return json({ error: "Registration is closed. Ask the site owner for access." }, 403);
        }

        const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM user")
          .first<{ total: number }>();

        if ((count?.total ?? 0) > 0) {
          return json({ error: "The initial administrator has already been created." }, 403);
        }
      }

      return createAuth(env).handler(request);
    }

    return env.ASSETS.fetch(request);
  }
};
