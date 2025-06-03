import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import FormData from 'form-data'

// .env
const DOMAIN = process.env.DOMAIN;
const FOLDER = 'Test';
const FILE_PATH = 'example.pdf'
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// API
const BASE_URL = `https://${DOMAIN}`;
const CORS = {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': "http://localhost:3000",
    'Access-Control-Allow-Methods': "GET,DELETE,PATCH,POST,PUT",
    'Access-Control-Allow-Headers': "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
}

// API ENDPOINTS
const PARAMS_COURSES_ACTIVE = new URLSearchParams({
    'state[]': 'available', // only published courses
    'enrollment_state': 'active',
    'include[]': 'favorites', // marked as favorite
    'per_page': 100 // handles pagination, default is 10 kase
})
const API_ENDPOINT_COURSES = '/api/v1/courses'
const API_ACTIVE_COURSES = `https://${DOMAIN}${API_ENDPOINT_COURSES}?${PARAMS_COURSES_ACTIVE.toString()}`;
const API_USER = `https://${DOMAIN}/api/v1/users/self`
const API_USER_FOLDERS = `https://${DOMAIN}/api/v1/users/self/folders`

//wip
export class Student {
    ACCESS_TOKEN = process.env.ACCESS_TOKEN;

    constructor(json = {}) {
        this.id = json.id || this.FetchUserId();
        this.firstName = json.first_name;
        this.lastName = json.last_name;
        this.shortName = json.short_name || null;
        this.courses = []
    }

    async FetchUserId() {
        const res = await fetch(`${BASE_URL}/api/v1/users/self`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });
        if (!res.ok) throw new Error(`Failed to fetch user info: ${res.status}`);
        const userData = await res.json();
        return userData.id;
    }

    async FetchCourses(URL) {
        const coursesJson = fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`, // http authorization header
                'Content-Type': 'application/json',
                ...CORS // spread operator to merge properties
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
            .then(coursesData => {
                // console.log('Canvas API Response:', coursesData);
                this.printCourseNames(coursesData);
                return coursesData;
            })
            .catch(error => {
                console.error('Error fetching data from Canvas API:', error);
            });
        return coursesJson;
    }

    async FetchUserCredentials(URL) {
        const user = fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(userData => {
                // console.log('Canvas API Response:', userData);
                console.log("User Name:", getUserName(userData));
                return userData;
            })
            .catch(error => {
                console.error('Error fetching data from Canvas API:', error);
            });
        return user;
    }

    printCourseNames(coursesArray) {
        if (!Array.isArray(coursesArray)) {
            console.error('Expected an array of courses');
            return;
        }

        coursesArray.forEach((course, idx) => {
            console.log(`Course ${idx}: ${course.name}, ID: ${course.id}`);
        });
    }

    getUserName() {
        return this?.name || 'User name not available';
    }

    // STEP 0. Get user's folders
    async GetOrCreateFolder(folderName = "test") {
        try {
            // First, get the list of folders
            const response = await fetch(API_USER_FOLDERS, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    ...CORS
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch folders: ${response.status}`);
            }

            const folders = await response.json();
            console.log(folders);

            // Check if folderName already exists
            const folderLocation = folders.find((f) => f.full_name.endsWith(`/${folderName}`));
            if (folderLocation) return folderLocation;
            console.log(folderLocation);

            // Find the root folder (users_)
            const root = folders.find((f) => f.full_name === `users_${String(this.id).replace("users_", "")}`);
            if (!root) throw new Error("Root user folder not found");

            // Create new folder
            const createRes = await fetch(API_USER_FOLDERS, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    ...CORS,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: folderName,
                    parent_folder_id: root.id,
                })
            });

            if (!createRes.ok) {
                throw new Error(`Failed to create folder: ${createRes.status}`);
            }

            console.log("Create response: ", createRes);
            return await createRes.json();

        } catch (error) {
            console.error("Error in GetOrCreateFolder:", error);
            throw error;
        }
    }

    // STEP 1. Begin request for file upload
    async StartFileUpload(folderId, fileMeta) {
        const params = new URLSearchParams({
            name: fileMeta.name,
            size: fileMeta.size.toString(),
            content_type: fileMeta.type
        });

        const res = await fetch(`https://${DOMAIN}/api/v1/folders/${folderId}/files`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                ...CORS
            },
            body: params,
        });

        return await res.json(); // contains upload_url and upload_params
    }

    async UploadFile(uploadUrl, uploadParams, fileStream, fileMeta) {
        const formData = new FormData();

        for (const key in uploadParams) {
            formData.append(key, uploadParams[key]);
        }

        formData.append("file", fileStream, {
            filename: fileMeta.name,
            contentType: fileMeta.type,
        });

        const uploadRes = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
            headers: formData.getHeaders(),
        });

        return await uploadRes.json();
    }

    async GetFilesInFolder(folderId) {
        const res = await fetch(`${BASE_URL}/api/v1/folders/${folderId}/files`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            ...CORS
        });
        if (!res.ok) throw new Error(`Error fetching files: ${res.status}`);
        return await res.json(); // array of files
    }

    getUniqueFileName(originalName, existingFiles) {
        // Get base name and extension
        const dotIndex = originalName.lastIndexOf('.');
        const baseName = dotIndex === -1 ? originalName : originalName.slice(0, dotIndex);
        const ext = dotIndex === -1 ? '' : originalName.slice(dotIndex);

        // Collect existing file names in the folder
        const existingNames = new Set(existingFiles.map(f => f.display_name));

        if (!existingNames.has(originalName)) {
            return originalName; // no conflict
        }

        let i = 1;
        let newName;
        do {
            newName = `${baseName} (${i})${ext}`;
            i++;
        } while (existingNames.has(newName));

        return newName;
    }

    async ExecuteUpload() {
        const filePath = path.resolve(FILE_PATH);
        const fileStats = fs.statSync(filePath);
        const folder = await this.GetOrCreateFolder(FOLDER);
        const existingFiles = await this.GetFilesInFolder(folder.id);

        const originalName = path.basename(filePath);
        const uniqueName = this.GetUniqueFileName(originalName, existingFiles);

        // Create a new read stream for the upload
        const fileStream = fs.createReadStream(filePath);

        const fileMeta = {
            name: uniqueName,
            size: fileStats.size,
            type: "application/pdf", // Adjust if needed
        };

        const initUpload = await this.StartFileUpload(folder.id, fileMeta);
        const result = await this.UploadFile(initUpload.upload_url, initUpload.upload_params, fileStream, fileMeta);

        console.log("File uploaded as:", result.display_name);
    }
}

export async function GetUser() {
    const res = await fetch(`${BASE_URL}/api/v1/users/self`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch user info: ${res.status}`);
    const userData = await res.json();
    return userData;
}


