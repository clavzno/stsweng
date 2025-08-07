/**
 * WIP!
 * Handles file upload.
 * Frontend files that include a file input are FileUploader.jsx, CourseHeader.jsx, CourseDetail.jsx, and PixelTracker.jsx
 */

export class UploadHandler {
    constructor(canvasApi) {
        this.canvasApi = canvasApi;
    }

    // should be replaced later with the file input 
    async getFileMetadata(filePath) {
        const fs = await import('fs');
        const path = await import('path');

        const fileStats = fs.statSync(filePath);
        return {
            name: path.basename(filePath),
            size: fileStats.size,
            type: path.extname(filePath),
            path: filePath
        };
    }

    // should be replaced later with the file input
    createReadStream(filePath) {
        const fs = require('fs');
        return fs.createReadStream(filePath);
    }

    // conducts step 1 where you make a file upload request
    async initiateFileUpload(folderId, fileMetadata) {
        const params = {
            name: fileMetadata.name,
            size: fileMetadata.size.toString(),
            parent_folder_id: folderId.toString(),
            on_duplicate: 'rename'
        };

        return this.apiClient.post(`/api/v1/folders/${folderId}/files`, params);
    }

    async uploadToUrl(uploadUrl, uploadParams, fileStream, fileMetadata) {
        const formData = new FormData();
        
        Object.entries(uploadParams).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append("file", fileStream, {
            filename: fileMetadata.name,
            contentType: fileMetadata.type,
        });

        const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
            headers: formData.getHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Upload failed: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        return response.json();
    }
}