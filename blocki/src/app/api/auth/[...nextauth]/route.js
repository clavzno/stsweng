// Created by Jack on 2025-07-06
// for Auth.js Route Handling, this file specifically uses the App Router of Next.js
// /app/api/auth/[...nextauth]/route.ts
// DO NOT MOVE OR REMOVE THIS FILE

// import { handlers, signIn, signOut, auth } from "../../../../auth"; // "@/auth" Referring to the auth.ts we just created
// import { handlers } from "../../../../auth"  
// export const { GET, POST } = handlers
// export { auth as middleware } from "../../../../auth" // Optional middleware export, updates session expiry

import NextAuth from "next-auth";
import authOptions from "../../../../nextauthConfig";

import { auth, handlers, signIn, signOut } from "../../../../nextauthConfig";

// AuthJS: For Next.js App Router, you must export HTTP method handlers (such as GET and POST) from route.js, not a default export or a handler variable.

// export const GET = handler;
// export const POST = handler;

// AuthJS: only GET and POST can be exported from this route.js file
export const GET = handlers.handlers.GET;
export const POST = handlers.handlers.POST;

// console.log("POST FUNCTION", POST) --> returns "t"
