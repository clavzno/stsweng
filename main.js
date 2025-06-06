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
        return canvasService.GetFilesInFolder(canvasService.activeStudent.studentRootFolderId);
    })
    .then(() => {
        //console.log("Uploading example.pdf to root");
        //return canvasService.MakeFileUploadRequestToRoot();
        //stsweng: 215192
    })
    .then(() => {
        console.log("Listing Assignments in STSWENG");
        return canvasService.GetAssignmentsInCourse("215192");
    })
    .then(() => {
        console.log("SKIPPING: Adding comment to an assignment in STSWENG.");
        //console.log("Adding comment to an assignment in STSWENG.");
        //return canvasService.AddCommentToAssignment("215192", "2099596", "If you're seeing this then the API call to add comments has worked!");
    })
    .then(() => {
        console.log("Attempting to upload example.pdf to STSWENG MCO1");
        return canvasService.MakeFileUploadRequestToAssignment("215192", "2099596");
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });