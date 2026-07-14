import React from 'react';

export default function AboutInstitute() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-3xl font-bold text-slate-900">About APJ Institute Raipur</h1>
        <p className="mt-4 text-slate-600">
          APJ Institute Raipur is dedicated to preparing healthcare professionals through practical,
          patient-focused, and technology-enabled education.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card
            title="Mission"
            text="To provide accessible, quality medical and allied health education with strong ethics and practical skills."
          />
          <Card
            title="Vision"
            text="To be a leading rural healthcare education institute building job-ready and socially responsible professionals."
          />
          <Card
            title="Facilities"
            text="Modern diagnostic labs, simulation practice areas, digital classrooms, and clinical demonstration support."
          />
          <Card
            title="Laboratory Excellence"
            text="Hands-on training in pathology, biochemistry, microbiology, and radiology support workflows."
          />
        </div>
      </section>
    </main>
  );
}

function Card({ title, text }) {
  return (
    <article className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </article>
  );
}
