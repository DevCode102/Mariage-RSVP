import { prisma } from "@/lib/prisma";
import { getSiteContent } from "@/lib/site-content-db";
import { rsvpEventLabel } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

export default async function AdminRsvpPage() {
  const content = await getSiteContent();
  let rsvps: Awaited<ReturnType<typeof prisma.rsvp.findMany>> = [];
  let dbError = false;

  try {
    rsvps = await prisma.rsvp.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    dbError = true;
  }

  const total = rsvps.length;
  const attending = rsvps.filter((r) => r.attending).length;
  const declining = total - attending;
  const rsvpEvents = content.events.filter((e) => e.includeInRsvp !== false);
  const lodgingFields = content.rsvpLodgingFields.filter((f) => f.enabled);

  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">RSVP List</h1>
      <p className="mt-2 text-stone-600">
        Confirmations de présence des invités
      </p>

      {dbError ? (
        <p className="mt-10 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Impossible de charger les données. Vérifiez `DATABASE_URL`.
        </p>
      ) : (
        <>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="border-b-2 border-orange-bright pb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Total
              </p>
              <p className="font-display mt-1 text-4xl font-semibold text-ink">
                {total}
              </p>
            </div>
            <div className="border-b-2 border-orange-bright pb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Présents (au moins 1 événement)
              </p>
              <p className="font-display mt-1 text-4xl font-semibold text-orange-deep">
                {attending}
              </p>
            </div>
            <div className="border-b-2 border-stone-300 pb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Absents
              </p>
              <p className="font-display mt-1 text-4xl font-semibold text-stone-600">
                {declining}
              </p>
            </div>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-stone-300 text-xs uppercase tracking-[0.15em] text-stone-500">
                  <th className="py-3 pr-4 font-medium">Nom</th>
                  <th className="py-3 pr-4 font-medium">Contact</th>
                  {rsvpEvents.map((event) => (
                    <th key={event.id} className="py-3 pr-4 font-medium">
                      {rsvpEventLabel(event)}
                    </th>
                  ))}
                  {content.rsvpPagneEnabled ? (
                    <th className="py-3 pr-4 font-medium">Pagne</th>
                  ) : null}
                  {lodgingFields.map((field) => (
                    <th key={field.id} className="py-3 pr-4 font-medium">
                      {field.label}
                    </th>
                  ))}
                  <th className="py-3 pr-4 font-medium">Message</th>
                  <th className="py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.length === 0 ? (
                  <tr>
                    <td
                      colSpan={
                        4 +
                        rsvpEvents.length +
                        (content.rsvpPagneEnabled ? 1 : 0) +
                        lodgingFields.length
                      }
                      className="py-10 text-center text-stone-500"
                    >
                      Aucune réponse pour le moment.
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => {
                    const answers = asRecord(rsvp.eventAnswers);
                    const lodging = asRecord(rsvp.lodging);
                    return (
                      <tr
                        key={rsvp.id}
                        className="border-b border-stone-200/80 align-top text-ink"
                      >
                        <td className="py-3.5 pr-4 font-medium">{rsvp.fullName}</td>
                        <td className="py-3.5 pr-4 text-stone-600">
                          {rsvp.email ? <div>{rsvp.email}</div> : null}
                          {rsvp.phone ? <div>{rsvp.phone}</div> : null}
                          {!rsvp.email && !rsvp.phone ? "—" : null}
                        </td>
                        {rsvpEvents.map((event) => {
                          const yes = answers[event.id] === true;
                          const no = answers[event.id] === false;
                          return (
                            <td key={event.id} className="py-3.5 pr-4">
                              <span
                                className={
                                  yes
                                    ? "font-medium text-orange-deep"
                                    : no
                                      ? "text-stone-500"
                                      : "text-stone-400"
                                }
                              >
                                {yes ? "Oui" : no ? "Non" : "—"}
                              </span>
                            </td>
                          );
                        })}
                        {content.rsvpPagneEnabled ? (
                          <td className="py-3.5 pr-4 text-stone-600">
                            {rsvp.pagne || "—"}
                          </td>
                        ) : null}
                        {lodgingFields.map((field) => (
                          <td key={field.id} className="py-3.5 pr-4 text-stone-600">
                            {String(lodging[field.id] ?? "—")}
                          </td>
                        ))}
                        <td className="max-w-[14rem] py-3.5 pr-4 text-stone-600">
                          {rsvp.message ? (
                            <span className="line-clamp-3">{rsvp.message}</span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="py-3.5 whitespace-nowrap text-stone-500">
                          {formatDate(rsvp.createdAt)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
