// import { EmailTemplate } from '../../../components/EmailTemplate';
"use server";

import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(request) {
  try {
    const { email, subject, message } = await request.json;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email], 
      subject: subject,
      react: (
        <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </div>
      ),
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
