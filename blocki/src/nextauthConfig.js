/**
 * Created by Jack on 2025 07 06
 * Initializes the Auth.js/NextAuth configuration and NextAuth Object. DO NOT MOVE OR REMOVE THIS FILE.
 * The default base path (for API endpoints) becomes /api/auth for Next.js. So it would be https://blocki.vercel.app/api/auth
 * signIn and signOut are [basePath]/signin, /api/auth/signin, and [basePath]/signout, /api/auth/signout, respectively.
 * the callBack URL is /api/auth/callback/[provider] where provider si the providerid.
 * 
 * This doesn't follow the GUIDE.md for naming but instead follows the NextAuth.js documentation.
 */

import NextAuth from "next-auth"

const otherScopes = [
  "url:GET|/api/v1/users/:id",
  "url:GET|/api/v1/users/:user_id/profile",
  //"url:GET|/api/v1/groups/:group_id/files/quota",
  "url:GET|/api/v1/users/:user_id/files/quota",
  "url:GET|/api/v1/courses/:course_id/files",
  "url:GET|/api/v1/users/:user_id/files",
  "url:GET|/api/v1/groups/:group_id/files",
  "url:GET|/api/v1/folders/:id/files",
  "url:PUT|/api/v1/files/:id",
  "url:GET|/api/v1/files/:id",
  "url:POST|/api/v1/files/:id",
  "url:GET|/api/v1/courses/:course_id/files/:id",
  "url:GET|/api/v1/groups/:group_id/files/:id",
  "url:GET|/api/v1/users/:user_id/files/:id",
  "url:GET|/api/v1/folders/:id/folders",
  "url:GET|/api/v1/folders/:id/all",
  "url:GET|/api/v1/courses/:course_id/folders",
  "url:GET|/api/v1/users/:user_id/folders",
  "url:GET|/api/v1/groups/:group_id/folders",
  "url:GET|/api/v1/courses/:course_id/folders/:id",
  "url:GET|/api/v1/users/:user_id/folders/:id",
  "url:GET|/api/v1/groups/:group_id/folders/:id",
  "url:GET|/api/v1/folders/:id",
  "url:PUT|/api/v1/folders/:id",
  "url:POST|/api/v1/users/:user_id/folders",
  "url:POST|/api/v1/folders/:folder_id/files",
  "url:GET|/api/v1/courses",
  "url:GET|/api/v1/courses/:course_id/users",
  "url:GET|/api/v1/courses/:course_id/settings",
  "url:GET|/api/v1/courses/:id",
  "url:GET|/api/v1/courses/:course_id/assignments",
  "url:GET|/api/v1/users/:user_id/courses/:course_id/assignments",
  "url:GET|/api/v1/courses/:course_id/assignments/:id",
  "url:POST|/api/v1/courses/:course_id/assignments/:assignment_id/submissions",
  "url:GET|/api/v1/courses/:course_id/assignments/:assignment_id/submissions/:user_id",
  "url:POST|/api/v1/courses/:course_id/assignments/:assignment_id/submissions/:user_id/files",
  "url:PUT|/api/v1/courses/:course_id/assignments/:assignment_id/submissions/:user_id",
  "url:GET|/api/v1/courses/:course_id/tabs",
  "url:GET|/api/v1/users/:user_id/tabs",
  "url:GET|/api/v1/calendar_events",
  "url:POST|/api/v1/calendar_events",
  "url:GET|/api/v1/calendar_events/:id",
  "url:PUT|/api/v1/calendar_events/:id",
  "url:DELETE|/api/v1/calendar_events/:id",
  "url:GET|/api/v1/courses/:course_id/calendar_events/timetable",
  "url:POST|/api/v1/courses/:course_id/calendar_events/timetable_events",
  "url:GET|/api/v1/users/self/groups",
  //"url:GET|/api/v1/courses/:course_id/groups",
  "url:GET|/api/v1/groups/:group_id",
  "url:POST|/api/v1/groups",
  "url:POST|/api/v1/group_categories/:group_category_id/groups",
  "url:PUT|/api/v1/groups/:group_id",
  "url:GET|/api/v1/groups/:group_id/users",
  "url:POST|/api/v1/groups/:group_id/files",
  "url:GET|/api/v1/groups/:group_id/memberships",
  "url:POST|/api/v1/groups/:group_id/memberships",
  "url:POST|/api/v1/groups/:group_id/invite",
  "url:GET|/api/v1/groups/:group_id/memberships",
  "url:GET|/api/v1/groups/:group_id/memberships/:membership_id",
  "url:GET|/api/v1/groups/:group_id/users/:user_id",
  "url:POST|/api/v1/groups/:group_id/memberships",
  "url:DELETE|/api/v1/groups/:group_id/memberships/:membership_id",
  "url:DELETE|/api/v1/groups/:group_id/users/:user_id",
  "url:GET|/api/v1/announcements"
]

/**
 * Initialization of the NextAuth.js configuration
 * removed: const { handlers, signIn, signOut, auth } = NextAuth({})
 */
export const authOptions = {
  providers: [{
    id: "dlsuinstructure", // signIn("my-provider") and will be part of the callback URL
    name: "DLSU Instructure Canvas", // optional, used on the default login page as the button text.
    type: "oauth",
    issuer: "https://dlsu.instructure.com/.well-known/openid-configuration", // to infer the .well-known/openid-configuration URL
    clientId: process.env.API_KEY, // from the provider's dashboard
    clientSecret: process.env.API_SECRET, // from the provider's dashboard
    authorization: {
      url: "https://dlsu.instructure.com/login/oauth2/auth",
      params: {
        scope: otherScopes.join(" "),
        //scope: 'auth/userinfo', // provides user's name and id, see https://developerdocs.instructure.com/services/canvas/oauth2/file.oauth#oauth2-flow
        response_type: 'code',
        redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/dlsuinstructure", // the URL to redirect to after authorization
        purpose: "Blocki Oauth2 Authentication"
      }
    },
    token: "https://dlsu.instructure.com/login/oauth2/token", // the URL to exchange the code for an access token
    userinfo: "https://dlsu.instructure.com/api/v1/users/self/profile", // the URL to get the user information
    icon: "@/assets/canvas_logo.png"
  }],
  // overriding the default configuration below:
  // debug: true,
  // secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, trigger, session, account }) {
      if (account?.provider === "dlsuinstructure") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    // surface the jwt token using the session callback
    async session({ session, token }) {
      session.accessToken = token.accessToken // to access the access token do session.accessToken
      console.log("Session callback triggered:", session);
      console.log("Access Token:", session.accessToken);
      return session
    }
  }
}

export default authOptions;