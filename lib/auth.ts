import type { Session, UserRole } from "@/types/auth";

/**
 * TEMPORARY MOCK SESSION
 * -----------------------
 * Replace `getSession()` with a real Supabase session lookup later.
 * For now, flip the `role` below between "admin" and "user" to simulate
 * being logged in as either, since there's no real login flow wired up yet.
 */
const mockSession: Session = {
  id: "1",
  name: "Admin User",
  email: "admin@skillswap.com",
  role: "admin",
};

/** Returns the current session, or null if nobody is "logged in". */
export function getSession(): Session | null {
  return mockSession; // TODO: replace with real Supabase session lookup
}

export function isAuthenticated(
  session: Session | null
): session is Session {
  return session !== null;
}

export function hasRole(session: Session | null, role: UserRole): boolean {
  return session?.role === role;
}

/** Route prefixes each role is allowed to access. */
export const ROLE_ROUTES: Record<UserRole, string[]> = {
  user: ["/dashboard", "/explore", "/requests", "/chat", "/profile", "/settings"],
  admin: ["/admin"],
};

/** Where to send a user after login, or when they hit a route they can't access. */
export function getDefaultRouteForRole(role: UserRole): string {
  return role === "admin" ? "/admin" : "/dashboard";
}

/**
 * Given a pathname, returns which role "owns" that section of the app,
 * or null if the path isn't one of our protected areas.
 */
export function matchRoleForPath(pathname: string): UserRole | null {
  const isAdminRoute = ROLE_ROUTES.admin.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`)
  );
  if (isAdminRoute) return "admin";

  const isUserRoute = ROLE_ROUTES.user.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`)
  );
  if (isUserRoute) return "user";

  return null;
}

/** Central "can this session view this path" check. */
export function canAccess(session: Session | null, pathname: string): boolean {
  const requiredRole = matchRoleForPath(pathname);
  if (!requiredRole) return true; // not a protected route, no opinion here
  if (!isAuthenticated(session)) return false;
  return session.role === requiredRole;
}