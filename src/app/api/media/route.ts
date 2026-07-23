import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");

  if (!pathname) {
    return NextResponse.json({ error: "pathname manquant." }, { status: 400 });
  }

  if (pathname.includes("..") || pathname.startsWith("/")) {
    return NextResponse.json({ error: "pathname invalide." }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN manquant." },
      { status: 500 },
    );
  }

  try {
    const result = await get(pathname, {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      storeId: process.env.BLOB_STORE_ID,
    });

    if (!result) {
      return new NextResponse("Introuvable", { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Blob media error:", error);
    return NextResponse.json(
      { error: "Impossible de charger le fichier." },
      { status: 500 },
    );
  }
}
