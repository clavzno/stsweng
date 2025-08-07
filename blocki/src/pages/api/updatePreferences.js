const { getDatabase } = require("../../MongoDB/MongoDB");

async function updateDarkMode(email, darkMode) {
  const db = await getDatabase();
  await db.collection("Preferences").updateOne(
    { email },
    { $set: { darkMode } },
    { upsert: true }
  );
}

async function updateDashboardLayout(email, dashboardLayout) {
  const db = await getDatabase();
  await db.collection("Preferences").updateOne(
    { email },
    { $set: { dashboardLayout } },
    { upsert: true }
  );
}

async function updateCourseCustomization(email, courseId, customization) {
  const db = await getDatabase();
  await db.collection("Preferences").updateOne(
    { email },
    { $set: { [`courses.${courseId}.customization`]: customization } },
    { upsert: true }
  );
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, darkMode, dashboardLayout } = req.body;
    try {
      if (darkMode !== undefined) {
        await updateDarkMode(email, darkMode);
      }
      if (dashboardLayout !== undefined) {
        await updateDashboardLayout(email, dashboardLayout);
      }
      if (courseId && customization) {
        //await updateCourseCustomization(email, courseId, customization); REMOVED FOR NOW
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
}

