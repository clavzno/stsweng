/** 
 * This script fetches active courses and user information from the Canvas REST API.
 * It requires an access token stored in a .env file.
 * This is solely for testing, there are better ways to do this.
 * Old versions I've trashed tried to run parts of this on localhost on an html file with js, but since
 * we're making an external API request via localhost, it will fail because of the CORS policy no matter
 * if you set the headers or have an extension or whatever. 
 * 
 * MAKE SURE TO MAKE A .env and make ACCESS_TOKEN=<your user-gen token from canvas>
 */

require('dotenv').config();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const FormData = require("form-data");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const DOMAIN = process.env.DOMAIN; // in case like a few years from now other schools will use this
const API_ENDPOINT_COURSES = "/api/v1/courses";
const ACTIVE_COURSES_PARAMS = {
    'state[]': 'available', // only published courses
    'enrollment_state': 'active',
    'include[]': 'favorites',
    'per_page': 100 // handles pagination, default is 10 kase
}
const FOLDER = process.env.FOLDER
const FILE_PATH = process.env.FILE_PATH

const params = new URLSearchParams(ACTIVE_COURSES_PARAMS);
const COURSES_API_WITH_PARAMS = `https://${DOMAIN}${API_ENDPOINT_COURSES}?${params.toString()}`;
const USER_API = `https://${DOMAIN}/api/v1/users/self`;
const USER_ID = fetchUserID().toString()

async function fetchUserID() {
    const BASE_URL = `https://${DOMAIN}`;
    const res = await fetch(`${BASE_URL}/api/v1/users/self`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch user info: ${res.status}`);
    const userData = await res.json();
    return userData.id;
}

const coursesFetch = fetch(COURSES_API_WITH_PARAMS, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`, // http authorization header
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(coursesData => {
        // console.log('Canvas API Response:', coursesData);
        printCourseNames(coursesData);
        return coursesData;
    })
    .catch(error => {
        console.error('Error fetching data from Canvas API:', error);
    });

const userFetch = fetch(USER_API, {
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

function getUserName(userObject) {
    return userObject?.name || 'User name not available';
}

function printCourseNames(coursesArray) {
    if (!Array.isArray(coursesArray)) {
        console.error('Expected an array of courses');
        return;
    }

    coursesArray.forEach((course, idx) => {
        console.log(`Course ${idx}: ${course.name}, ID: ${course.id}`);
    });
}

async function getOrCreateFolder(folderName = "Test") {
    const BASE_URL = `https://${DOMAIN}`;
    // Fetch user folders
    const res = await fetch(`${BASE_URL}/api/v1/users/self/folders`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
    const folders = await res.json();

    // Check if folder already exists
    const fullPath = `users_${USER_ID.replace("users_", "")}/${folderName}`;
    const existing = folders.find((f) => f.full_name.endsWith(`/${folderName}`));
    if (existing) return existing;

    // Find root user folder (usually named `users_<id>`)
    const root = folders.find((f) => f.full_name === `users_${USER_ID.replace("users_", "")}`);
    if (!root) throw new Error("Root user folder not found");

    // Create folder inside root folder
    const createRes = await fetch(`${BASE_URL}/api/v1/users/self/folders`, {
        method: "POST",
        headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    },
        body: JSON.stringify({
        name: folderName,
        parent_folder_id: root.id, // explicitly sets the correct root folder
        }),
    });

    return await createRes.json();
}


async function startFileUpload(folderId, fileMeta) {
    const params = new URLSearchParams();
    params.append("name", fileMeta.name);
    params.append("size", fileMeta.size.toString());
    params.append("content_type", fileMeta.type);

    const res = await fetch(`https://${DOMAIN}/api/v1/folders/${folderId}/files`, {
        method: "POST",
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        body: params,
    });

    return await res.json(); // contains upload_url and upload_params
}

async function uploadFile(uploadUrl, uploadParams, fileStream, fileMeta) {
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

async function getFilesInFolder(folderId) {
    const BASE_URL = `https://${DOMAIN}`;
    const res = await fetch(`${BASE_URL}/api/v1/folders/${folderId}/files`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });
    if (!res.ok) throw new Error(`Error fetching files: ${res.status}`);
    return await res.json(); // array of files
}

function getUniqueFileName(originalName, existingFiles) {
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


async function executeUpload() {
    const filePath = path.resolve(FILE_PATH);
    const fileStats = fs.statSync(filePath);
    const folder = await getOrCreateFolder(FOLDER);
    const existingFiles = await getFilesInFolder(folder.id);

    const originalName = path.basename(filePath);
    const uniqueName = getUniqueFileName(originalName, existingFiles);

    // Create a new read stream for the upload
    const fileStream = fs.createReadStream(filePath);

    const fileMeta = {
        name: uniqueName,
        size: fileStats.size,
        type: "application/pdf", // Adjust if needed
    };

    const initUpload = await startFileUpload(folder.id, fileMeta);
    const result = await uploadFile(initUpload.upload_url, initUpload.upload_params, fileStream, fileMeta);

    console.log("File uploaded as:", result.display_name);
}

executeUpload().catch(console.error);