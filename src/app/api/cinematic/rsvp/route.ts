import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const rsvpSchema = z.object({
  fullName: z.string().min(2),
  attending: z.enum(["yes", "no"]),
  guestCount: z.number().min(1).max(10).optional(),
  side: z.enum(["groom", "bride"]),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = rsvpSchema.parse(body);

    // Try Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from("rsvp_responses").insert({
        full_name: data.fullName,
        attending: data.attending === "yes",
        guest_count: data.guestCount || 1,
        side: data.side,
        message: data.message || "",
        template: "cinematic",
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { success: false, error: "Database error" },
          { status: 500 }
        );
      }
    } else {
      // Development mode — log to console
      console.log("📨 RSVP Response (dev mode):", data);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("RSVP API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
