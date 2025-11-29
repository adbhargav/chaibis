import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO = process.env.CONTACT_TO || "chaibisketllc@gmail.com";
const CC = process.env.CONTACT_CC || "";
const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || "";
const FROM = process.env.CONTACT_FROM || "Chai Bisket <onboarding@resend.dev>";
const SUBJECT = process.env.CONTACT_SUBJECT || "New Catering / Contact Message from Chai Bisket";

const EMAIL_CONFIGURED = !!resend;
const SHEET_CONFIGURED = !!SHEETS_WEBHOOK_URL;

// Add this at the beginning of the file
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";
export const preferredRegion = "auto";

export async function POST(req: Request) {
  try {
    const { name = "", email = "", phone = "", message = "", website = "" } = await req.json();

    // 🛡️ Honeypot anti-spam check
    if (website) {
      return NextResponse.json({ ok: true });
    }
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    // If no delivery mechanism is configured, fail clearly instead of pretending success
    if (!EMAIL_CONFIGURED && !SHEET_CONFIGURED) {
      return NextResponse.json(
        { ok: false, error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    // 1) Email
    if (resend) {
      await resend.emails.send({
        from: FROM,
        to: [TO],
        ...(CC ? { cc: [CC] } : {}),
        subject: SUBJECT,
        reply_to: email,
        text: `
New message from the Chai Bisket site

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
        `.trim(),
      });
    }

    // 2) Google Sheet (optional)
    if (SHEETS_WEBHOOK_URL) {
      await fetch(SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp: new Date().toISOString(), name, email, phone, message }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}