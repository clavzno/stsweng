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

async function updateTasks(email, tasks) {
  const db = await getDatabase();
  await db.collection("Tasks").updateOne(
    { email },
    { $set: { tasks } },
    { upsert: true }
  );
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, darkMode, dashboardLayout, courseId, customization, imageUrl, tasks } = req.body;
    try {
      if (darkMode !== undefined) {
        await updateDarkMode(email, darkMode);
        console.log('Dark mode preference updated:', darkMode);
      }
      if (dashboardLayout !== undefined) {
        await updateDashboardLayout(email, dashboardLayout);
        console.log('Dashboard layout preference updated:', dashboardLayout);
      }
      if (courseId && customization) {
        await updateCourseCustomization(email, courseId, customization, imageUrl);
        console.log(`Course customization for ${courseId} updated:`, customization);
      }
      if (tasks !== undefined) {
        await updateTasks(email, tasks);
        console.log('Tasks updated:', tasks);
      }
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
}