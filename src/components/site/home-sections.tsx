import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { type ProjectFilter, type ProjectRecord } from '@/lib/projects';
import { applyPointerGlow, resetPointerGlow } from '@/lib/site-effects';
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
  type SiteRegion,
} from '@/lib/site-content';
import { BlogCard } from './blog';
import { GridMotion } from './grid-motion';
import { HeroCinematicContent } from './hero-cinematic-content';
import { Badge, Button, Card, Container, Reveal, SectionTitle, Tabs } from './ui';

const heroHeadline = 'Luxury Spatial Outcomes,\nDocumented for\nReal-World Execution.';

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

export function HomeHeroSection({ contact }: { contact: { phone: string; whatsapp: string } }) {
  const imagePool = useMemo(
    () =>
      Array.from(
        new Set(
          [siteImages.hero, ...siteImages.featuredProjects, ...siteImages.projectGalleryFallbacks, ...siteImages.blogThumbs].filter(
            (item): item is string => Boolean(item),
          ),
        ),
      ),
    [],
  );
  const backgroundItems = useMemo(
    () => (imagePool.length > 0 ? Array.from({ length: 28 }, (_, index) => imagePool[index % imagePool.length]) : []),
    [imagePool],
  );

  return (
    <section
      id='home-hero'
      data-site-hero='true'
      className='section-fade-edge relative isolate overflow-hidden border-b border-mist bg-ink text-smoke'
    >
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <GridMotion items={backgroundItems} gradientColor='#d5d4d8' className='h-full w-full scale-[1.08]' />
      </div>
      <div className='pointer-events-none absolute inset-0 z-[1] architect-hero-grid' />
      <div className='pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[44%] border-r border-white/10 lg:block' />
      <div className='pointer-events-none absolute inset-0 z-[1] architect-hero-beam' />
      <div className='pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.18),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_32%),linear-gradient(112deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_38%,transparent_66%)]' />

      <Container className='relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-12 lg:py-10'>
        <div className='architect-hero-frame mt-16 w-full px-6 py-10 sm:mt-20 sm:px-8 lg:mt-14 lg:px-10 lg:py-12'>
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
    <section className='architect-shell grid gap-8 rounded-2xl border border-mist p-8 shadow-soft lg:grid-cols-[1.2fr_0.8fr] lg:p-12'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <p className='text-xs uppercase tracking-[0.22em] text-iron'>Services</p>
          <Button href='/contact' variant='subtle'>
            Start Project
          </Button>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          {services.map((service, index) => (
            <motion.button
              key={service.title}
              type='button'
              onClick={() => setActive(service.title)}
              onMouseMove={applyPointerGlow}
              onMouseLeave={resetPointerGlow}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.04 }}
              className={cn(
                'architect-card group p-5 text-left transition-all duration-300',
                active === service.title ? 'border-ink bg-ink text-smoke' : 'border-mist hover:border-ink',
              )}
            >
              <p className='text-[11px] uppercase tracking-[0.2em]'>0{index + 1}</p>
              <h3 className='mt-3 text-xl'>{service.title}</h3>
              <p className={cn('mt-2 text-sm', active === service.title ? 'text-silver' : 'text-iron')}>{service.copy}</p>
            </motion.button>
          ))}
        </div>
        <div>
          <Button href={workHref} variant='ghost'>
            View Our Work
          </Button>
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start'>
        <div className='hidden lg:grid lg:gap-2'>
          {services.map((service) => (
            <button
              key={service.title}
              type='button'
              onClick={() => setActive(service.title)}
              onMouseMove={applyPointerGlow}
              onMouseLeave={resetPointerGlow}
              className={cn(
                'w-56 border px-4 py-3 text-left text-xs uppercase tracking-[0.18em] transition-colors',
                service.title === active ? 'border-ink bg-ink text-smoke' : 'border-mist text-iron hover:border-ink hover:text-ink',
              )}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className='space-y-4'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={selected.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              onMouseMove={applyPointerGlow}
              onMouseLeave={resetPointerGlow}
              className='architect-card relative h-[360px] overflow-hidden'
            >
              <img src={selected.image} alt={selected.title} className='h-full w-full object-cover grayscale' />
            </motion.div>
          </AnimatePresence>
          <div onMouseMove={applyPointerGlow} onMouseLeave={resetPointerGlow} className='architect-card p-5'>
            <h4 className='text-2xl'>{selected.title}</h4>
            <ul className='mt-3 space-y-2 text-sm text-iron'>
              {selected.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
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
      value: undefined,
      fallback: 'Project counts are validated and published per reporting cycle.',
    },
    {
      label: 'Drawings Delivered',
      value: undefined,
      fallback: 'Drawing package volumes are shared after internal QA validation.',
    },
    {
      label: 'Design Awards',
      value: undefined,
      fallback: 'Recognition updates are published once formally announced.',
    },
    {
      label: 'Active Projects',
      value: undefined,
      fallback: 'Active project load is communicated with current scheduling windows.',
    },
  ];

  return (
    <div className='grid gap-6 border border-mist bg-white p-8 shadow-soft sm:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => (
        <div key={stat.label} className='border-b border-mist pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6 last:border-none'>
          {typeof stat.value === 'number' ? <p className='text-4xl'>{stat.value}+</p> : <p className='text-sm text-iron'>{stat.fallback}</p>}
          <p className='mt-2 text-xs uppercase tracking-[0.2em] text-iron'>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export function HomePageSections({ region, contact, proofBarCopy }: { region: SiteRegion; contact: { phone: string; whatsapp: string }; proofBarCopy: string }) {
  return (
    <>
      <HomeHeroSection contact={contact} />
      <HomeProofBarSection copy={proofBarCopy} />
      <HomeProcessSection />

      <div className='mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-6 lg:px-10 lg:py-24'>
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
