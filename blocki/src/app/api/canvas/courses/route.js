// app/api/canvas/courses/route.js

export async function GET(req) {
    const authHeader = req.headers.get("Authorization");

    const canvasRes = await fetch("https://dlsu.instructure.com/api/v1/courses", {
    headers: {
        Authorization: authHeader,
    },
    });

    console.log("Canvas response status:", canvasRes.status);

    if (!canvasRes.ok) {
    const errorText = await canvasRes.text();
    console.log("Canvas error response:", errorText);
    return new Response(JSON.stringify({ error: errorText }), { status: canvasRes.status });
    }

    if (!authHeader) {
        return new Response(JSON.stringify({ error: "Missing Authorization header" }), { status: 401 });
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const response = await fetch("https://dlsu.instructure.com/api/v1/courses", {
        headers: {
        Authorization: authHeader,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        return new Response(JSON.stringify({ error: errorText }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
}
