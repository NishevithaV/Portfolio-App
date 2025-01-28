// import { EmailTemplate } from '../../../components/EmailTemplate';
"use server";

import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    
    const { data, error } = await resend.emails.send({
      from: "Nishevitha <nishevitha.v@gmail.com>",
      to: ["nishevitha.v@gmail.com"], 
      subject: "Hello World",
      react: (
        <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}>
          <p>This is the email body content.</p>
        </div>
      ),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
