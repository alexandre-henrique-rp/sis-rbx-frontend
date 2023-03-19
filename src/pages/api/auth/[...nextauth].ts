import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const AuthOptions: NextAuthOptions = {
  jwt: {
    // secret: process.env.JWT_SIGNING_PRIVATE_KEY
    secret: "1235654787852"
  },

  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60 // 4 hours
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        // email: { label: "Email", type: "text", placeholder: "test@test.com" },
        // password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req: any) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = req.body;
        console.log(credentials);
        console.log(user);
        //validate user from db
        //if validate user from db = false
        if (email !== "Alexandre" || password !== "1234") {
          throw new Error("Credenciais invalida");
        }
        //if validate user from db = true
        return { id: "123", name: "Alexandr H", email: "teste@teste.com" };
      }
    })
  ],
  pages: {
    signIn: "/auth/signin"
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = !!user;
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = Math.floor(4 * 60 * 60); // 4 hours
      console.log(user)

      // se for login
      if (isSignIn) {
        // se nao tiver user ou não ter jwt ou não ter nome ou não ter email
        if (!user || !user.jwt || !user.name || !user.email) {
          //  mate o prosseso e desconsidere tudo
          return Promise.resolve({});
        }
        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.confirmed = user.confirmed;
        token.blocked = user.blocked;

        token.expiration = Math.floor(
          //expiração do tokem
          actualDateInSeconds + tokenExpirationInSeconds,
        );
      } else {
        if (!token?.expiration) return Promise.resolve({}); //se não exixtir o tmpo de expiração mate a navegação
        if (actualDateInSeconds > token.expiration) return Promise.resolve({}); // se se a data atual for maior que o tmpo de expiração mate a navegação
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (
        !token?.jwt ||
        !token?.id ||
        !token?.name ||
        !token?.email ||
        !token?.expiration
      ) {
        //se não exixtir o mate a navegação
        return null;
      }
      const dataUser: any = {
        id: token.id,
        name: token.name,
        email: token.email,
        confirmed: token.confirmed,
        blocked: token.blocked,
      };
      session.token = token.jwt;
      session.user = dataUser;
      return session;
    },
  },
};

export default NextAuth(AuthOptions);
