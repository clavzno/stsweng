import { CanvasService } from './services/CanvasService.js';
// import readline from 'readline/promises'
// import { stdin as input, stdout as output } from 'process';
// NOTE: readline not compatible with inquirer, use inquirer instead
import inquirer from 'inquirer';

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
    let running = true;
    // const rl = readline.createInterface({ input, output });
    while (running) {
        var { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Canvas API Demo Menu: (1 and 3 must be done first)',
                choices: [
                    { name: '1. Create Student', value: '1' },
                    { name: '2. Fetch Courses', value: '2' },
                    { name: '3. Get User Root Folder', value: '3' },
                    { name: '4. List Files in Root Folder', value: '4' },
                    { name: '5. Get assignments in chosen course', value: '5' },
                    { name: '6. Upload a Submission to an Assignment', value: '6' },
                    { name: 'Exit', value: '0' }
                ]
            }
        ]);

        switch (choice.trim()) {
            case '1':
                try {
                    await canvasService.CreateStudent();
                    console.log('Student created:', canvasService.activeStudent);
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
                    console.log("folder id: ", canvasService.activeStudent.studentRootFolderId);
                    const files = await canvasService.GetFilesInFolder(canvasService.activeStudent.studentRootFolderId);
                    console.log(files);
                } catch (err) {
                    console.error('Error getting files from root folder:', err.message);
                }
                break;
            case '5':
                try {
                    // should print published assignments
                    const assignments = await canvasService.GetAssignmentsInCourse("12237625");
                    //console.log(assignments);
                    // should print only unlocked assignments
                    for (const assignment of assignments) {
                        if (assignment.locked_for_user == false) {
                            console.log(`Assignments Unlocked:`);
                            console.log(`- ${assignment.name} (ID: ${assignment.id})`);
                            console.log(`${assignment.description}`)
                        }
                        else {
                            console.log(`Assignments Locked:`);
                            console.log(`- ${assignment.name} (ID: ${assignment.id})`);
                            console.log(`${assignment.lock_explanation}`)
                        }
                    }
                } catch (error) {
                    console.error("Error listing assignments in chosen course: ", error);
                }
                break;
            case '6':
                try {
                    //makes a submission to COURSE02 - ASSIGNMENT01
                    const submission = await canvasService.MakeFileUploadRequestToAssignment("12237636", "56130526")
                    console.log("Submission uploaded.")
                } catch (err) {
                    console.error("Error trying to make a submission request:", err.message)
                }
                break;
            case '0':
                console.log('Exiting...');
                //rl.close();
                return;
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
}

async function main() {
    const canvasService = new CanvasService();
    promptMenu(canvasService);
}

main();