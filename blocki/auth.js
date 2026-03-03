import NextAuth from "next-auth";
import { getDatabase } from "./src/MongoDB/MongoDB";
import Credentials from "next-auth/providers/credentials";

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
  "url:GET|/api/v1/announcements",
];

const authOptions = {
  providers: [
    Credentials({
      id: "manualtoken",
      name: "Manual Token",
      credentials: {
        accessToken:{ label: "Canvas Access Token", type: "password" }
      },
      async authorize(credentials) {
        const accessToken = credentials.accessToken;
        if (!accessToken) return null;
        const res = await fetch("https://dlsu.instructure.com/api/v1/users/self/profile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) return null;
        const profile = await res.json();
        console.log("profileid: ", profile.id);
        return {
          id: profile.id, // this is available, but we're not allowed to use it
          accessToken,
          name: profile.name,
          email: profile.primary_email,
          short_name: profile.short_name,
          sortable_name: profile.sortable_name,
          avatar: profile.avatar_url,
          pronouns: profile.pronouns,
          title: profile.title,
          bio: profile.bio,
          pronunciation: profile.pronunciation,
          login_id: profile.login_id,
          time_zone: profile.time_zone,
          locale: profile.locale,
          effective_locale: profile.effective_locale,
          calendar_ics: profile.calendar?.ics,
          lti_user_id: profile.lti_user_id, 
        }
      },
      async jwt({ token, user, account, profile }){
        if (user?.accessToken) {
          token.accessToken = user.accessToken;
          token.email = user.email;
          token.shortName = user.shortName;
          token.avatarUrl = user.avatar;
        }
        return token;
      },
      async session({ session, token }) {
      // refer to https://authjs.dev/reference/core#session
      // in this callback you can expose those properties to the client session
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.shortName = token.shortName;
      session.avatarUrl = token.avatarUrl;
      session.email = token.email;
      console.log("--- SESSION CALLBACK ---");
      console.log("Session Access Token: ", session.accessToken);
      console.log("Session email: ", session.email);
      console.log("--- ---");
      return session;
      },
      async redirect({ url, baseUrl }) {
        console.log("URL:", url); // REMOVE THIS IN PRODUCTION
        console.log("Base URL:", baseUrl); // REMOVE THIS IN PRODUCTION

        if (url.endsWith("/dashboard")) {
          return baseUrl + "/login";
        }

        if (url.endsWith("/login")) {
          return baseUrl + "/dashboard";
        }

        return baseUrl; // default: redirect to base URL
      },
    }),
    // ------------------------- DLSU OAUTH2 PROVIDER -------------------------
    {
      id: "dlsuinstructure", // do not change this ID
      name: "Instructure",
      type: "oauth",
      issuer: "https://dlsu.instructure.com",
      clientId: process.env.API_KEY,
      clientSecret: process.env.API_SECRET,
      // everything below this isn't part of the base configuration
      authorization: {
        url: "https://dlsu.instructure.com/login/oauth2/auth",
        token: "https://dlsu.instructure.com/login/oauth2/token",
        params: {
          scope: otherScopes.join(" "),
          purpose: "Blocki Oauth2 Authentication",
          response_type: "code",
        },
      },
      userinfo: "https://dlsu.instructure.com/api/v1/users/self/profile",
      profile(profile) {
        // profile = /userinfo response
        /**
         * console.log("--- PROFILE CALLBACK ---");
         * console.log("Profile: ", profile);
         * console.log("--- ---");
         */
        return {
          id: profile.id, // this is available, but we're not allowed to use it
          name: profile.name,
          email: profile.primary_email,
          short_name: profile.short_name,
          sortable_name: profile.sortable_name,
          avatar: profile.avatar_url,
          pronouns: profile.pronouns,
          title: profile.title,
          bio: profile.bio,
          pronunciation: profile.pronunciation,
          login_id: profile.login_id,
          time_zone: profile.time_zone,
          locale: profile.locale,
          effective_locale: profile.effective_locale,
          calendar_ics: profile.calendar?.ics,
          lti_user_id: profile.lti_user_id,
        };
      },
      token: "https://dlsu.instructure.com/login/oauth2/token",
    },
  ],
  // ------------------------- DLSU -------------------------
  debug: true, // MAKE FALSE IN PRODUCTION
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log("--- JWT CALLBACK ---");
      if (account?.provider === "dlsuinstructure") {
        // REMOVE THIS IN PRODUCTION
        console.log("JWT Token: ", token);
        console.log("User: ", user);
        console.log("Account Access Token: ", account.access_token);
        console.log("Refresh Token: ", account.refresh_token);
        console.log("--- ---");

        // DB
        // Upsert user in MongoDB if user exists
        if (user) {
          const db = await getDatabase();
          await db.collection("Students").updateOne(
            { email: user.email },
            // if user logs in for the first time, show welcome modal. If not, do not show
            { $set: { lastLogin: new Date() } },
            { upsert: true }
          );

          // Upsert preferences (example: dark mode default)
          await db.collection("Preferences").updateOne(
            { email: user.email },
            { $setOnInsert: { darkMode: true } }, // only sets if new
            { upsert: true }
          );

          // Upsert tasks (example: create empty array if new)
          await db.collection("Tasks").updateOne(
            { email: user.email },
            { $setOnInsert: { tasks: [] } }, // only sets if new
            { upsert: true }
          );

          console.log("Database connection established and user upserted in all collections.");

          // profile-related
          token.shortName = profile.short_name ? profile.short_name : profile.name;
          token.avatarUrl = profile.avatar_url;
          token.email = profile.primary_email;

          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            shortName: profile.short_name,
            avatarUrl: profile.avatar_url,
            email: profile.primary_email
          };
        }
      }

      return token; // DO NOT CHANGE THIS 
    },
    async session({ session, token }) {
      // refer to https://authjs.dev/reference/core#session
      // in this callback you can expose those properties to the client session
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.shortName = token.shortName;
      session.avatarUrl = token.avatarUrl;
      session.email = token.email;
      console.log("--- SESSION CALLBACK ---");
      console.log("Session Access Token: ", session.accessToken);
      console.log("Session email: ", session.email);
      console.log("--- ---");
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("URL:", url); // REMOVE THIS IN PRODUCTION
      console.log("Base URL:", baseUrl); // REMOVE THIS IN PRODUCTION

      if (url.endsWith("/dashboard")) {
        return baseUrl + "/login";
      }

      if (url.endsWith("/login")) {
        return baseUrl + "/dashboard";
      }

      return baseUrl; // default: redirect to base URL
    },
  },
};

const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
export { auth, handlers, signIn, signOut };
