import { prisma } from "@/lib/prisma";
import {
  defaultSiteContent,
  mergeSiteContent,
  type SiteContentData,
} from "@/lib/site-content";

export async function getSiteContent(): Promise<SiteContentData> {
  try {
    const row = await prisma.siteContent.findUnique({
      where: { id: "default" },
    });

    if (!row) {
      await prisma.siteContent.create({
        data: { id: "default", data: defaultSiteContent },
      });
      return defaultSiteContent;
    }

    return mergeSiteContent(row.data);
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteContent(data: SiteContentData) {
  return prisma.siteContent.upsert({
    where: { id: "default" },
    create: { id: "default", data },
    update: { data },
  });
}
