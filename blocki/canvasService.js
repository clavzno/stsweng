import { getToken } from "@auth/core/jwt"
import { auth } from "../auth"

export default async function CanvasService(req, res) {
    const session = await auth(req, res); // auth session
    
}