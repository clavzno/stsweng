import NextAuth from 'next-auth';
import { OAuthConfig } from "next-auth/providers";

/**
 * Our redirect URI for OAuth2 authentication.
 * This folder handles the OAuth2 authentication flow for the Canvas LMS.
 * Step 1:
 * https://blocki.vercel.app/api/oauth2/route
 * 
 * 
 * WIP MUNA TO GUYS
 */

import Providers from `next-auth/providers`
export default NextAuth({
    providers: [
        Providers.Twitter({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
        }),
        {
            id: 'customProvider',
            name: 'CustomProvider',
            type: 'oauth',
            version: '2.0',
            scope: ''  // Make sure to request the users email address
        }
    ]
})