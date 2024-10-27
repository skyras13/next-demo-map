// import NextAuth from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import FacebookProvider from 'next-auth/providers/facebook'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { MongoDBAdapter } from '@auth/mongodb-adapter'
// import clientPromise from '@/lib/mongodb'

// const handler = NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID,
//       clientSecret: process.env.FACEBOOK_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'text',
//           placeholder: 'jsmith@example.com',
//         },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials, req) {
//         // Add your own logic here to validate credentials
//         // This is where you would typically check against your database
//         if (
//           credentials.email === 'user@example.com' &&
//           credentials.password === 'password'
//         ) {
//           return { id: '1', name: 'J Smith', email: 'jsmith@example.com' }
//         } else {
//           return null
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id
//       }
//       return session
//     },
//   },
// })

// export { handler as GET, handler as POST }
