import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { type ProjectFilter, type ProjectRecord } from '@/lib/projects';
import { applyPointerGlow, resetPointerGlow } from '@/lib/site-effects';
import { AmbientImageSlider } from './ambient-image-slider';
import {
  getFeaturedProjects,
  getLatestBlogs,
  getLegacyProjectDetailPath,
  getProjectFilters,
  getProjectPreviewGroups,
  homeChips,
  journalTopics,
  processSteps,
  services,
  siteImages,
  testimonials,
} from '@/lib/site-content';
import { BlogCard } from './blog';
import { HeroCinematicContent } from './hero-cinematic-content';
import { Badge, Button, Card, Container, Reveal, SectionTitle, Tabs } from './ui';

const heroHeadline = 'Luxury Spatial Outcomes,\nDocumented for\nReal-World Execution.';

const indiaHeroPillars = [
  { label: 'Studios', value: 'India' },
  { label: 'Sector Lens', value: 'Luxury homes + boutique stays' },
  { label: 'Delivery', value: 'BOQ-ready execution' },
] as const;

function IndiaHero({ contact, proofBarCopy }: { contact: { phone: string; whatsapp: string }; proofBarCopy: string }) {
  const prefersReducedMotion = useReducedMotion();
  const featuredProjects = useMemo(() => getFeaturedProjects(), []);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = featuredProjects[activeProjectIndex] ?? featuredProjects[0];

  useEffect(() => {
    if (featuredProjects.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveProjectIndex((current) => (current + 1) % featuredProjects.length);
    }, 3200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [featuredProjects.length]);

  const backgroundImages = useMemo(
    () =>
      Array.from(
        new Set(
          [
            siteImages.hero,
            siteImages.about,
            ...siteImages.featuredProjects,
            ...siteImages.projectGalleryFallbacks,
          ].filter((item): item is string => Boolean(item)),
        ),
      ),
    [],
  );

  return (
    <section
      id='home-hero'
      data-site-hero='true'
      className='section-fade-edge relative isolate overflow-hidden border-b border-mist bg-[#080808] text-smoke'
    >
      <div className='absolute inset-0 z-0 overflow-hidden'>
        {activeProject ? (
          <AnimatePresence mode='wait' initial={false}>
            <motion.img
              key={activeProject.slug}
              src={activeProject.image}
              alt=''
              aria-hidden='true'
              className='absolute inset-0 h-full w-full scale-[1.04] object-cover grayscale contrast-[1.05] brightness-[0.3]'
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1.04 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{
                duration: prefersReducedMotion ? 0.12 : 1.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </AnimatePresence>
        ) : (
          <AmbientImageSlider images={backgroundImages} imageClassName='scale-[1.04] grayscale contrast-[1.05] brightness-[0.3]' />
        )}
      </div>
      <div className='pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(3,3,3,0.28)_0%,rgba(3,3,3,0.56)_42%,rgba(3,3,3,0.88)_100%)]' />
      <div className='pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_14%_18%,rgba(234,214,181,0.11),transparent_26%),radial-gradient(circle_at_82%_68%,rgba(255,255,255,0.08),transparent_24%)]' />
      <div className='pointer-events-none absolute inset-0 z-[1] architect-hero-grid opacity-20' />

      <Container className='relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-10 lg:py-12'>
        <div className='mt-16 grid w-full gap-4 sm:mt-20 lg:mt-14 lg:min-h-[calc(100svh-8.5rem)] lg:grid-rows-[auto_1fr_auto]'>
          <div className='flex flex-wrap items-center gap-3 border border-[#d7b98c]/20 bg-black/24 px-5 py-4 backdrop-blur-md'>
            <span className='h-px w-10 bg-[#d7b98c]/55' />
            <p className='text-[10px] uppercase tracking-[0.34em] text-[#d8c2a0]/72'>India Studio</p>
            <span className='hidden h-px flex-1 bg-white/10 sm:block' />
            <p className='text-[10px] uppercase tracking-[0.26em] text-white/42'>Luxury residences + boutique hospitality</p>
          </div>

          <div className='grid flex-1 gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]'>
            <div className='flex flex-col justify-between border border-white/12 bg-[linear-gradient(180deg,rgba(13,11,10,0.76)_0%,rgba(13,11,10,0.42)_100%)] px-7 py-7 backdrop-blur-md sm:px-9 sm:py-8 lg:px-10 lg:py-10'>
              <div className='space-y-6'>
                <p className='text-[10px] uppercase tracking-[0.34em] text-[#d8c2a0]/64'>Contemporary Indian Luxury</p>
                <h1 className='max-w-[8.8ch] font-[Cormorant_Garamond] text-[3.2rem] leading-[0.88] text-[#f3ead8] sm:text-[4.5rem] lg:text-[5.2rem] xl:text-[5.7rem]'>
                  Spaces shaped with warmth, restraint, and site-ready precision.
                </h1>
                <p className='max-w-2xl text-sm leading-7 text-[#f1ece4]/78 sm:text-base'>
                  Wanderlust Architects designs villas, apartments, and boutique hospitality environments with a clear Indian material sensibility and disciplined execution thinking.
                </p>
              </div>

              <div className='space-y-5'>
                <div className='flex flex-wrap gap-3'>
                  <Button href='/contact' className='bg-[#f3ead8] !text-black hover:bg-[#ead9b7]'>
                    Book Consultation
                  </Button>
                  <Button href={contact.whatsapp} variant='ghost' className='border-white/35 text-white hover:border-white hover:bg-white hover:text-black' target='_blank' rel='noreferrer'>
                    WhatsApp
                  </Button>
                </div>
                <div className='grid gap-3 sm:grid-cols-3'>
                  {homeChips.map((chip) => (
                    <div key={chip} className='border border-white/10 bg-white/[0.03] px-4 py-4'>
                      <p className='text-[10px] uppercase tracking-[0.22em] text-white/78'>{chip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='grid gap-4 lg:grid-rows-[auto_1fr]'>
              <div className='border border-[#d7b98c]/20 bg-[linear-gradient(180deg,rgba(18,14,11,0.72)_0%,rgba(12,10,9,0.46)_100%)] px-5 py-5 backdrop-blur-md'>
                <p className='text-[10px] uppercase tracking-[0.34em] text-[#d8c2a0]/62'>Practice Note</p>
                <div className='mt-4 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] xl:items-end'>
                  <h2 className='max-w-none font-[Cormorant_Garamond] text-[2rem] leading-[0.94] text-[#f3ead8]'>
                    Contemporary calm, regional warmth, and documentation-led delivery.
                  </h2>
                  <div className='border-t border-white/10 pt-4 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0'>
                    <p className='max-w-none text-sm leading-7 text-[#efe8dc]/66'>{proofBarCopy}</p>
                  </div>
                </div>
              </div>

              {activeProject ? (
                <Link
                  to={getLegacyProjectDetailPath(activeProject)}
                  className='group relative min-h-[24rem] overflow-hidden border border-white/10 bg-white/[0.04]'
                >
                  <AnimatePresence mode='wait' initial={false}>
                    <motion.img
                      key={`${activeProject.slug}-image`}
                      src={activeProject.image}
                      alt={activeProject.title}
                      className='absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0'
                      initial={{ opacity: 0, scale: 1.1, y: 18 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.03, y: -12 }}
                      transition={{
                        duration: prefersReducedMotion ? 0.12 : 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </AnimatePresence>
                  <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.74)_100%)]' />
                  <div className='absolute right-5 top-5 z-[1] flex items-center gap-2'>
                    {featuredProjects.map((project, index) => (
                      <span
                        key={project.slug}
                        aria-hidden='true'
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-300',
                          index === activeProjectIndex ? 'w-10 bg-[#d9c6a9]' : 'w-4 bg-white/30 hover:bg-white/55',
                        )}
                      />
                    ))}
                  </div>
                  <AnimatePresence mode='wait' initial={false}>
                    <motion.div
                      key={`${activeProject.slug}-content`}
                      className='absolute inset-x-0 bottom-0 z-[1] p-6'
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{
                        duration: prefersReducedMotion ? 0.12 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <p className='text-[10px] uppercase tracking-[0.3em] text-[#d9c6a9]/62'>Featured Project</p>
                      <h3 className='mt-3 max-w-[9ch] font-[Cormorant_Garamond] text-[2.45rem] leading-[0.9] text-white'>{activeProject.title}</h3>
                      <p className='mt-3 text-xs uppercase tracking-[0.22em] text-white/62'>{activeProject.location}</p>
                    </motion.div>
                  </AnimatePresence>
                </Link>
              ) : null}
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-3'>
            {indiaHeroPillars.map((pillar) => (
              <div key={pillar.label} className='border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-sm'>
                <p className='text-[10px] uppercase tracking-[0.28em] text-white/44'>{pillar.label}</p>
                <p className='mt-3 font-[Cormorant_Garamond] text-[1.45rem] leading-[0.95] text-white'>{pillar.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProjectFeatureCard({ project, priority = false }: { project: ProjectRecord; priority?: boolean }) {
  const hasYear = Number.isFinite(Number(project.year)) && Number(project.year) > 0;

  return (
    <motion.div className='h-full' whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <Card
        onMouseMove={applyPointerGlow}
        onMouseLeave={resetPointerGlow}
        className='architect-card group flex h-full overflow-hidden transition-all duration-300 hover:border-ink hover:shadow-soft'
      >
        <Link to={getLegacyProjectDetailPath(project)} className='flex h-full w-full flex-col'>
          <div className='relative h-64 overflow-hidden bg-ink/5'>
            <img
              src={project.image}
              alt={project.title}
              className='h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0'
              loading={priority ? 'eager' : 'lazy'}
            />
            <div className='absolute inset-x-0 bottom-0 translate-y-8 bg-gradient-to-t from-black/70 to-transparent p-5 text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
              <p className='text-xs uppercase tracking-[0.2em]'>{project.location}</p>
            </div>
          </div>
          <div className='flex flex-1 flex-col space-y-4 p-6'>
            <div className='flex items-center justify-between gap-3'>
              <Badge>{project.category}</Badge>
              <span className='text-xs uppercase tracking-[0.2em] text-iron'>{hasYear ? project.year : 'Current Portfolio'}</span>
            </div>
            <div className='space-y-3'>
              <h3 className='text-xl leading-tight'>{project.title}</h3>
              <p className='text-sm text-iron'>{project.location}</p>
            </div>
            <p className='mt-auto text-xs uppercase tracking-[0.18em] text-iron'>{project.summary}</p>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

export function HomeHeroSection({
  contact,
  region,
  proofBarCopy,
}: {
  contact: { phone: string; whatsapp: string };
  region: 'IN' | 'AE';
  proofBarCopy: string;
}) {
  if (region === 'IN') {
    return <IndiaHero contact={contact} proofBarCopy={proofBarCopy} />;
  }

  const backgroundImages = useMemo(
    () =>
      Array.from(
        new Set(
          [siteImages.hero, siteImages.about, ...siteImages.featuredProjects, ...siteImages.projectGalleryFallbacks].filter(
            (item): item is string => Boolean(item),
          ),
        ),
      ),
    [],
  );
  return (
    <section
      id='home-hero'
      data-site-hero='true'
      className='section-fade-edge relative isolate overflow-hidden border-b border-mist bg-ink text-smoke'
    >
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <AmbientImageSlider
          images={backgroundImages}
          imageClassName='scale-[1.06] grayscale contrast-[1.02] brightness-[0.4]'
        />
      </div>
      <div className='pointer-events-none absolute inset-0 z-[1] architect-hero-grid' />
      <div className='pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.12),transparent_26%),linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.58)_100%)]' />

      <Container className='relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-12 lg:py-10'>
        <div
          className={cn(
            'mt-16 w-full border border-white/12 bg-black/26 px-6 py-8 backdrop-blur-sm sm:mt-20 sm:px-8 lg:mt-14 lg:px-10 lg:py-10',
            'lg:max-w-5xl',
          )}
        >
          <HeroCinematicContent contact={contact} chips={homeChips} headline={heroHeadline} />
        </div>
      </Container>
    </section>
  );
}

export function HomeProofBarSection({ copy }: { copy: string }) {
  return (
    <section className='section-fade-edge relative overflow-hidden border-b border-mist bg-fog'>
      <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10'>
        <div className='architect-shell rounded-xl px-5 py-4'>
          <p className='relative z-[1] text-xs uppercase tracking-[0.2em] text-iron'>{copy}</p>
        </div>
      </div>
    </section>
  );
}

export function HomeProcessSection() {
  return (
    <section className='section-fade-edge relative isolate overflow-hidden border-b border-mist bg-[linear-gradient(180deg,#f8f8f8_0%,#f2f2f2_100%)]'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.86),transparent_44%),radial-gradient(circle_at_84%_80%,rgba(0,0,0,0.08),transparent_52%)]' />
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10'>
        <div className='grid gap-3 md:grid-cols-6'>
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05} depth className='h-full'>
              <article className='architect-card group relative h-full rounded-xl p-4'>
                <span className='pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-zinc-900/0 via-zinc-900/60 to-zinc-900/0 transition-transform duration-500 ease-out group-hover:scale-x-100' />
                <span className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 [background:radial-gradient(220px_circle_at_18%_10%,rgba(255,255,255,0.72),transparent_58%)]' />
                <p className='relative z-[1] text-[10px] uppercase tracking-[0.22em] text-iron transition-colors duration-300 group-hover:text-zinc-800 [transform:translateZ(18px)]'>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className='relative z-[1] mt-2 text-lg transition-[transform,color] duration-500 ease-out group-hover:text-zinc-900 group-hover:[transform:translate3d(5px,0,20px)]'>
                  {step.title}
                </h2>
                <p className='relative z-[1] mt-2 text-sm text-iron transition-[transform,color] duration-500 ease-out group-hover:text-zinc-700 group-hover:[transform:translate3d(4px,0,16px)]'>
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeServicesSection() {
  const [active, setActive] = useState(services[0]?.title ?? 'Architecture Design');
  const selected = useMemo(() => {
    return services.find((service) => service.title === active) ?? services[0];
  }, [active]);

  const workHref = '/projects';

  return (
    <section className='architect-shell border border-mist bg-white p-6 shadow-[0_18px_52px_rgba(0,0,0,0.08)] lg:p-8'>
      <div className='border-b border-black/10 pb-6'>
        <div className='space-y-3'>
          <p className='text-xs uppercase tracking-[0.28em] text-iron'>Services</p>
          <h2 className='max-w-[28ch] font-[Cormorant_Garamond] text-[2.7rem] leading-[0.92] text-black sm:text-[3.15rem] lg:max-w-[24ch] xl:max-w-[28ch]'>
            Design scopes that stay elegant in presentation and precise in execution.
          </h2>
          <p className='max-w-4xl text-sm leading-7 text-iron'>
            Choose a service line to preview how Wanderlust structures deliverables, detailing, and site-ready outcomes.
          </p>
          <div className='flex flex-wrap gap-3 pt-2'>
            <Button
              href='/contact'
              variant='subtle'
              className='!rounded-none border border-black/12 bg-white px-6 !text-black shadow-none transition-colors hover:border-black hover:bg-black hover:!text-white'
            >
              Start Project
            </Button>
            <Button
              href={workHref}
              variant='ghost'
              className='!rounded-none border-black/15 bg-transparent !text-black shadow-none hover:border-black hover:bg-black hover:!text-white'
            >
              View Our Work
            </Button>
          </div>
        </div>
      </div>

      <div className='mt-6 grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={selected.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className='grid gap-4 lg:col-span-2'
          >
            <div className='grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)_18rem] lg:items-stretch'>
              <div className='grid gap-2 lg:h-full lg:grid-rows-5'>
                {services.map((service, index) => (
                  <button
                    key={service.title}
                    type='button'
                    onClick={() => setActive(service.title)}
                    className={cn(
                      'grid h-full min-h-[4.9rem] grid-cols-[2.1rem_minmax(0,1fr)] items-center gap-3 border px-4 py-4 text-left transition-colors duration-300',
                      service.title === active
                        ? 'border-black bg-black text-white'
                        : 'border-black/10 bg-white text-black hover:border-black/30 hover:bg-[#faf8f4]',
                    )}
                  >
                    <span
                      className={cn(
                        'text-[10px] uppercase tracking-[0.22em]',
                        service.title === active ? 'text-[#d8c2a0]/84' : 'text-iron',
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className='text-xs uppercase tracking-[0.24em]'>{service.title}</span>
                  </button>
                ))}
              </div>

              <div className='relative min-h-[30rem] overflow-hidden border border-black/10 bg-black'>
                <img src={selected.image} alt={selected.title} className='h-full w-full object-cover grayscale' />
                <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.74)_100%)]' />
                <div className='absolute inset-x-0 bottom-0 p-6 sm:p-7'>
                  <p className='text-[10px] uppercase tracking-[0.3em] text-[#d8c2a0]/70'>Selected Service</p>
                  <h3 className='mt-3 max-w-[9ch] font-[Cormorant_Garamond] text-[2.7rem] leading-[0.92] text-white'>{selected.title}</h3>
                  <p className='mt-3 max-w-xl text-sm leading-7 text-white/74'>{selected.copy}</p>
                </div>
              </div>

              <div className='grid gap-2 lg:h-full lg:grid-rows-5'>
                <div className='flex min-h-[4.9rem] flex-col justify-center border border-black/10 bg-[#f7f5f1] px-6 py-4'>
                  <div>
                    <p className='text-[10px] uppercase tracking-[0.3em] text-iron'>Service Summary</p>
                    <h4 className='mt-2 max-w-[10ch] font-[Cormorant_Garamond] text-[1.95rem] leading-[0.94] text-black sm:text-[2.1rem]'>
                      {selected.title}
                    </h4>
                  </div>
                </div>
                <div className='flex min-h-[4.9rem] flex-col justify-center border border-black/10 bg-white px-6 py-4'>
                  <div>
                    <p className='text-[10px] uppercase tracking-[0.24em] text-iron'>Outcome</p>
                    <p className='mt-2 font-[Cormorant_Garamond] text-[1.45rem] leading-none text-black'>Build-ready</p>
                  </div>
                </div>
                {selected.points.map((point) => (
                  <div key={point} className='flex min-h-[4.9rem] items-center border border-black/10 bg-white px-6 py-4 text-sm leading-7 text-iron'>
                    <p>{point}</p>
                  </div>
                ))}
                {selected.points.length < services.length - 2
                  ? Array.from({ length: services.length - 2 - selected.points.length }).map((_, index) => (
                      <div key={`filler-${index}`} className='flex min-h-[4.9rem] items-center border border-black/10 bg-[#f7f5f1] px-6 py-4 text-sm leading-7 text-iron/65'>
                        Structured scope alignment
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function HomeProjectsSection() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className='section-fade-edge architect-shell space-y-10 rounded-2xl p-8 lg:p-10'>
      <SectionTitle
        eyebrow='Featured Projects'
        title='Selected work across hospitality, residential, and workplace categories.'
        description='Every selected project combines strong visual identity with execution-ready detailing.'
      />
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.06} className='h-full'>
            <ProjectFeatureCard project={project} priority={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function HomeAboutSection() {
  return (
    <section className='architect-shell grid gap-8 rounded-2xl p-8 shadow-soft lg:grid-cols-[1.1fr_1fr] lg:items-center lg:p-12'>
      <div className='relative h-[360px] overflow-hidden rounded-xl border border-mist'>
        <img src={siteImages.about} alt='About Wanderlust Architects' className='h-full w-full object-cover grayscale' />
      </div>
      <div className='relative z-[1] space-y-5'>
        <p className='text-xs uppercase tracking-[0.22em] text-iron'>About Studio</p>
        <h2 className='text-4xl leading-tight'>
          A multidisciplinary team focused on clear design decisions and reliable project outcomes.
        </h2>
        <p className='text-sm text-iron'>
          From architecture and interiors to office fit-outs and project delivery, we align design intent with build precision.
        </p>
        <Button href='/about' variant='ghost'>
          Discover Studio
        </Button>
      </div>
    </section>
  );
}

export function HomeGallerySection() {
  const filters = getProjectFilters();
  const [active, setActive] = useState<ProjectFilter>('All');
  const items = useMemo(() => getProjectPreviewGroups(active), [active]);

  return (
    <section className='section-fade-edge architect-shell space-y-10 rounded-2xl p-8 lg:p-10'>
      <SectionTitle eyebrow='Project Gallery' title='Explore category-led visuals across our design and delivery spectrum.' />
      <section className='space-y-6'>
        <Tabs items={filters} active={active} onChange={setActive} />
        <motion.div layout className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {items.map((item) => (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              className='group overflow-hidden border border-mist bg-white'
            >
              <Link to={item.href} className='block'>
                <div className='relative h-56'>
                  <img src={item.image} alt={item.title} className='h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0' />
                </div>
                <div className='p-4'>
                  <p className='text-[10px] uppercase tracking-[0.18em] text-iron'>{item.category}</p>
                  <h3 className='mt-2 text-lg'>{item.title}</h3>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </section>
  );
}

export function HomeTestimonialsSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((current) => (current + 1) % testimonials.length);
  const prev = () => setIndex((current) => (current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className='architect-shell space-y-10 rounded-2xl p-8 lg:p-10'>
      <SectionTitle eyebrow='Testimonials' title='What project partners say about our process.' />
      <div className='rounded-xl border border-mist bg-white p-8 shadow-soft lg:p-12'>
        <AnimatePresence mode='wait'>
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className='space-y-6'
          >
            <blockquote className='max-w-4xl text-2xl leading-relaxed sm:text-3xl'>
              "{testimonials[index]?.quote}"
            </blockquote>
            <figcaption className='flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-iron'>
              <span>{testimonials[index]?.clientType}</span>
              <span aria-hidden='true'>*</span>
              <span>{testimonials[index]?.city}</span>
              <span aria-hidden='true'>*</span>
              <span>{testimonials[index]?.scope}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className='mt-8 flex gap-3'>
          <Button variant='subtle' onClick={prev} aria-label='Previous testimonial'>
            Prev
          </Button>
          <Button variant='subtle' onClick={next} aria-label='Next testimonial'>
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HomeJournalSection() {
  const latestBlogs = getLatestBlogs();

  return (
    <section className='section-fade-edge architect-shell space-y-8 rounded-2xl p-8 lg:p-10'>
      <SectionTitle eyebrow='Latest Blogs' title='Insights on architecture, fit-outs, and project delivery strategy.' />
      <div className='flex flex-wrap gap-2'>
        {journalTopics.map((topic) => (
          <Link
            key={topic}
            to={`/blog?tag=${encodeURIComponent(topic.toLowerCase())}`}
            className='rounded-md border border-mist px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-iron transition-colors hover:border-ink hover:text-ink'
          >
            {topic}
          </Link>
        ))}
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {latestBlogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  );
}

export function HomeBrandsSection() {
  return (
    <section className='space-y-4'>
      <p className='text-xs uppercase tracking-[0.22em] text-iron'>Trusted by</p>
      <div className='grid grid-cols-2 gap-4 border border-mist bg-white p-6 shadow-soft sm:grid-cols-3 lg:grid-cols-5'>
        {siteImages.clientLogos.map((logo) => (
          <div key={logo} className='relative h-14'>
            <img src={logo} alt='Client logo' className='h-full w-full object-contain grayscale opacity-45 transition duration-300 hover:opacity-100' />
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeStatsSection() {
  const stats = [
    {
      label: 'Projects Completed',
      value: '100+',
    },
    {
      label: 'Drawings Delivered',
      value: '1 Million+',
    },
    {
      label: 'Design Awards',
      value: '3+',
    },
    {
      label: 'Active Projects',
      value: '32+',
    },
  ];

  return (
    <div className='grid gap-6 border border-mist bg-white p-8 shadow-soft sm:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className='flex flex-col items-center justify-center border-b border-mist pb-5 text-center lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6 last:border-none'
        >
          <p className='font-[Cormorant_Garamond] text-[2.6rem] leading-none text-black'>{stat.value}</p>
          <p className='mt-2 text-xs uppercase tracking-[0.2em] text-iron'>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export function HomePageSections({
  region,
  contact,
  proofBarCopy,
}: {
  region: 'IN' | 'AE';
  contact: { phone: string; whatsapp: string };
  proofBarCopy: string;
}) {
  return (
    <>
      <HomeHeroSection contact={contact} region={region} proofBarCopy={proofBarCopy} />
      <HomeProofBarSection copy={proofBarCopy} />
      <HomeProcessSection />

      <div className='mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-10 lg:py-20'>
        <HomeServicesSection />
        <HomeProjectsSection />
        <HomeAboutSection />
        <HomeBrandsSection />
        <HomeGallerySection />
        <HomeStatsSection />
        <HomeTestimonialsSection />
        <HomeJournalSection />
      </div>
    </>
  );
}
