"use client";
/**
 * This brings everything together for the Canvas API.
 */
import { AssignmentService } from './AssignmentService.js';
import { CanvasAPI } from './CanvasAPI.js';
// CourseService - refer to api/canvas/courses and coursepage route.js
import { FilesService } from './FilesService.js';
import { UserService } from './UserService.js';

class CanvasService {
    constructor(accessToken, domain = "dlsu.instructure.com") {
        this.canvasAPI = new CanvasAPI(accessToken, domain);
        this.filesService = new FilesService(this.canvasAPI);
        this.userService = new UserService(this.canvasAPI, this.filesService);
        this.assignmentService = new AssignmentService(this.canvasAPI);

        this.initializeBlockiFolder();
        console.log("CANVAS SERVICE INITIALIZED!!!!!!!!!!!!!!!!!");
    }

    async initializeBlockiFolder() {
        // all uploads through Blocki will go in this folder
        const rootFolderId = await this.userService.getUserRootFolderId();
        if (!rootFolderId) {
            throw new Error("Root folder ID not found for the user.");
        }
        // check if BlockiUploads folder exists
        const folders = await this.filesService.listFoldersWithinFolder(rootFolderId);
        let blockiFolder = folders.find(folder => folder.name === "BlockiUploads");
        let blockiFolderId = blockiFolder ? blockiFolder.id : null;

        if (!blockiFolderId) {
            // if it doesn't exist, create it
            blockiFolder = await this.filesService.createFolderForUser("BlockiUploads");
        } else {
            blockiFolderId = blockiFolder.id;
        }

        // set the blockiFolderId in FilesService for future use
        this.filesService.blockiFolderId = blockiFolderId;
    }

    async initiateFileUpload(file) {
        // relevant endpoint is always the BlockiUploads folder
        // parent_folder_id = blockiFolderId 
        // parent_folder_path = getFolderForUser(blockiFolderId)
        const blockiFolderId = this.filesService.blockiFolderId;

        const folderPath = await this.filesService.getFolderForUser(blockiFolderId);
        console.log("target folder: ", folderPath);
        console.log("Blocki folder ID: ", blockiFolderId);
        console.log("Attempting POST request to upload file to BlockiUploads folder...");

        const fileParams = new URLSearchParams({
            name: file.name,
            size: file.size.toString(),
            parent_folder_id: blockiFolderId,
            on_duplicate: 'rename'
        });

        const response = await this.canvasAPI.post(folderPath, fileParams);

        if (!response || !response.upload_url) {
            throw new Error("Failed to get upload URL for the file.");
        }

        // step 2: extract the upload URL and upload the file to the URL
        const uploadUrl = response.upload_url;

        const uploadResponse = await this.canvasAPI.post(uploadUrl, file);
        const fileId = uploadResponse.id;
        return fileId;
    }

    async uploadAssignment(file, courseId, assignmentId) {
        const endpoint = `/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions/self/files`;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await this.canvasAPI.post(endpoint, formData);
            return response;
        } catch (error) {
            console.error('Error uploading assignment:', error);
            throw error;
        }
    }
}

export default CanvasService;