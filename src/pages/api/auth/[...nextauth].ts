import NextAuth, { Account, Profile, Session, User } from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'
import type { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CognitoProvider({
      clientId: String(process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID),
      clientSecret: String(process.env.COGNITO_APP_CLIENT_SECRET),
      issuer: `https://cognito-idp.us-east-1.amazonaws.com/${process.env.COGNITO_USER_POOL}`,
    }),
  ],
  callbacks: {
    async jwt(params: {
      token: JWT
      user: User | AdapterUser
      account: Account | null
      profile?: Profile | undefined
    }) {
      if (params.account) {
        params.token.access_token = params.account.access_token
      }

      if (params.profile) {
        params.token.user_attributes = params.profile
      }

      return params.token
    },
    async session(params: { session: Session; token: JWT; user: AdapterUser }) {
      // @ts-ignore
      params.session.access_token = params.token.access_token
      // @ts-ignore
      params.session.user.attributes = params.token.user_attributes

      return params.session
    },
  },
}

export default NextAuth(authOptions)
