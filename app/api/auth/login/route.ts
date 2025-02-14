import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers";
const SECRET_KEY = process.env.JWT_SECRET;
export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        if(!email || !password) {
            return NextResponse.json({
                message: "Both email and password are required"
            }, {
                status: 400
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(!user) {
            return NextResponse.json({
                message: "Invalid credentials"
            }, {
                status: 401
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return NextResponse.json({
                message: "Invalid credentials"
            }, {
                status: 401
            });
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, SECRET_KEY as string, {
            expiresIn: "7d"
        });
        (await cookies()).set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60,
            path: "/"
        });
        return NextResponse.json({
            token,
            user
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Login error", error);
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}