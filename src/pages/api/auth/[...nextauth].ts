import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";




const AuthOptions: NextAuthOptions = {
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 hours
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        };
        console.log(credentials)
        //validate user from db
        //if validate user from db = false
        if(email !== 'Alexandre' || password !== '1234'){
          throw new Error('Credenciais invalida');
        }
        //if validate user from db = true
        return {id: '123', name: 'Alexandr H', email: 'teste@teste.com'}
      },
    })
  ],
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(AuthOptions);
