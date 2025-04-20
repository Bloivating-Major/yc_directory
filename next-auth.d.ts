import "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
    githubId?: string;
  }
}
