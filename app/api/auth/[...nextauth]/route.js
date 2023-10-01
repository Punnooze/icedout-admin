import { connectMongoDB } from '@/lib/mongodb';
import Admin from '@/models/adminModel';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { name, password } = credentials;

        try {
          await connectMongoDB();
          const admin = await Admin.findOne({ name });

          if (!admin) return null;

          const passwordsMatch = await bcrypt.compare(password, admin.password);

          if (!passwordsMatch) return null;

          return admin;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
