'use client';
import {AuthPage} from "../pages/AuthPage";
import {nanoid} from 'nanoid';
import dotenv from 'dotenv';

dotenv.config();
const DOMAIN = process.env.DOMAIN;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

/** 
 * This function generates a unique state key for the Oauth2 flow, protects against
 * XSRF attacks (anti-forgery unique session token)
 * Source for nanoid: https://stateful.com/blog/oauth-state-parameters-nodejs
 */
export async function CreateStateKey() {
    // use nanoid (URL-friendly, unique string ID generator for JavaScript.)
    const state = nanoid(32);
    // store in sessionStorage for later verification
    sessionStorage.setItem('oauth2_state', state);
    return state;
}

/**
 * After generating the state key, call this function to initiate the OAuth2 flow.
 */
export async function StepOne(stateKey) {
    // GET https://<canvas-install-url>/login/oauth2/auth?client_id=XXX&response_type=code&state=YYY&redirect_uri=https://example.com/oauth2response
    const url = `https://dlsu.instructure.com/login/oauth2/auth`

    const response = await fetch(url, {
        headers: {
            "client_id": API_KEY,
            "response_type": "code",
            "state": stateKey,
            "redirect_uri": encodeURIComponent('http://localhost:3000/auth/'),
            "host": "blocki.vercel.app", //temp fix
            "origin": "https://blocki.vercel.app", //temp fix 
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function StepTwo(responseJson) {
    // extract code from the response
    const code = responseJson.code;
    const state = responseJson.state;
    // verify state matches the one stored in sessionStorage
    const storedState = sessionStorage.getItem('oauth2_state');
}

export default async function StepThree() {
    const tokenUrl = `https://dlsu.instructure.com/login/oauth2/token`;

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', API_KEY);
    params.append('client_secret', API_SECRET);
    params.append('redirect_uri', 'http://localhost:3000/auth/');
    params.append('code', code);

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    });

    if (!response.ok) {
        throw new Error(`Failed to exchange code for token: ${response.status}`);
    }

    const data = await response.json();
    return data; // contains access_token, refresh_token, etc.
}

/**
 * function Auth() {
    return <AuthPage />;
}
 */

// async function main() {
//     const statekey = CreateStateKey();
//     const response = await StepOne(statekey);
//     const stepTwoResponse = await StepTwo(response);
//     const tokenResponse = await StepThree(stepTwoResponse);
//     console.log(response);
//     console.log(tokenResponse);
// }

// main();