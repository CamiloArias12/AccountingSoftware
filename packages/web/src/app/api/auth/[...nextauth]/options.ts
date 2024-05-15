import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { exit } from 'process'

declare module 'next-auth' {
  interface Session {
    user: {
      name: any
      lastName: any
      email: any
      token: any
      rol: any
      token_expires: any
      token_start: any
      rol_name: any
      rol_id: any
      roles: any
      exit: any
    } & DefaultSession['user']
  }
  interface JWT extends DefaultJWT {
    user: {
      name: any
      email: any
      token: any
      rol: any
      rol_name: any
      rol_id: any
      roles: any
    } & DefaultJWT
  }
}

const AUTH = `
  mutation authUser($username: String!, $password: String!) {
    authUser(username: $username, password: $password) {
      token
      email
      name
      lastName
       roles {
      id
      name
      third
      saving
      credit
      type_account
      type_saving
      type_credit
      movement
      deferred
      cash
      roles
      disbursementvoucher
      note
      book_auxiliary
    }
    }
  }
`

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/'
  },
  secret: 'asfkasdl',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'ddentification', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      //@ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials
        console.log('juand', email, password)
        console.log('Env', process.env.API_ENDPOINT)
        try {
          const res = await fetch(process.env.API_ENDPOINT + '/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: AUTH,
              variables: {
                username: email,
                password: password
              }
            })
          })

          const user = await res.json()
          console.log(res)
          const date = Date.now()
          if (user.data) {
            console.log(user.data)
            return {
              name: user.data.authUser.name,
              lastName: user.data.authUser.lastName,
              email: user.data.authUser.email,
              token: user.data.authUser.token,
              rol: user.data.authUser.roles[0],
              rol_name: user.data.authUser.roles[0].name,
              rol_id: user.data.authUser.roles[0].id,
              roles: user.data.authUser.roles,
              token_start: date,
              exit: false,
              token_expires: date + 2 * 60 * 60 * 1000
            }
          } else {
            return null
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
  ],
  logger: {
    error(code, metadata) {
      console.log(code, metadata)
    },
    warn(code) {
      console.log(code)
    },
    debug(code, metadata) {
      console.log(code, metadata)
    }
  },
  debug: true,
  callbacks: {
    async jwt({ token, user, session, trigger, account }) {
      if (Number(token?.token_expires) < Date.now()) {
        return null
      }
      if (trigger === 'update') {
        return { ...session, ...session }
      }

      if (user) return { ...token, ...user }
      return token
    },

    async session({ token, session }) {
      session.user = {
        token_expires: token.token_expires,
        token_start: token.token_start,
        name: token.name,
        lastName: token.lastName,
        email: token.email,
        token: token.token,
        rol: token.rol,
        rol_name: token.rol_name,
        rol_id: token.rol_id,
        roles: token.roles,
        exit: token.exit
      }
      return session
    }
  }
}

export default authOptions
