import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const key = () => new TextEncoder().encode(process.env.AUTH_SECRET!);
export const COOKIE = "lyondev_session";
export type Role = "ADMIN" | "EDITOR" | "SALES";
export type Session = { uid: string; role: Role };
const PERMS: Record<Role, string[]> = { ADMIN: ["*"], EDITOR: ["content"], SALES: ["leads"] };
export const can = (r: Role, p: string) => PERMS[r].includes("*") || PERMS[r].includes(p);

export async function createSession(s: Session) {
  const token = await new SignJWT(s).setProtectedHeader({ alg: "HS256" }).setExpirationTime("8h").sign(key());
  (await cookies()).set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 28800 });
}
export async function getSession(): Promise<Session | null> {
  const t = (await cookies()).get(COOKIE)?.value;
  if (!t) return null;
  try { return (await jwtVerify(t, key())).payload as unknown as Session; } catch { return null; }
}
/** Server-side permission check: call at the top of every admin page and action. */
export async function requirePerm(perm?: string) {
  const s = await getSession();
  if (!s) redirect("/admin/login");
  if (perm && !can(s.role, perm)) redirect("/admin/dashboard");
  return s;
}
