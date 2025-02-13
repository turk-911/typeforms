import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});
export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(!user) {
            return NextResponse.json({
                error: "User not found"
            }, {
                status: 404
            });
        }
        const resetToken = uuidv4();
        await prisma.user.update({
            where: { email },
            data: { resetToken },
        });
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset your password",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });
        return NextResponse.json({
            message: "Reset link sent to mail"
        });
    } catch (error) {
        return NextResponse.json({ 
            error: "Server error",
        }, {
            status: 500
        });
    }
}