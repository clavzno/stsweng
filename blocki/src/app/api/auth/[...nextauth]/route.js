// should be placed in /app/api/auth/[...nextauth]/

// import { handlers } from "@/app/api/auth/[...nextauth]/route.js"
// export const { GET, POST } = handlers <-- becomes undefined
import NextAuth from "next-auth"
import { authOptions } from "../[...nextauth]/../../../../../auth" // do not change this path

import { auth, handlers, signIn, signOut } from "../[...nextauth]/../../../../../auth";
export const GET = handlers.GET;
export const POST = handlers.POST;