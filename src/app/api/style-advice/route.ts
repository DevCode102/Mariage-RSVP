import { NextResponse } from "next/server";

type Body = {
  gender?: string;
  style?: string;
  partner1?: string;
  partner2?: string;
  colors?: { name: string; hex: string }[];
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY manquant. Ajoutez la clé dans .env pour activer le conseiller.",
      },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as Body;
    const gender = String(body.gender ?? "Femme");
    const style = String(body.style ?? "Traditionnel & Glamour");
    const partner1 = String(body.partner1 ?? "la mariée");
    const partner2 = String(body.partner2 ?? "le marié");
    const colors = Array.isArray(body.colors) ? body.colors : [];

    const palette =
      colors.length > 0
        ? colors.map((c) => `${c.name} (${c.hex})`).join(", ")
        : "terracotta, cuivre, orange brûlé";

    const prompt = `Tu es un conseiller de style pour un mariage camerounais (Ouest Cameroun / Bafoussam).
Mariés: ${partner1} & ${partner2}.
Palette du mariage: ${palette}.
Profil invité: ${gender}.
Style souhaité: ${style}.

Donne des conseils vestimentaires concrets et chaleureux en français (4 à 6 phrases max):
- tenues adaptées (pagne possible, chic moderne ou traditionnel selon le choix)
- couleurs à privilégier dans la palette
- accessoires / chaussures
- ce qu'il vaut mieux éviter
Pas de markdown, pas de listes à puces, ton élégant et accessible.`;

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
            temperature: 0.8,
            maxOutputTokens: 500,
          },
        }),
      },
    );

    const payload = await response.json();
    if (!response.ok) {
      console.error("Gemini error:", payload);
      return NextResponse.json(
        {
          error:
            payload?.error?.message ||
            "Le service Gemini a renvoyé une erreur.",
        },
        { status: 502 },
      );
    }

    const advice =
      payload?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? "")
        .join("\n")
        .trim() || "";

    if (!advice) {
      return NextResponse.json(
        { error: "Aucune suggestion générée. Réessayez." },
        { status: 502 },
      );
    }

    return NextResponse.json({ advice });
  } catch (error) {
    console.error("Style advice error:", error);
    return NextResponse.json(
      { error: "Impossible de contacter Gemini pour le moment." },
      { status: 500 },
    );
  }
}
