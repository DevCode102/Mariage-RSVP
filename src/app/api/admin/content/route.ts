import { NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";
import { mergeSiteContent, type SiteContentData } from "@/lib/site-content";
import { saveSiteContent } from "@/lib/site-content-db";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

function validateContent(data: SiteContentData): string | null {
  if (!data.partner1?.trim() || !data.partner2?.trim()) {
    return "Les prénoms des mariés sont obligatoires.";
  }
  if (!data.weddingDate?.trim()) {
    return "La date du mariage est obligatoire.";
  }
  if (!Array.isArray(data.events) || data.events.length === 0) {
    return "Ajoutez au moins un événement au programme.";
  }
  if (!Array.isArray(data.heroSlides) || data.heroSlides.length === 0) {
    return "Ajoutez au moins une image au carrousel.";
  }
  return null;
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = mergeSiteContent(body);
    const error = validateContent(data);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await saveSiteContent(data);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Save site content error:", err);
    return NextResponse.json(
      { error: "Impossible d'enregistrer le contenu." },
      { status: 500 },
    );
  }
}
