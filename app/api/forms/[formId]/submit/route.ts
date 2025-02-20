import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request, { params }: {
    params: {
        formId: string
    }
}) {
    try {
        const { formId } = params;
        const { answers } = await req.json();
        if (!answers || Object.keys(answers).length === 0) {
            return NextResponse.json({
                error: "Answers cannot be empty"
            }, {
                status: 400
            });
        }
        const response = await prisma.response.create({
            data: {
                formId,
                answers,
                submittedAt: new Date()
            }
        });
        return NextResponse.json(response, {
            status: 201
        });
    } catch (error) {
        console.error("Error submitting responses", error);
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}