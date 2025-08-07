import { CanvasAPI } from "@/vendor/CanvasAPI";
import { auth } from "../course_page/../../../../../auth"; // do not change this path

export async function GET(req) {
    const session = await auth();
    const token = session?.accessToken;
    console.log("Session Token:", token);

    const canvas = new CanvasAPI(token, "dlsu.instructure.com");
    const courseId = req.headers.get("course_id");
    const courseRes = await canvas.get(`/api/v1/courses/${courseId}`);

    if (!courseRes.ok) {
    return new Response(
        JSON.stringify({ error: "Failed to fetch course" }),
        { status: 500 }
    );
    }

    const course = await courseRes.json();

    let teacherName = "Unknown Instructor";
        try {
        const profileRes = await canvas.get(
            `/api/v1/courses/${courseId}/users?enrollment_role=TeacherEnrollment&per_page=100`
        );
        if (profileRes.ok) {
            const teachers = await profileRes.json();
            teacherName = teachers?.[0]?.name || "Unknown Instructor";
            console.log("Teacher Profile:", teacherName);
        }
        } catch (err) {
            console.error("Error fetching teacher profile:", err);
        }

    return new Response(
        JSON.stringify({
            id: course.id,
            name: course.name,
            course_code: course.course_code,
            start_at: course.start_at,
            end_at: course.end_at,
            course_image: course.image_download_url || course.card_image || null,
            teacher: teacherName,
        }),
        {
            status: 200,
            headers: {
            "Content-Type": "application/json",
            },
    }
    );
}
