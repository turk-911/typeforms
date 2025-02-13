import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req: any, res: any) {
    if(req.method === "POST") {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password
                }
            })
        } catch (error) {
            res.status(500).json({ 
                error: "User creation failed"
            });
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({
            message: `Method ${req.method} not allowed`
        });
    }
}