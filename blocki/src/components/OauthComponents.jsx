// Testing
import { auth } from "../app/api/auth/[...nextauth]/route";
export default async function UserInfo() {
  console.log("entered OauthComponents.jsx");
  const session = await auth();
 
  if (!session?.user) return null;
 
  return (
    <div>
      <h1>{session.accessToken}</h1>
    </div>
  )
}