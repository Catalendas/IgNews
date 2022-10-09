import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { query as q } from "faunadb";
import { fauna } from "../../../components/services/fauna";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  secret: String(process.env.NEXTAUTH_SECRET),
  callbacks: {
    async session({ session, token, user }) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(String(session?.user?.email))
                    )
                  )
                )
              ),
              q.Match(q.Index("subscription_by_status"), "active"),
            ])
          )
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch {
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        if (email) {
          await fauna.query(
            q.If(
              q.Not(
                q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
              ),
              q.Create(q.Collection("users"), { data: { email } }),
              q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            )
          );
        }

        return true;
      } catch (e) {
        return false;
      }
    },
  },
});