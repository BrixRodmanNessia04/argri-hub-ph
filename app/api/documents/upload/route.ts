import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const allowedTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const maxFileBytes = 10 * 1024 * 1024;

function safeSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const documentLocalId = formData.get("documentLocalId");
  if (!(file instanceof File) || typeof documentLocalId !== "string") {
    return NextResponse.json({ error: "File and document ID are required." }, { status: 400 });
  }
  if (!allowedTypes.has(file.type) || file.size > maxFileBytes) {
    return NextResponse.json(
      { error: "Only PDF, JPEG, PNG, or WebP files up to 10 MB are accepted." },
      { status: 422 },
    );
  }

  const path = `${user.id}/${safeSegment(documentLocalId)}/${safeSegment(file.name)}`;
  const { error } = await supabase.storage
    .from("agrihub-documents")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 422 });
  }
  return NextResponse.json({ success: true, path });
}

