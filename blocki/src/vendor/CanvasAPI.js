// This and all Canvas-related stuff will be placed here: blocki/src/vendor (vendor is for third-party APIs and services)
// import { auth } from "../auth"

/**
 * Handles API requests to Canvas Instructure after the user has authenticated.
 */
export class CanvasAPI {
    // must pass the session access token here
    // example: const SESSION = await auth(); const TOKEN = SESSION.accessToken;
    constructor(accessToken, domain) {
        if (!accessToken || !domain) {
            throw new Error("Access token and domain are required to initialize CanvasAPI.");
        }

        this.accessToken = accessToken;
        this.domain = domain; // dlsu.instructure.com
        this.baseUrl = `https://${domain}`;
        this.authorization = "Authorization: Bearer " + accessToken;
    }

    replaceId(endpoint) {
        // TODO: logic here to replace :id with "self" if it's a users/ endpoint
        // TODO: logic here to replace :id with the class_id if it's a courses/ endpoint
    }

    async get(endpoint, params = {}) {
        // example endpoint url:GET|/api/v1/users/:id

        const URL = new URL(`${this.baseUrl}${endpoint}`);
        Object.entries(params).forEach(([key, value]) => URL.searchParams.append(key, value));
        
        const RESPONSE = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': this.authorization,
            },
        });

        if (!RESPONSE.ok) {
            throw new Error(`GET ${endpoint} failed: ${RESPONSE.status}`);
        }

        return RESPONSE.json();
    }

    async post(endpoint, data = {}) {
        // example endpoint url:POST|/api/v1/users/:user_id/folders


        const RESPONSE = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: this.authorization,
            body: data instanceof FormData ? data : new URLSearchParams(data)
        });

        if (!RESPONSE.ok) {
            const errorData = await RESPONSE.json().catch(() => ({}));
            throw new Error(`POST ${endpoint} failed: ${RESPONSE.status} - ${JSON.stringify(errorData)}`);
        }

        return RESPONSE.json();
    }

    async put(endpoint, data = {}) {
        const RESPONSE = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: this.authorization,
            body: new URLSearchParams(data)
        });

        if (!RESPONSE.ok) {
            throw new Error(`PUT ${endpoint} failed: ${RESPONSE.status}`);
        };

        return RESPONSE.json();
    }
}