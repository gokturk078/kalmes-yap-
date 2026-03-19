import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseServiceRoleKey, supabaseUrl } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/types";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Lutfen tum alanlari doldurun." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Lutfen gecerli bir e-posta adresi girin." }, { status: 400 });
    }

    if (name.length > 120 || email.length > 160 || subject.length > 160 || message.length > 4000) {
      return NextResponse.json({ error: "Gonderi boyutu izin verilen limiti asti." }, { status: 400 });
    }

    const serverKey = supabaseServiceRoleKey || supabaseAnonKey;

    if (!supabaseUrl || !serverKey) {
      return NextResponse.json(
        { error: "Sunucu ayarlari eksik. Lutfen yonetici ile iletisime gecin." },
        { status: 500 }
      );
    }

    const supabase = createClient<Database>(supabaseUrl, serverKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() || null;
    const userAgent = request.headers.get("user-agent") || null;

    const { error: insertError } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
      ip_address: ipAddress,
      user_agent: userAgent,
      status: "new",
    });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json({ error: "Mesaj gonderilemedi. Lutfen daha sonra tekrar deneyin." }, { status: 500 });
  }
}
