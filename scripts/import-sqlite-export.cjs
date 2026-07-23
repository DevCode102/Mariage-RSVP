/**
 * One-shot: import SQLite JSON exports into the current DATABASE_URL (Postgres).
 * Usage: node scripts/import-sqlite-export.mjs
 */
const { readFileSync, existsSync } = require("fs");
const { resolve } = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function loadJson(path) {
  if (!existsSync(path)) return [];
  const raw = readFileSync(path, "utf8").trim();
  if (!raw) return [];
  return JSON.parse(raw);
}

function parseJsonField(value) {
  if (value == null) return null;
  if (typeof value === "object") return value;
  return JSON.parse(String(value));
}

function parseDate(value) {
  if (value == null || value === "") return new Date();
  if (typeof value === "number") {
    // SQLite often stores ms epoch
    return new Date(value > 1e12 ? value : value * 1000);
  }
  const asNumber = Number(value);
  if (!Number.isNaN(asNumber) && String(value).trim() !== "") {
    return new Date(asNumber > 1e12 ? asNumber : asNumber * 1000);
  }
  return new Date(value);
}

async function main() {
  const root = resolve(__dirname, "..");
  const siteRows = loadJson(resolve(root, "prisma/sqlite-export-sitecontent.json"));
  const rsvpRows = loadJson(resolve(root, "prisma/sqlite-export-rsvp.json"));

  console.log(`Import SiteContent: ${siteRows.length} row(s)`);
  for (const row of siteRows) {
    const data = parseJsonField(row.data);
    await prisma.siteContent.upsert({
      where: { id: row.id || "default" },
      create: {
        id: row.id || "default",
        data,
        updatedAt: parseDate(row.updatedAt),
      },
      update: {
        data,
        updatedAt: parseDate(row.updatedAt),
      },
    });
  }

  console.log(`Import Rsvp: ${rsvpRows.length} row(s)`);
  for (const row of rsvpRows) {
    await prisma.rsvp.upsert({
      where: { id: row.id },
      create: {
        id: row.id,
        fullName: row.fullName ?? `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
        email: row.email ?? "",
        phone: row.phone ?? "",
        eventAnswers: parseJsonField(row.eventAnswers) ?? {},
        pagne: row.pagne ?? "",
        lodging: parseJsonField(row.lodging) ?? {},
        message: row.message ?? "",
        attending: Boolean(row.attending),
        createdAt: parseDate(row.createdAt),
      },
      update: {
        fullName: row.fullName ?? `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
        email: row.email ?? "",
        phone: row.phone ?? "",
        eventAnswers: parseJsonField(row.eventAnswers) ?? {},
        pagne: row.pagne ?? "",
        lodging: parseJsonField(row.lodging) ?? {},
        message: row.message ?? "",
        attending: Boolean(row.attending),
        createdAt: parseDate(row.createdAt),
      },
    });
  }

  const [contentCount, rsvpCount] = await Promise.all([
    prisma.siteContent.count(),
    prisma.rsvp.count(),
  ]);
  console.log(`Done. Postgres SiteContent=${contentCount}, Rsvp=${rsvpCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
