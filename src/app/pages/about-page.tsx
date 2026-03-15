import { siteImages, teamMembers } from '@/lib/site-content';
import { Reveal, SectionTitle } from '@/components/site/ui';
import { HomeTestimonialsSection } from '@/components/site/home-sections';

export default function AboutPage() {
  return (
    <div className='mx-auto max-w-7xl space-y-24 px-4 py-16 sm:px-6 lg:px-10 lg:py-24'>
      <Reveal>
        <section className='grid gap-8 rounded-xl border border-mist bg-white p-8 shadow-soft lg:grid-cols-[1.2fr_1fr] lg:p-12'>
          <SectionTitle
            eyebrow='About Studio'
            title='Architecture is where we belong.'
            description='We shape premium environments through architecture, interior design, office fit-outs, and structured project delivery.'
          />
          <div className='relative h-72 overflow-hidden rounded-lg border border-mist lg:h-full'>
            <img src={siteImages.about} alt='Wanderlust Architects studio' className='h-full w-full object-cover grayscale' />
          </div>
        </section>
      </Reveal>

      <section className='grid gap-5 md:grid-cols-2'>
        <Reveal>
          <article className='rounded-xl border border-mist bg-white p-6 shadow-soft'>
            <p className='text-xs uppercase tracking-[0.2em] text-iron'>Mission</p>
            <p className='mt-3 text-sm text-iron'>
              Deliver high-performance, high-impact spaces that balance design distinction with execution reliability.
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <article className='rounded-xl border border-mist bg-white p-6 shadow-soft'>
            <p className='text-xs uppercase tracking-[0.2em] text-iron'>Vision</p>
            <p className='mt-3 text-sm text-iron'>
              Build a benchmark design-delivery studio trusted by clients for clarity, speed, and refined outcomes.
            </p>
          </article>
        </Reveal>
      </section>

      <section className='space-y-8'>
        <SectionTitle eyebrow='Team' title='Leadership focused on design quality and project outcomes.' />
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.06}>
              <article className='h-full rounded-xl border border-mist bg-white p-6 shadow-soft'>
                <div className='relative mb-4 h-72 overflow-hidden rounded-md border border-mist md:h-80'>
                  <img src={member.image} alt={member.name} className='h-full w-full object-cover object-top grayscale' />
                </div>
                <h3 className='text-2xl'>{member.name}</h3>
                <p className='text-xs uppercase tracking-[0.2em] text-iron'>{member.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className='space-y-6'>
        <SectionTitle eyebrow='Client Voice' title='Trusted by private and commercial clients across India.' />
        <HomeTestimonialsSection />
      </section>
    </div>
  );
}
