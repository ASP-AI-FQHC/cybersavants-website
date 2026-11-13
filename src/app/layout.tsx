import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/Chrome";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Executive Vulnerability Management & Board Cybersecurity Reporting | Cybersavants", template: "%s | Cybersavants" },
  description: "Cybersecurity risk, translated for the boardroom. Executive vulnerability management with board-ready reporting and a monthly strategic review for CEOs, CFOs, COOs and Boards, including healthcare leaders.",
  openGraph: { type: "website", siteName: "Cybersavants", title: "Cybersecurity Risk, Translated for the Boardroom", description: "Executive vulnerability management with board-ready reporting and a monthly advisory review." },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#0a1730", width: "device-width", initialScale: 1 };

const ld = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Cybersavants", url: SITE.url, email: SITE.email, description: "Executive vulnerability management and board cybersecurity reporting, with a focus on healthcare organizations." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
