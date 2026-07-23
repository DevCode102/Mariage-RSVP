import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSiteContent } from "@/lib/site-content-db";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const content = await getSiteContent();

    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const pagne = String(body.pagne ?? "").trim();
    const message = String(body.message ?? "").trim();
    const eventAnswersRaw = isPlainObject(body.eventAnswers)
      ? body.eventAnswers
      : {};
    const lodgingRaw = isPlainObject(body.lodging) ? body.lodging : {};

    if (!fullName) {
      return NextResponse.json(
        { error: "Le nom et le prénom sont obligatoires." },
        { status: 400 },
      );
    }

    if (fullName.length > 200) {
      return NextResponse.json(
        { error: "Le nom est trop long." },
        { status: 400 },
      );
    }

    if (content.rsvpCollectEmail) {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
          { error: "Une adresse e-mail valide est obligatoire." },
          { status: 400 },
        );
      }
    }

    if (content.rsvpCollectPhone && !phone) {
      return NextResponse.json(
        { error: "Le numéro de téléphone est obligatoire." },
        { status: 400 },
      );
    }

    const rsvpEvents = content.events.filter((e) => e.includeInRsvp !== false);
    const eventAnswers: Record<string, boolean> = {};

    for (const event of rsvpEvents) {
      const raw = eventAnswersRaw[event.id];
      if (typeof raw !== "boolean") {
        return NextResponse.json(
          {
            error: `Merci d'indiquer votre présence pour chaque événement.`,
          },
          { status: 400 },
        );
      }
      eventAnswers[event.id] = raw;
    }

    const lodging: Record<string, string> = {};
    for (const field of content.rsvpLodgingFields.filter((f) => f.enabled)) {
      lodging[field.id] = String(lodgingRaw[field.id] ?? "").trim();
    }

    const attending = Object.values(eventAnswers).some(Boolean);

    const rsvp = await prisma.rsvp.create({
      data: {
        fullName,
        email: content.rsvpCollectEmail ? email : "",
        phone: content.rsvpCollectPhone ? phone : "",
        eventAnswers,
        pagne: content.rsvpPagneEnabled ? pagne : "",
        lodging,
        message: content.rsvpMessageEnabled ? message.slice(0, 2000) : "",
        attending,
      },
    });

    return NextResponse.json({ ok: true, id: rsvp.id });
  } catch (error) {
    console.error("RSVP create error:", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer votre réponse pour le moment." },
      { status: 500 },
    );
  }
}
