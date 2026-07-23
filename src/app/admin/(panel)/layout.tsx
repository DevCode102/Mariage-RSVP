import { AdminNav } from "@/components/AdminNav";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="section-texture min-h-[100svh]">
      <AdminNav />
      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-10">{children}</div>
    </div>
  );
}
