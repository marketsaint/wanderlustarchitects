import { siteImages, teamMembers } from '@/lib/site-content';
import { Reveal, SectionTitle } from '@/components/site/ui';

export default function AboutPage() {
  const leadershipTeam = teamMembers.slice(0, 2);

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
        <div className='grid gap-8 lg:grid-cols-2'>
          {leadershipTeam.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.06}>
              <a
                href={member.linkedin}
                target='_blank'
                rel='noreferrer'
                className='block h-full border border-mist bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-ink lg:p-6'
              >
                <article className='flex h-full flex-col gap-5'>
                  <div className='relative min-h-[30rem] overflow-hidden border border-mist md:min-h-[34rem]'>
                    <img src={member.image} alt={member.name} className='h-full w-full object-cover object-top grayscale' />
                  </div>
                  <div className='grid gap-6 border border-mist px-6 py-7 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-end'>
                    <div className='space-y-4'>
                      <p className='text-[10px] uppercase tracking-[0.24em] text-iron'>LinkedIn</p>
                      <h3 className='font-[Cormorant_Garamond] text-[2.35rem] leading-[0.92] sm:text-[2.7rem]'>
                        {member.displayName ?? member.name}
                      </h3>
                      <p className='text-xs uppercase tracking-[0.2em] text-iron'>{member.role}</p>
                    </div>
                    <div className='space-y-4 lg:border-l lg:border-mist lg:pl-6'>
                      <div className='h-px w-16 bg-mist' />
                      <p className='text-sm leading-7 text-iron'>Studio leadership, design clarity, and delivery direction.</p>
                      <p className='text-[11px] uppercase tracking-[0.22em] text-iron'>View LinkedIn</p>
                    </div>
                  </div>
                </article>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
