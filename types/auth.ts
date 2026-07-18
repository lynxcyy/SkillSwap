export type UserRole = "admin" | "user";

export interface Session {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}