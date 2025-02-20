import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: {
    params: {
        formId: string
    }
}) {
    try {
        const { formId } = params;
        const responses = await prisma.response.findMany({
            where: {
                formId
            },
            orderBy: {
                submittedAt: "desc"
            }
        });
        return NextResponse.json(responses, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching responses", error);
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}