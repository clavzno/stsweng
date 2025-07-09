// Testing
import { auth } from '../nextauthConfig.js';
export default async function UserInfo() {
  "use server";
  console.log("entered OauthComponents.jsx");
  const session = await auth();
 
  if (!session?.user) return null;
 
  return (
    <div>
      <h1>{session.accessToken}</h1>
    </div>
  )
}