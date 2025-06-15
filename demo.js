import { CanvasService } from './services/CanvasService.js';
import readline from 'readline/promises'
import { stdin as input, stdout as output } from 'process';
const rl = readline.createInterface({ input, output });

//const DOMAIN = process.env.DOMAIN;
//const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

/**
 * This is a menu that lets you choose specific actions to perform with the Canvas API.
 * (Just for demonstration of the usage of CanvasService, which calls the API)
 * 
 * Output is via the console.
 * 
 * These must be defined in the .env file:
 * DOMAIN=canvas.instructure.com
 * ACCESS_TOKEN=<access_token>
 * 
 * to install dependencies: npm.cmd install
 * to run: d
 * 
 * Actions:
 * 1. Create a Canvas Service instance.
 * 2. Create a new user based on the access token. (1 must be done first)
 * 3. Get the user's courses (1 and 2 must be done first)
 * 4. Get the user's root folder. (1 must be done first)
 * 5. Get the user's root folder and list files in it. (1 must be done first)
 * 6. List all the assignments in a chosen course. (1 must be done first)
 * 7. Upload a submission to an assignment. (1 must be done first)
 */

async function promptMenu(canvasService) {
    const menu = `
        Canvas API Demo Menu:

        1. Create Student
        2. Fetch Courses
        3. Get User Root Folder
        4. List Files in Root Folder
        5. Get assignments in chosen course
        6. Upload a Submission to an Assignment
        x. Exit

        Enter your choice: `;

    rl.question(menu, async (choice) => {

        switch (choice.trim()) {
            case '1':
                try {
                    const student = await canvasService.CreateStudent();
                    console.log('Student created:', student);
                } catch (err) {
                    console.error('Error creating student:', err.message);
                }
                break;
            case '2':
                try {
                    const courses = await canvasService.FetchCourses();
                    console.log('Courses:', courses);
                } catch (err) {
                    console.error('Error fetching courses:', err.message);
                }
                break;
            case '3':
                try {
                    const folder = await canvasService.GetUserRootFolder();
                } catch (err) {
                    console.error('Error getting root folder:', err.message);
                }
                break;
            case '4':
                try {
                    const files = await canvasService.GetFilesInFolder(canvasService.activeStudent.studentRootFolder);
                } catch (err) {
                    console.error('Error getting files from root folder:', err.message);
                }
                break;
            case '5':
                try{
                    const assignments = await canvasService.GetAssignmentsInCourse(12237625);
                } catch (error) {
                    console.error("Error listing assignments in chosen course: ", error);
                }
            case '6':
                try {
                    const submission = await canvasService.MakeFileUploadRequestToAssignment("12237625", "56130506")
                    console.log("Submission uploaded.")
                } catch (err) {
                    console.error("Error trying to make a submission request:", err.message)
                }
                break;
            case 'x':
                console.log('Exiting...');
                rl.close();
                return;
            default:
                console.log('Invalid choice. Please try again.');
        }
    });
}

async function main() {
    const canvasService = new CanvasService();
    promptMenu(canvasService);
}

main();