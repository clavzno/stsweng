// This and all Canvas-related stuff will be placed here: blocki/src/vendor (vendor is for third-party APIs and services)

/**
 * Handles API requests to Canvas Instructure after the user has authenticated.
 */
export class CanvasAPI {
    // must pass the session access token here
    // example: const SESSION = await auth(); const TOKEN = SESSION.accessToken;
    constructor(accessToken, domain) {
        // added this to temporarily fix blocki - march 3 2026
        accessToken = process.env.DEFAULT_TOKEN; // fallback to default token if accessToken is falsy
        
        /* if (!accessToken || !domain) {
            throw new Error("Access token and domain are required to initialize CanvasAPI.");
        }*/

        this.accessToken = accessToken ?? process.env.DEFAULT_TOKEN; // fallback to default token if accessToken is falsy
        this.domain = domain; // dlsu.instructure.com
        this.baseUrl = `https://${domain}`;
        this.authorization = "Bearer " + this.accessToken;
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
     * Handles GET requests.
     * @param {*} endpoint 
     * @param {Object} params query parameters to append to the URL
     * @returns 
     */
    async get(endpoint, params = {}) {
        // example endpoint url:GET|/api/v1/users/:id
        endpoint = this.replaceId(endpoint);
        const url = new URL(`${this.baseUrl}${endpoint}`);

        //handle params where it starts with ?param1=value1&param2=value2
        if (typeof params == 'string') {
            // if given is literally "?param1=value1&param2=value2"
            url.search = params;
        } else if (typeof params == 'object' && Object.keys(params).length > 0) {
            // check if params is not empty
            // if CanvasAPI.get('endpoint', {param1: 'value1', param2: 'value2'})
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        console.log("CanvasAPI GET URL:", url.toString()); // REMOVE THIS IN PRODUCTION

        let RESPONSE;
        try {
            RESPONSE = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: this.authorization,
                },
            });
        } catch (error) {
            throw new Error(`Network error on GET ${endpoint}: ${error.message}`);
        }

        if (!RESPONSE || !RESPONSE.ok) {
            throw new Error(`GET ${endpoint} failed: ${RESPONSE?.status}`);
        }

        return RESPONSE;
    }

    /**
     * Handles POST requests.
     * File uploads require Content-Type: multipart/form-data
     * Form Data require Content-Type: application/json
     * @param {*} endpoint 
     * @param {*} data 
     * @returns 
     */

    async post(endpoint, data = {}) {
        // example endpoint url:POST|/api/v1/users/:user_id/folders
        endpoint = this.replaceId(endpoint);
        const url = new URL(`${this.baseUrl}${endpoint}`);

        console.log("CanvasAPI POST URL:", url.toString()); // REMOVE THIS IN PRODUCTION

        let RESPONSE;
        try {
            RESPONSE = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: this.authorization,
                },
                body: data instanceof FormData ? data : new URLSearchParams(data)
            });
        } catch (error) {
            throw new Error(`Network error on POST ${endpoint}: ${error.message}`);
        }

        if (!RESPONSE || !RESPONSE.ok) {
            throw new Error(`POST ${endpoint} failed: ${RESPONSE?.status}`);
        }

        return RESPONSE.json();
    }

    /**
     * Handles PUT requests.
     * @param {*} endpoint 
     * @param {*} data 
     * @returns 
     */
    async put(endpoint, data = {}) {
        // example endpoint URL: url:PUT|/api/v1/groups/:group_id
        endpoint = this.replaceId(endpoint);
        const url = new URL(`${this.baseUrl}${endpoint}`);

        console.log("CanvasAPI PUT URL:", url.toString()); // REMOVE THIS IN PRODUCTION

        let RESPONSE;
        try {
            RESPONSE = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: this.authorization,
                },
                body: new URLSearchParams(data)
            });
        } catch (error) {
            throw new Error(`Network error on PUT ${endpoint}: ${error.message}`);
        }

        if (!RESPONSE || !RESPONSE.ok) {
            throw new Error(`PUT ${endpoint} failed: ${RESPONSE?.status}`);
        }

        return RESPONSE.json();
    }

    /**
     * Handles DELETE requests.
     * @param {*} endpoint 
     * @param {Object} params query parameters to append to the URL 
     * @returns 
     */
    async delete(endpoint, params = {}) {
        // example endpoint url:DELETE|/api/v1/calendar_events/:id
        endpoint = this.replaceId(endpoint);
        const url = new URL(`${this.baseUrl}${endpoint}`);

        console.log("CanvasAPI DELETE URL:", url.toString()); // REMOVE THIS IN PRODUCTION

        //handle params where it starts with ?param1=value1&param2=value2
        if (typeof params == 'string') {
            // if given is literally "?param1=value1&param2=value2"
            url.search = params;
        } else if (typeof params == 'object' && Object.keys(params).length > 0) {
            // check if params is not empty
            // if CanvasAPI.get('endpoint', {param1: 'value1', param2: 'value2'})
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        let RESPONSE;
        try {
            RESPONSE = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: this.authorization,
                },
            });
        } catch (error) {
            throw new Error(`Network error on DELETE ${endpoint}: ${error.message}`);
        }

        if (!RESPONSE || !RESPONSE.ok) {
            throw new Error(`DELETE ${endpoint} failed: ${RESPONSE?.status}`);
        }

        return RESPONSE.json();
    }
}