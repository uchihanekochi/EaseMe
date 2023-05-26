import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
const prisma = new PrismaClient();




export const authOptions= {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET, 
  callbacks: {
    async session({ session }) {
        // store the user id from MongoDB to session
        const sessionUser = await prisma.user.findUnique({where:{ email: session.user.email }});
        session.user.id = sessionUser.id;
  
        return session;
      },
   
  },
  session: {
    strategy: 'jwt',
  },

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }