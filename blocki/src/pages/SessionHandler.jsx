import { SessionProvider } from "next-auth/react";
import UpdatedDashboardPage from "./DashboardContent";

export default function SessionHandler({ session }) {
  return (
    <SessionProvider session={session}>
      <UpdatedDashboardPage />
    </SessionProvider>
  );
}