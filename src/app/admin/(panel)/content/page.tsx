import { getSiteContent } from "@/lib/site-content-db";
import { SiteContentForm } from "@/components/SiteContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const content = await getSiteContent();

  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">
        Site Content
      </h1>
      <p className="mt-2 text-stone-600">
        Personnalisez tous les textes et médias affichés sur le site.
      </p>
      <div className="mt-10">
        <SiteContentForm initial={content} />
      </div>
    </>
  );
}
