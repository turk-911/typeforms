import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if(!token) {
        return NextResponse.json({
            error: "Invalid token"
        }, {
            status: 400
        });
    }
    const user = await prisma.user.findFirst({
        where: {
            verificationToken: token
        }
    });
    if(!user) {
        return NextResponse.json({
            error: "Invalid or expired token",
        }, {
            status: 400
        });
    }
    await prisma.user.update({
        where: { email: user.email },
        data: { isVerified: true, verificationToken: null },
    });
    return NextResponse.json({ 
        message: "Email verified successfully!"
    }, {
        status: 200
    })
}   