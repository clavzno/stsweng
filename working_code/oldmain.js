import dotenv from 'dotenv';
dotenv.config();
import { Student, GetUser } from './working2.js';

// Environment variables and constants
const DOMAIN = process.env.DOMAIN;
const FOLDER = process.env.FOLDER;
const FILE_PATH = process.env.FILE_PATH;
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
    'state[]': 'available',
    'enrollment_state': 'active',
    'include[]': 'favorites',
    'per_page': 100
})
const API_ENDPOINT_COURSES = '/api/v1/courses'
const API_ACTIVE_COURSES = `https://${DOMAIN}${API_ENDPOINT_COURSES}?${PARAMS_COURSES_ACTIVE.toString()}`;
const API_USER = `https://${DOMAIN}/api/v1/users/self`
const API_USER_FOLDERS = `${DOMAIN}/api/v1/users/self/folders`

async function main() {
    try {
        const json = await GetUser();
        const activeStudent = new Student(json);
        await activeStudent.GetUserRootFolder();
        //await activeStudent.ExecuteUpload()
    } catch (error) {
        console.error('Error:', error);
    }
}

main();