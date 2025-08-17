import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { summary, email } = await req.json();
    const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,    
        pass: process.env.SMTP_PASS,
  }});

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your Meeting Summary',
      text: summary,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error){

      return NextResponse.json(
        { success: false, error: err.message || 'Mail error' }, 
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "An unknown error occurred" }, 
        { status: 500 }
      );
    }
  }
}
