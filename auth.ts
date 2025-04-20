import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client";
import { client } from "./sanity/lib/client";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub({
    clientId: process.env.AUTH_GITHUB_ID!,
    clientSecret: process.env.AUTH_GITHUB_SECRET!,
  })],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile) return false;
      
      const githubId = profile.id?.toString();

      try {
        const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { 
          id: githubId 
        });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: githubId,
            name: user.name,
            username: profile.login,
            email: user.email,
            image: user.image,
            bio: profile.bio || "",
          });
        }

        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile.id.toString(),
          });
          
          if (user) {
            // Store both Sanity _id and GitHub id
            token.id = user._id;
            token.githubId = profile.id.toString();
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        if (session.user) {
          session.user.id = token.id;
        }
      }
      return session;
    },
  },
})
