// This and all Canvas-related stuff will be placed here: blocki/src/vendor (vendor is for third-party APIs and services)

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

    /**
     * Replaces :id or :user_id with self for Instructure ID privacy.
     * @param {String} endpoint 
     * @returns either edited or same version of endpoint
     */
    replaceId(endpoint) {
        // sample endpoint 1: GET|/api/v1/courses/:course_id/assignments/:assignment_id/submissions/:user_id
        // sample endpoint 2: POST|/api/v1/courses/:course_id/assignments/:assignment_id/submissions/:user_id/files
        // sample endpoint 3: GET|/api/v1/users/:user_id/courses/:course_id/assignments

        // Replace both :id and :user_id with 'self'
        if (endpoint === '/api/v1/users' || endpoint.startsWith('/api/v1/users?')) {
            return endpoint;
        }

        if (endpoint.startsWith('/api/v1/users/')) {
            return endpoint.replace(/:(id|user_id)/g, 'self');
        }

        if (endpoint.startsWith('/api/v1/courses/')) {
            return endpoint.replace(/:(user_id)/g, 'self');
        }

        // Return endpoint unchanged if no match
        return endpoint;
    }

    /**
     * @param {Object} params - query parameters to append to the URL.
     */
    async get(endpoint, params = {}) {
        endpoint = this.replaceId(endpoint);

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

        console.log("CanvasAPI GET URL:", url.toString()); // REMOVE THIS IN PRODUCTION

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

    /**
     * File uploads require Content-Type: multipart/form-data
     * Form Data require Content-Type: application/json
     * @param {*} endpoint 
     * @param {*} data 
     * @returns 
     */

    async post(endpoint, data = {}) {
        endpoint = this.replaceId(endpoint);
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
        endpoint = this.replaceId(endpoint);
        // example endpoint URL: 
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