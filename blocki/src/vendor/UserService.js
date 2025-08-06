/**
 * Handles User-related API requests to Canvas Instructure.
 */

export class UserService {
    constructor(canvasAPI) {
        this.canvasAPI = canvasAPI;
    }

    async getUserDetails() {
        // url:GET|/api/v1/users/:id
        return this.canvasAPI.get('/api/v1/users/self');
    }

    async getUserProfile() {
        // url:GET|/api/v1/users/:user_id/profile
        return this.canvasAPI.get('/api/v1/users/self/profile');
    }

    async getUserQuota() {
        // url:GET|/api/v1/users/:user_id/files/quota
    }
}