/**
 * Handles API requests to Canvas involving assignments within courses.
 */

export class AssignmentService {
    constructor(canvasAPI) {
        this.canvasAPI = canvasAPI;
    }

    async submitAssignment(courseId, assignmentId, uploadedFileId, params = {}) {
        /**
         * URLSEARCHPARAMS:
         * optional: "comment[text_comment]": "Uploaded via Blocki"
         * required: "submission[submission_type]": "online_upload"
         * required: "submission[file_ids][]": uploadedFileId
         * optional: "attempt: """
         */

        const urlParams = new URLSearchParams({
            "submission[submission_type]": "online_upload",
            "submission[file_ids][]": uploadedFileId,
            ...params
        });

        const uploadResponse = await this.canvasAPI.post(
            `/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions`,
            urlParams
        );
        
        return uploadResponse;
    }
}