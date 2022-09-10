import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default NextAuth({
  pages: {
    signIn: "/auth/signin"
  },
  providers: [
    Credentials({
        id: "credentials",
        name: "credentials",
        credentials: {
            password: { label: "Keyword", type: "text", placeholder: "super secret keyword" }
        },
        async authorize(credentials, req) {
          if (credentials.password === "sihahdus")
            return {
                id: 1,
                username : "sihahtaja"
            }
          else return null
        }
    })
  ],
})