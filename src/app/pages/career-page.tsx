import { Link } from 'react-router';
import { Reveal, SectionTitle } from '@/components/site/ui';

export default function CareerPage() {
  return (
    <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24'>
      <Reveal>
        <section className='space-y-6 rounded-xl border border-mist bg-white p-8 shadow-soft lg:p-12'>
          <SectionTitle
            eyebrow='Career'
            title='We hire designers and project thinkers with sharp taste and strong technical discipline.'
            description='If you are serious about design quality and buildability, send your portfolio and role interest.'
          />
          <a href='mailto:careers@wanderlustarchitects.com' className='inline-flex rounded-md border border-ink px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-smoke'>
            careers@wanderlustarchitects.com
          </a>
        </section>
      </Reveal>
    </div>
  );
}
