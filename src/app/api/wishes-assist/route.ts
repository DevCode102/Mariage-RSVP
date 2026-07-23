import { NextResponse } from "next/server";

type Body = {
  partner1?: string;
  partner2?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY manquant. Ajoutez la clé dans .env pour activer l'assistant.",
      },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as Body;
    const partner1 = String(body.partner1 ?? "la mariée").trim();
    const partner2 = String(body.partner2 ?? "le marié").trim();

    const prompt = `Tu aides un invité à écrire un court message de vœux pour le mariage de ${partner1} et ${partner2}.
Écris en français, ton chaleureux et élégant, 3 à 5 phrases maximum.
Pas de markdown, pas de titre, juste le message prêt à envoyer.
Évite les clichés trop génériques ; reste sincère et joyeux.`;

    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 350,
          },
        }),
      },
    );

    const payload = await response.json();
    if (!response.ok) {
      console.error("Gemini wishes error:", payload);
      return NextResponse.json(
        {
          error:
            payload?.error?.message ||
            "Le service Gemini a renvoyé une erreur.",
        },
        { status: 502 },
      );
    }

    const message =
      payload?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? "")
        .join("\n")
        .trim() || "";

    if (!message) {
      return NextResponse.json(
        { error: "Aucun message généré. Réessayez." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Wishes assist error:", error);
    return NextResponse.json(
      { error: "Impossible de contacter Gemini pour le moment." },
      { status: 500 },
    );
  }
}
