import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        verificationToken,
      },
    });
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error("NEXT_PUBLIC_APP_URL is not defined in .env");
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;
    console.log(process.env.EMAIL_USER);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<p>Hi, ${name}, <br/>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    console.log("Mail sent successfully to:", email);
    return NextResponse.json({ message: "Signup successful! Please verify your email." }, { status: 201 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}