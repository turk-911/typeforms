import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
    try {
        console.log(req);
        const { email, password } = await req.json();
        const user = await prisma.user.create({
            data: {
                email, 
                password
            }
        });
        return NextResponse.json(user, {
            status: 201
        });
    } catch (error) {
        console.error("Error: ", error)
        return NextResponse.json({
            error: "User creation failed",
        }, {
            status: 500
        });
    }
}