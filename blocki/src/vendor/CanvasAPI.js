// This and all Canvas-related stuff will be placed here: blocki/src/vendor (vendor is for third-party APIs and services)
// import { auth } from "../auth"

/**
 * Handles API requests to Canvas Instructure after the user has authenticated.
 */
const HEADER_CORS = {
    // Source: https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': "GET,DELETE,PATCH,POST,PUT",
    'Access-Control-Allow-Headers': "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
};

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
        this.authorization = "Bearer " + accessToken;
    }

    replaceId(endpoint) {
        // TODO: logic here to replace :id with "self" if it's a users/ endpoint

        if (endpoint.startsWith('/api/v1/users/')) {
            // Replace both :id and :user_id with 'self'
            return endpoint.replace(/:(id|user_id)/g, 'self');
        }

        // TODO: logic here to replace :id with the class_id if it's a courses/ endpoint

        /**if (endpoint.startsWith('/api/v1/courses/')) {
            // Replace both :id and :course_id with this.classId
            if (!this.classId) throw new Error("classId is not set in CanvasAPI");
            return endpoint.replace(/:(id|course_id)/g, this.classId);
        } **/

        // Return endpoint unchanged if no match
        return endpoint;
    }

    /**
     * @param {Object} params - query parameters to append to the URL.
     */
    async get(endpoint, params = {}) {
        // example endpoint url:GET|/api/v1/users/:id
        const url = new URL(`${this.baseUrl}${endpoint}`);

        //handle params where it starts with ?param1=value1&param2=value2
        if (typeof params == 'string') {
            // if given is literally "?param1=value1&param2=value2"
            url.search = params;
        } else if (typeof params == 'object' && Object.keys(params).length > 0) {
            // if CanvasAPI.get('endpoint', {param1: 'value1', param2: 'value2'})
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        console.log("CanvasAPI GET URL:", url.toString());

        const RESPONSE = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: this.authorization,
            },
        });

        if (!RESPONSE.ok) {
            throw new Error(`GET ${endpoint} failed: ${RESPONSE.status}`);
        }

        return RESPONSE;
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