import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
const SECRET_KEY = process.env.JWT_SECRET;
export async function GET() {
    try {
        const token = (await cookies()).get("auth_token")?.value;
        if(!token) {
            return NextResponse.json({
                isAuthenticated: false
            }, {
                status: 401
            });
        }
        const decoded = jwt.verify(token, SECRET_KEY as string) as {
            id: string,
            email: string,
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        if(!user) {
            return NextResponse.json({
                isAuthenticated: false,
            }, {
                status: 401
            });
        }
        return NextResponse.json({
            isAuthenticated: true,
            user,
        }, {
            status: 200
        })
    } catch (error) {
        console.error("Auth check error: ", error);
        return NextResponse.json({
            isAuthentication: false,
        }, {
            status: 401,
        })
    }
}