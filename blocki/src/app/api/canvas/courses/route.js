import { CanvasAPI } from "@/vendor/CanvasAPI";

export async function GET(req) {
    const token = req.headers.get("token");
    const canvas = new CanvasAPI(token, "dlsu.instructure.com");

    // Step 1: Fetch courses with necessary includes
    const courseRes = await canvas.get(
        "/api/v1/courses?enrollment_state=active&include[]=course_progress&include[]=total_scores",
        { per_page: 100 }
    );

    if (!courseRes.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch courses" }), {
            status: 500,
        });
    }

    const courses = await courseRes.json();

    const teacherProfilesCache = {};

    // Step 2: Fetch assignments and full teacher name for each course
    const enrichedCourses = await Promise.all(
        courses.map(async (course) => {
            let assignments = [];
            try {
                const assignmentRes = await canvas.get(`/api/v1/courses/${course.id}/assignments`);
                assignments = assignmentRes.ok ? await assignmentRes.json() : [];
            } catch (err) {
                console.error(
                    `Error fetching assignments for course ${course.id}:`, err
                );
            }

            let teacher = {};
            let fullName = "Unknown Instructor";
            try {
                const profileRes = await canvas.get(`/api/v1/courses/${course.id}/users?enrollment_role=TeacherEnrollment&per_page=100`);

                const teacherProfile = await profileRes.json();
                // picks the first name sa array
                const teacherName = teacherProfile?.[0]?.name || "Unknown Instructor";
                teacher[course.id] = teacherName;
                fullName = teacherName;

                console.log("Teacher Profile:", fullName);
            } catch (err) {
                console.error("Error fetching teacher profile:", err);
            }

            return {
                ...course,
                assignments,
                instructor_full_name: fullName,
                course_image: course.image_download_url || course.card_image || null,
            };
        })
    );

    // Step 3: Return the enriched course data
    return new Response(JSON.stringify(enrichedCourses), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
