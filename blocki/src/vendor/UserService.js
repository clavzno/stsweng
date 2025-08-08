/**
 * Handles User-related API requests to Canvas Instructure.
 */
export class UserService {
    constructor(canvasAPI, filesService) {
        this.canvasAPI = canvasAPI;
        this.filesService = filesService;
    }

    async showUserDetails() {
        // url:GET|/api/v1/users/:id
        return this.canvasAPI.get('/api/v1/users/:id');
    }

    async getUserProfile() {
        // url:GET|/api/v1/users/:user_id/profile
        return this.canvasAPI.get('/api/v1/users/:user_id/profile');
    }

    async getUserQuotaInformation() {
        // url:GET|/api/v1/users/:user_id/files/quota
        const res = await this.canvasAPI.get('/api/v1/users/:user_id/files/quota');
        quota = res.quota;
        quota_used = res.quota_used;
        return { quota, quota_used };
    }

    async getUserRootFolderId() {
        // url:GET|/api/v1/users/:user_id/folders/root
        const res = await this.canvasAPI.get('/api/v1/users/:user_id/folders/root');
        rootFolderId = res.id;
        return rootFolderId;
    }
}