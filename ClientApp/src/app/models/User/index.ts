type UserRole = "user" | "librarian";

export class User {
  id: number;
  userRole: UserRole;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;
}
