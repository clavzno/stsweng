import { CanvasService } from './services/CanvasService.js';

const canvasService = new CanvasService();

canvasService.FetchUser()
    .then(user => {
        console.log("User fetched successfully:", user);
        return canvasService.CreateStudent();
    })
    .then(() => {
        console.log("Student created successfully:", canvasService.activeStudent);
    })
    .then(() => {
        console.log("Student's courses: ");
        return canvasService.FetchCourses();
    })
    .then(() => {
        console.log("Setting root user folder");
        return canvasService.GetUserRootFolder(); 
    })
    .then(() => {
        console.log("Listing Files in root folder");
        return canvasService.GetFilesInFolder().id;
    })
    .then(() => {
        console.log("Uploading example.pdf to root");
        return canvasService.MakeFileUploadRequestToRoot();
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });