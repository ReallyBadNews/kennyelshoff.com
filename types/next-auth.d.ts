import { Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's permissions role. `ADMIN` | `USER`. */
      role: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    /** The user's permissions role. `ADMIN` | `USER`. */
    role: Role;
  }
}
