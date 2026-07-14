import React from 'react';
import { FileDown } from 'lucide-react';
import { GlassCard, PageShell, SectionHeading } from '../../components/exam/ExamComponents';
import { initialForms } from '../../data/examPortalData';
import { useExamPortal } from '../../context/ExamPortalContext';

export default function FormsPage() {
  const { notify } = useExamPortal();

  function downloadForm(item) {
    const content = `APJ Institute Raipur\n\n${item.name}\n${item.description}\n\nThis is a demo downloadable form template.`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = item.file;
    anchor.click();
    URL.revokeObjectURL(url);
    notify(`${item.name} download started.`, 'success');
  }

  return (
    <PageShell title="Forms" subtitle="Download examination, admission, and scholarship forms from the same portal.">
      <GlassCard className="p-5 sm:p-6">
        <SectionHeading eyebrow="Forms Section" title="Document downloads" description="Each card is ready for backend PDF upload integration and can be replaced with official files later." />

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {initialForms.map((item) => (
            <article key={item.id} className="flex h-full flex-col justify-between rounded-[1.8rem] border border-white/10 bg-slate-950/55 p-5">
              <div>
                <span className="inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-100">{item.type}</span>
                <h3 className="mt-4 text-xl font-bold text-white">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => downloadForm(item)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]"
              >
                <FileDown size={16} /> Download PDF
              </button>
            </article>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
