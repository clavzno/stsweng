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
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const DOMAIN = process.env.DOMAIN; // in case like a few years from now other schools will use this
const API_ENDPOINT_COURSES = "/api/v1/courses";
const ACTIVE_COURSES_PARAMS = {
    'state[]': 'available', // only published courses
    'enrollment_state': 'active',
    'include[]': 'favorites',
    'per_page': 100 // handles pagination, default is 10 kase
}

const params = new URLSearchParams(ACTIVE_COURSES_PARAMS);
const COURSES_API_WITH_PARAMS = `https://${DOMAIN}${API_ENDPOINT_COURSES}?${params.toString()}`;
const USER_API = `https://${DOMAIN}/api/v1/users/self`;

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
        console.log(`Course ${idx}: ${course.name}, ID: ${course.id}`); // not using index 1
    });
}