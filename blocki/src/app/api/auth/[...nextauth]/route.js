// Created by Jack on 2025-07-06
// for Auth.js Route Handling, this file specifically uses the App Router of Next.js
// /app/api/auth/[...nextauth]/route.ts
// DO NOT MOVE OR REMOVE THIS FILE

import { handlers } from "../../../../auth"  // "@/auth" Referring to the auth.ts we just created
export const { GET, POST } = handlers
export { auth as middleware } from "../../../../auth" // Optional middleware export, updates session expiry
