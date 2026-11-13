import type { Metadata } from "next";
import { FinalCta, Section } from "@/components/Bits";
import ReportExplorer from "@/components/ReportExplorer";
export const metadata: Metadata = { title: "Sample Executive Vulnerability Report", description: "Explore an interactive sample of the executive vulnerability report and Board summary Cybersavants delivers. Illustrative data only.", alternates: { canonical: "/sample-report" } };
export default function Page() {
  return (<>
    <section className="no-print-board dark-surface bg-navy-900 text-white"><div className="container-x py-16 md:py-20">
      <p className="eyebrow mb-3">Sample Executive Report</p>
      <h1 className="font-display max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">The report a CEO can present to the Board.</h1>
      <p className="mt-5 max-w-2xl text-lg text-slate-300">Move between reporting periods, open any risk, follow it to the decision it requires, and print the one-page Board summary. All data is fictional.</p>
    </div></section>
    <Section tone="mist" id="report">
      <ReportExplorer />
      <p className="no-print-board mt-6 max-w-3xl text-sm leading-relaxed text-slate-ink">Illustrative Sample — Not Actual Client Data. Organization, systems, figures, owners, dates and budget ranges are invented for demonstration. Actual reports reflect the scope agreed with each client.</p>
    </Section>
    <FinalCta title="Want a report like this for your leadership team?" lead="Start with a short executive briefing. We will explain how the service would work for your organization." button="Request an Executive Risk Briefing" />
  </>);
}
