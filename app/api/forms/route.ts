import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromToken(req);
        if (!userId) {
            return NextResponse.json({
                error: "Unauthorized",
            }, {
                status: 401
            });
        }
        const { title, description, fields } = await req.json();
        if (!title || !description || !fields) {
            return NextResponse.json({
                error: "All fields are required"
            }, {
                status: 400
            });
        }
        const form = await prisma.form.create({
            data: {
                title,
                description,
                userId,
                fields
            },
        });
        return NextResponse.json(form, {
            status: 201
        });
    } catch (error) {
        console.error("Error creating form: ", error);
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        })
    }
}

export async function GET(req: Request) {
    try {
        const userId = await getUserIdFromToken(req);
        if (!userId) {
            return NextResponse.json({
                error: "Unauthorized",
            }, {
                status: 401
            });
        }
        const forms = await prisma.form.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json(forms, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching forms", error);
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}