import { getDatabase } from "@/MongoDB/MongoDB";
import { signIn } from "next-auth/react";

export async function POST(req) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return Response.json({ error: 'Access token required' }, { status: 400 });
    }

    // Verify the token works by calling Canvas API
    const profileRes = await fetch('https://dlsu.instructure.com/api/v1/users/self/profile', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!profileRes.ok) {
      return Response.json({ error: 'Invalid Canvas API token' }, { status: 401 });
    }

    const profile = await profileRes.json();

    // Store in database - SAME AS auth.js
    const db = await getDatabase();
    
    // Upsert user in Students collection
    await db.collection("Students").updateOne(
      { email: profile.primary_email },
      { 
        $set: { 
          lastLogin: new Date(),
          name: profile.name,
          shortName: profile.short_name || profile.name,
          sortableName: profile.sortable_name,
          avatarUrl: profile.avatar_url,
          pronouns: profile.pronouns,
          title: profile.title,
          bio: profile.bio,
          pronunciation: profile.pronunciation,
          loginId: profile.login_id,
          timeZone: profile.time_zone,
          locale: profile.locale,
          effectiveLocale: profile.effective_locale,
          calendarIcs: profile.calendar?.ics,
          ltiUserId: profile.lti_user_id,
          canvasAccessToken: accessToken,
        }
      },
      { upsert: true }
    );

    // Upsert preferences (example: dark mode default)
    await db.collection("Preferences").updateOne(
      { email: profile.primary_email },
      { $setOnInsert: { darkMode: true } },
      { upsert: true }
    );

    // Upsert tasks (example: create empty array if new)
    await db.collection("Tasks").updateOne(
      { email: profile.primary_email },
      { $setOnInsert: { tasks: [] } },
      { upsert: true }
    );

    console.log("Manual auth: Database connection established and user upserted in all collections.");

    // Return success with user profile data
    return Response.json({ 
      success: true, 
      user: {
        email: profile.primary_email,
        name: profile.name,
        shortName: profile.short_name || profile.name,
        avatarUrl: profile.avatar_url,
      },
      accessToken: accessToken 
    });
  } catch (error) {
    console.error('Manual auth error:', error);
    return Response.json({ error: 'Authentication failed' }, { status: 500 });
  }
}