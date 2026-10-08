import { SiteHeader, SiteFooter } from "@/components/site-shell";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="public-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
