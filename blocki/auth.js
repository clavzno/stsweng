import NextAuth from "next-auth";

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

// export const { handlers, signIn, signOut, auth } = NextAuth()

const authOptions = {
  providers: [
    {
      id: "dlsuinstructure", // do not change this ID
      name: "Instructure",
      type: "oauth", // "oidc",
      issuer: "https://dlsu.instructure.com",
      clientId: process.env.API_KEY,
      clientSecret: process.env.API_SECRET,
      // everything below this isn't part of the base configuration
      authorization: {
        url: "https://dlsu.instructure.com/login/oauth2/auth",
        token: "https://dlsu.instructure.com/login/oauth2/token",
        params: {
          scope: otherScopes.join(" "), // removed "openid " + 
          purpose: "Blocki Oauth2 Authentication",
          response_type: "code",
        },
      },
      // wellKnown: "https://dlsu.instructure.com/.well-known/openid-configuration", //only use if not using a full OIDC provider
      userinfo: "https://dlsu.instructure.com/api/v1/users/self/profile",
      profile(profile) {
        return {
          id: profile.id,
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
      // ONLY FOR LOCALHOST, REMOVE THIS IN PRODUCTION
      // checks: ["none"],
    },
  ],
  useSecureCookies: false, // makes cookies accessible to HTTP and HTTPS
  //trustHost: true,
  cookies: {
    state: {
      name: `__THIS_IS_THE_STATE_COOKIE__authjs.state`,
      httpOnly: false,
      hostOnly: false,
      sameSite: "lax",
      path: "/",
      secure: true,
    }
  },
  debug: true, // REMOVE THIS IN PRODUCTION
  callbacks: {
    jwt({ token, user, account }) {
      // in this callback you can add properties to the token
      /**
       * if (user) {
       * token.id = user.id;
       * }
       * return token;
       */
      if (account?.provider === "dlsuinstructure") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      // in this callback you can expose those properties to the client session
      /**
       * session.user.id = token.id;
       * return session;
       */
      session.accessToken = token.accessToken
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log("Final Redirect after login");
      console.log("URL:", url);
      console.log("Base URL:", baseUrl);
      return baseUrl + "/dashboard"; // redirect to the dashboard after login
    },
  },
};

const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
export { auth, handlers, signIn, signOut };

// callback URL:  https://blocki.vercel.app/api/auth/callback/{id}
