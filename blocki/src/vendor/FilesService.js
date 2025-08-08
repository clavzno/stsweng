/**
 * Handles API requests involving files.
 */

export class FilesService {

    constructor(canvasAPI) {
        this.canvasAPI = canvasAPI;
        const blockiFolderId = null; 
    }

    async listFoldersAndFiles(rootFolderId) {
        // url:GET|/api/v1/folders/:id/all where id is folderid
        return this.canvasAPI.get('')
    }

    async listFilesForACourse(courseId) {
        // url:GET|/api/v1/courses/:course_id/files
        return this.canvasAPI.get(`/api/v1/courses/${courseId}/files`);
    }

    async listFilesForUser() {
        // url:GET|/api/v1/users/:user_id/files
        return this.canvasAPI.get('/api/v1/users/:user_id/files');
    }

    async listFilesForGroup(groupId) {
        // url:GET|/api/v1/groups/:group_id/files
        return this.canvasAPI.get(`/api/v1/groups/${groupId}/files`);
    }

    async listFilesForFolder(folderId) {
        // url:GET|/api/v1/folders/:id/files where id is the folder id
        return this.canvasAPI.get(`/api/v1/folders/${folderId}/files`);
    }

    async updateFile(fileId) {
        // url:PUT|/api/v1/files/:id where id is the target file id
        return this.canvasAPI.put(`/api/v1/files/${fileId}`);
    }

    async getFile(fileId) {
        // url:GET|/api/v1/files/:id, where id is the target file id
        return this.canvasAPI.get(`/api/v1/files/${fileId}`);
    }

    async postFile(fileId) {
        // url:POST|/api/v1/files/:id, where id is the target file id
        return this.canvasAPI.post(`/api/v1/files/${fileId}`);
    }

    async getFileForCourse(courseId, fileId) {
        // url:GET|/api/v1/courses/:course_id/files/:id, where id is the target file id
        return this.canvasAPI.get(`/api/v1/courses/${courseId}/files/${fileId}`);
    }

    async getFileForGroup(groupId, fileId) {
        // url:GET|/api/v1/groups/:group_id/files/:id, where id is the target file id
        return this.canvasAPI.get(`/api/v1/groups/${groupId}/files/${fileId}`);
    }

    async getFileForUser(fileId) {
        // url:GET|/api/v1/users/:user_id/files/:id, where id is the target file id
        return this.canvasAPI.get(`/api/v1/users/:user_id/files/${fileId}`); // using "self" for current user
    }

    async listFoldersWithinFolder(folderId) {
        // url:GET|/api/v1/folders/:id/folders where id=folder_id
        return this.canvasAPI.get(`/api/v1/folders/${folderId}/folders`);
    }

    async listAllFoldersInCourse(courseId) {
        // url:GET|/api/v1/courses/:course_id/folders
        return this.canvasAPI.get(`/api/v1/courses/${courseId}/folders`);
    }

    async listAllFoldersForUser() {
        // url:GET|/api/v1/users/:user_id/folders but instead of :user_id, we will be using “self”
        return this.canvasAPI.get('/api/v1/users/:user_id/folders');
    }
 
    async listAllFoldersForGroup(groupId) {
        // url:GET|/api/v1/groups/:group_id/folders
        return this.canvasAPI.get(`/api/v1/groups/${groupId}/folders`);
    }

    async getFolderWithinCourse(courseId, folderId) {
        // url:GET|/api/v1/courses/:course_id/folders/:id
        return this.canvasAPI.get(`/api/v1/courses/${courseId}/folders/${folderId}`);
    }

    async getFolderForUser(folderId) {
        // url:GET|/api/v1/users/:user_id/folders/:id but instead of :user_id, we will be using “self”
        return this.canvasAPI.get(`/api/v1/users/:user_id/folders/${folderId}`);
    }

    async getFolderForGroup(groupId, folderId) {
        // url:GET|/api/v1/groups/:group_id/folders/:id where id is the target folder id
        return this.canvasAPI.get(`/api/v1/groups/${groupId}/folders/${folderId}`);
    }
    
    async getFolder(folderId) {
        // url:GET|/api/v1/folders/:id where id is the target folder id
        return this.canvasAPI.get(`/api/v1/folders/${folderId}`);
    }

    async createFolderForUser(name) {
        // url:POST|/api/v1/users/:user_id/folders
        return this.canvasAPI.post('/api/v1/users/:user_id/folders', { name: name });
    }

    async getFileMetaData(file) {
        // This function can be used to get metadata of a file before uploading
        return {
            name: file.name,
            size: file.size,
            content_type: file.type,
            lastModified: file.lastModified
        };
    }
    
}