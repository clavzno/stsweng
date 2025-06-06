// file uploads
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer'; // testing 

// ?
import fetch from 'node-fetch';
import FormData from 'form-data';

// app classes
import { Student } from './Student.js';

//.env
import dotenv from 'dotenv';
dotenv.config();
const DOMAIN = process.env.DOMAIN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// API-related
const BASE_URL = `https://${DOMAIN}`;
const HEADER_CORS = {
    // Source: https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': "http://localhost:3000",
    'Access-Control-Allow-Methods': "GET,DELETE,PATCH,POST,PUT",
    'Access-Control-Allow-Headers': "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
};
const HEADER_AUTHORIZATION = { Authorization: `Bearer ${ACCESS_TOKEN}` };
const PARAMS_PAGINATION = new URLSearchParams({
    'per_page': 100, // default is 10, then you'll have to use a rel="current", "next", "prev" pagination system
});

/**
 * Handles API interactions with Canvas LMS. Not sure if we should 
 * make the student instance here or the student will call this one. -Jack
 */
export class CanvasService {
    activeStudent = null;

    constructor(accessToken = ACCESS_TOKEN, domain = DOMAIN) {
        this.domain = domain;
        this.accessToken = accessToken;
        if (!this.accessToken || !this.domain) {
            throw new Error("Access token and domain must be provided");
        }
        this.baseUrl = BASE_URL;
    }

    /**
     * Similar to GetUser() in working2.js
     * @returns {Promise<Object>}
     */
    async FetchUser() {
        const url = `${BASE_URL}/api/v1/users/self`;
        console.log("Fetching user info from: ", url);
        try {
            const res = await fetch(url, {
                headers: {
                    ...HEADER_AUTHORIZATION,
                    ...HEADER_CORS
                }
            })

            if (!res.ok) throw new Error(`Failed to fetch user info: ${res.status}`);
            const responseJson = await res.json();
            console.log(responseJson);
            return responseJson;
        } catch (error) {
            console.error("Error in FetchUser: ", error);
            throw error;
        }
    }

    /** 
     * Creates a new Student instance.
     * @param responseJson - The JSON response from the FetchUser method.
     */
    async CreateStudent() {
        const responseJson = await this.FetchUser();
        if (!responseJson) {
            throw new Error("Invalid response JSON");
        }
        const student = new Student(responseJson, BASE_URL, this.accessToken);
        this.activeStudent = student;
    }

    /**
     * Prints course names and IDs from the courses JSON.
     * @param {Array} coursesJson - The JSON array of courses.
     */
    PrintCourseNames(coursesJson) {
        console.log("PrintCourseNames: Printing courses...")
        if (!Array.isArray(coursesJson)) {
            throw new Error("Invalid courses JSON format");
        }

        coursesJson.forEach(course => {
            console.log(`Course Name: ${course.name}, Course ID: ${course.id}`);
        });
    }

    /** 
     * Gets student's courses, returns courses JSON with 100 courses per page.
     */
    async FetchCourses() {
        const url = `${BASE_URL}/api/v1/courses?${PARAMS_PAGINATION.toString()}`;
        console.log("FetchCourses > Fetching courses info from: ", url);
        try {
            const res = await fetch(url, {
                headers: {
                    ...HEADER_AUTHORIZATION,
                    ...HEADER_CORS
                }
            })

            if (!res.ok) throw new Error(`Failed to fetch courses info: ${res.status}`);
            const responseJson = await res.json();
            this.PrintCourseNames(responseJson);
            return responseJson;
        } catch (error) {
            console.error("Error in FetchCourses: ", error);
            throw error;
        }
    }

    /**
     * Fixed version of GetUserRootFolder() in working2.js
     * @returns {Promise<Object>} - Returns the root folder of the user.
     */
    async GetUserRootFolder() {
        const url = `${BASE_URL}/api/v1/users/${this.activeStudent.id}/folders/root/`;
        console.log("GetUserRootFolder > Fetching user root folder from: ", url);
        try {
            const res = await fetch(url, {
                headers: {
                    ...HEADER_AUTHORIZATION,
                    ...HEADER_CORS
                }
            })

            if (!res.ok) throw new Error(`Failed to fetch root folder: ${res.status}`);

            const responseJson = await res.json();
            console.log("Root folder located at: ", responseJson.id);
            this.activeStudent.studentRootFolderId = responseJson.id; // set the root folder ID in the student instance
            console.log(responseJson);

            this.GetFilesInFolder(this.activeStudent.studentRootFolderId);

            return responseJson;
        } catch (error) {
            console.error("Error in GetUserRootFolder: ", error);
            throw error;
        }
    }

    /**
     * Fixed version of ListFilesInAFolder() in working2.js
     * @param {*} folderId 
     * @returns 
     */
    async GetFilesInFolder(folderId) {
        const url = `${BASE_URL}/api/v1/folders/${folderId}/files?${PARAMS_PAGINATION.toString()}`;
        console.log("Fetching files in folder from: ", url);
        try {
            const res = await fetch(url, {
                headers: {
                    ...HEADER_AUTHORIZATION,
                    ...HEADER_CORS
                }
            })

            if (!res.ok) throw new Error(`Failed to fetch files in folder: ${res.status}`);
            const responseJson = await res.json();
            return responseJson;
        } catch (error) {
            console.error("Error in GetFilesInFolder: ", error);
            throw error;
        }
    }

    /**
     * Handles prompt to upload the file.
     * NOTE: Use a GUI framework so the webapp can open a prompt later on. 
     * npm.cmd install inquirer@latest: command line prompting tool, you have to enter the file path for now
     * testing only
     */
    async PromptToGetFile() {
        const { fileToUpload } = await inquirer.prompt([
            {
                type: 'input',
                name: 'fileToUpload',
                message: 'Enter the path to the file you want to upload:',
                validate: function (input) {
                    if (!fs.existsSync(input)) {
                        return 'File does not exist. Please enter a valid file path.';
                    }
                    if (!fs.statSync(input).isFile()) {
                        return 'Path is not a file. Please enter a valid file path.';
                    }
                    return true;
                }
            }
        ]);

        // Get file meta information
        const fileStats = fs.statSync(fileToUpload);

        const fileMetaData = {
            name: path.basename(fileToUpload),
            size: fileStats.size,
            type: path.extname(fileToUpload),
            path: fileToUpload
        }

        console.log("PromptToGetFile fileMetaData to be returned: ", fileMetaData);

        return fileMetaData;
    }

    /**
     * Fixed version of UploadFile in working2.js
     * @param {*} canvasPostOkLangBa: Canvas response from step 1
     * @param {*} fileStream: fileStream created in MakeFileUploadRequestToRoot
     * @param {*} fileMeta: file-related information
     * @returns {canvasUploadResponse} 
     */
    async UploadFileToUrl(canvasPostOkLangBa, fileStream, fileMeta) {
        try {
            const formData = new FormData();
            if (!canvasPostOkLangBa) throw new Error(`UploadFileToUrl: canvasResponse is empty: ${res.status}`);

            const uploadUrl = canvasPostOkLangBa.upload_url;
            const uploadParams = canvasPostOkLangBa.upload_params;

            console.log("UploadFileToUrl: Handling upload params...");
            for (const key in uploadParams) {
                formData.append(key, uploadParams[key]);
            }

            console.log("UploadFileToUrl: Handling fileStream and fileMeta...");
            formData.append("file", fileStream, {
                filename: fileMeta.name,
                contentType: fileMeta.type,
            });

            console.log("UploadFileToUrl: Beginning upload...")
            console.log("Uploading to: ", uploadUrl);
            const canvasUploadResponse = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
                headers: formData.getHeaders(),
            });

            // direct copy
            if (!canvasUploadResponse.ok) {
                const errorData = await canvasUploadResponse.json().catch(() => ({}));
                throw new Error(`Upload failed: ${canvasUploadResponse.status} - ${JSON.stringify(errorData)}`);
            }

            return await canvasUploadResponse.json();
        } catch (error) {
            console.error("Error in UploadFileToUrl: ", error);
            throw error;
        }
    }

    /**
     * Fixed verion of ExecuteUpload() in working2.js
     * Begins process of uploading a file to the user's root folder.
     * File Upload Documentation: https://canvas.instructure.com/doc/api/file.file_uploads.html#method.file_uploads.post
     * API for Uploading Files: https://canvas.instructure.com/doc/api/files.html#method.folders.create_file
     * @param {string} filePath - The path to the file to be uploaded.
     */
    async MakeFileUploadRequestToRoot() {
        console.log("Active student making upload request: ", this.activeStudent);

        try {
            // Step 0: Get file information
            const fileMeta = await this.PromptToGetFile();
            console.log("fileMeta returned: ", fileMeta);

            // Step 1: Telling Canvas about the file upload and getting a token
            const canvasFolderPathId = await this.GetUserRootFolder(); // get the target folder location, for now it's root
            console.log("target folder: ", canvasFolderPathId);
            const canvasPostResponse = await this.MakeFilePostRequest(canvasFolderPathId.id, fileMeta);

            // Step 2: Upload the file data to the URL given in the previous response
            const fileStream = fs.createReadStream(fileMeta.path);
            console.log("MakeFileUploadRequestToRoot > Received response from Canvas: ", canvasPostResponse);
            /**
             * Should receive
             * file_param
             * progress: null
             * upload_url
             * upload_params {filename: , content_type: }
             */
            const uploadSuccess = await this.UploadFileToUrl(canvasPostResponse, fileStream, fileMeta);

            // Step 3: Confirm the upload's success
            console.log("MakeFileUploadRequestToRoot > Upload success response:", uploadSuccess);
            return uploadSuccess; // returns the response from the upload
        } catch (error) {
            console.error("Error in MakeFileUploadRequestToRoot: ", error);
            throw error;
        }

    }

    /**
     * Similar to StartFileUpload() in working2.js
     * Makes a POST request to canvas and receives a response kung ok lang
     * @param {*} canvasFolderPathId 
     * @param {*} fileMeta 
     * @returns 
     */
    async MakeFilePostRequest(canvasFolderPathId, fileMeta) {
        const params = new URLSearchParams({
            name: fileMeta.name,
            size: fileMeta.size.toString(),
            // leaving out content_type so it can guess
            parent_folder_id: canvasFolderPathId.toString(),
            // parent_folder_path
            on_duplicate: 'rename'
        })

        const url = `${BASE_URL}/api/v1/folders/${canvasFolderPathId}/files`;
        console.log("Attempting file upload (step 1) at: ", url);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    ...HEADER_AUTHORIZATION,
                    ...HEADER_CORS
                },
                body: params,
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(`Failed to start file upload: ${res.status} - ${JSON.stringify(errorData)}`);
            }
            const responseJson = await res.json();
            console.log("Received response from Canvas in MakeFilePostRequest", responseJson);
            return responseJson;
        } catch (error) {
            console.error("Error in MakeFilePostRequest: ", error);
            throw error;
        }
    }

    async GetAssignmentsInCourse(courseId) {
        const url = `${BASE_URL}/api/v1/courses/${courseId}/assignments?${PARAMS_PAGINATION.toString()}`;
        console.log("Fetching assignments for course ID: ", courseId, " from: ", url);
        try {
            const res = await fetch(url, {
                headers: {
                    ...HEADER_AUTHORIZATION,
                    ...HEADER_CORS
                }
            });

            if (!res.ok) throw new Error(`Failed to fetch assignments: ${res.status}`);
            const responseJson = await res.json();
            console.log("GetAssignmentsInCourse > Assignments fetched successfully: ", responseJson);
            this.PrintCourseNames(responseJson); // testing lang
            return responseJson;
        } catch (error) {
            console.error("Error in GetCourseAssignments: ", error);
            throw error;
        }
    }

    /**
     * Grade or Comment on a submission: https://canvas.instructure.com/doc/api/submissions.html#method.submissions_api.update
     * Submissions API: https://www.canvas.instructure.com/doc/api/submissions.html
     *  PUT /api/v1/courses/:course_id/assignments/:assignment_id/submissions/:user_id 
     * @param {*} assignmentId 
     * @param {*} comment 
     */
    async AddCommentToAssignment(courseId, assignmentId, comment) {
        const url = `${BASE_URL}/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions/${this.activeStudent.id}`;
        console.log("Attempting to make a comment at: ", url);
        const params = new URLSearchParams({
            "comment[text_comment]": comment
        })

        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    ...HEADER_AUTHORIZATION,
                    ...HEADER_CORS,
                },
                body: params,
            });

            if (!res.ok) throw new Error(`Failed to add comment: ${res.status}`);
            const responseJson = await res.json();
            console.log("AddCommentToAssignment > Comment added successfully: ", responseJson);
            return responseJson;
        } catch (error) {
            console.error("Error in AddCommentToAssignment: ", error);
            throw error;
        }
    }

    /**
     * NOTE: SET TO RETURN THE FIRST ASSIGNMENT
     * @returns 
     */
    async GetOneAssignmentInCourse() {
        const url = `${BASE_URL}/api/v1/courses/${courseId}/assignments?${PARAMS_PAGINATION.toString()}`;
        console.log("Fetching assignments for course ID: ", courseId, " from: ", url);
        try {
            const res = await fetch(url, {
                headers: {
                    ...HEADER_AUTHORIZATION,
                    ...HEADER_CORS
                }
            });

            if (!res.ok) throw new Error(`Failed to fetch assignments: ${res.status}`);
            const responseJson = await res.json();
            console.log("GetAssignmentsInCourse > Assignments fetched successfully: ", responseJson);
            this.PrintCourseNames(responseJson); // testing lang
            return responseJson[0]; // returns the first assignment
        } catch (error) {
            console.error("Error in GetCourseAssignments: ", error);
            throw error;
        }
    }

    /**
     * Would have a similar process to MakeFileUploadRequestToRoot
     * will use submission[file_ids][] so we can use the file ID from the previous upload
     * https://www.canvas.instructure.com/doc/api/submissions.html#method.submissions.create
     * Submit Assignment: https://www.canvas.instructure.com/doc/api/submissions.html#method.submissions.create
     * POST /api/v1/courses/:course_id/assignments/:assignment_id/submissions 
     */
    async MakeFileUploadRequestToAssignment(courseId, assignmentId) {
        try {
            // Step 1: Upload the file to user's root folder
            const uploadedFile = await this.MakeFileUploadRequestToRoot();
            const uploadedFileId = uploadedFile.id;
            
            // Step 2: Submit the assignment with the file ID
            const url = `${BASE_URL}/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions`;
            console.log("MakeFileUploadRequestToAssignment > Submitting assignment at: ", url);
            
            const params = new URLSearchParams({
                "comment[text_comment]": "If a new file has been uploaded, then the API call to upload files to submissions has worked!",
                "submission[submission_type]": "online_upload",
                "submission[file_ids][]": uploadedFileId,
                "attempt": ""
            });

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    ...HEADER_AUTHORIZATION,
                    ...HEADER_CORS,
                },
                body: params,
            });

            const responseJson = await res.json();
            if (!res.ok) throw new Error(`Failed to submit assignment: ${res.status}`);

            console.log("MakeFileUploadRequestToAssignment > File uploaded as submission: ", responseJson);
            return responseJson; // returns the first assignment
        } catch (error) {
            console.error("Error in MakeFileUploadRequestToRoot: ", error);
            throw error;
        }

    }

}