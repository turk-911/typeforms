import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY || "";
export async function getUserIdFromToken(req?: Request): Promise<string | null> {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return null;
        }
        const decoded = jwt.verify(token, SECRET_KEY) as {
            id: string
        };
        return decoded.id;
    } catch (error) {
        console.error("Error verifying token", error);
        return null;
    }
}