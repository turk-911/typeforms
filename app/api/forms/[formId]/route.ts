import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";
export async function GET(req: Request, {
    params
}: {
    params: {
        formId: string
    }
}) {
    try {
        const { formId } = params;
        const form = await prisma.form.findUnique({
            where: {
                id: formId
            },
            include: {
                questions: {
                    orderBy: {
                        order: "asc"
                    }
                }
            }
        });
        if (!form) {
            return NextResponse.json({
                error: "Form not found"
            }, {
                status: 404
            });
        }
        return NextResponse.json(form, {
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

export async function PUT(req: Request, {
    params
}: {
    params: {
        formId: string
    }
}) {
    try {
        const userId = await getUserIdFromToken(req);
        if (!userId) {
            return NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const { formId } = params;
        const { title, description } = await req.json();
        const updatedForm = await prisma.form.update({
            where: {
                id: formId,
                userId
            },
            data: {
                title,
                description
            }
        });
        return NextResponse.json(updatedForm, {
            status: 200
        });
    } catch (error) {
        console.error("Error updating form", error);
        return NextResponse.json({
            error: "Internal server error",
        }, {
            status: 500
        })
    }
}

export async function DELETE(req: Request, {
    params
}: {
    params: {
        formId: string
    }
}) {
    try {
        const userId = await getUserIdFromToken(req);
        if(!userId) {
            return NextResponse.json({
                error: "Unauthorized",
            }, {
                status: 401
            });
        }
        const { formId } = params;
        await prisma.form.delete({
            where: {
                id: formId,
                userId
            }
        });
    } catch (error) {
        console.error("Error deleting form", error);
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        })
    }
}