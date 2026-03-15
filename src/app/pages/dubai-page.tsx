import {
  ArrowRight,
  Building2,
  Clock3,
  Gem,
  Globe2,
  Layers3,
  MapPin,
  Palette,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from 'react-router';
import { Badge, Button, Container, Reveal, SectionTitle } from '@/components/site/ui';
import { dubaiSectors, dubaiServices, getContactByRegion, siteImages } from '@/lib/site-content';
import { type ProjectRecord, projects } from '@/lib/projects';

const dubaiContact = getContactByRegion('AE');
const dubaiPhoneDisplay = '+971 54 505 2126';

const heroAreas = ['Palm Jumeirah', 'Downtown Dubai', 'Business Bay', 'Dubai Hills Estate', 'Jumeirah Islands'];

const trustMetrics = [
  { value: '24h', label: 'First response on Dubai briefs' },
  { value: `${projects.length}+`, label: 'Projects across hospitality, villas, and workplace interiors' },
  { value: 'BOQ-Ready', label: 'Drawing and execution package discipline', valueClassName: 'text-[clamp(2rem,2.8vw,3rem)]' },
  {
    value: dubaiPhoneDisplay,
    label: 'Direct Dubai contact line',
    valueClassName: 'whitespace-nowrap text-[clamp(1.85rem,2.3vw,2.65rem)] tracking-[-0.04em]',
  },
];

const dubaiAdvantages = [
  {
    icon: Gem,
    title: 'Luxury that feels editorial, not generic',
    copy: 'We build quiet confidence through proportion, texture, lighting hierarchy, and statement details that suit premium Dubai clients.',
  },
  {
    icon: ShieldCheck,
    title: 'Design decisions backed by execution logic',
    copy: 'Layouts, finishes, and detailing are shaped for fit-out clarity, consultant coordination, and handover confidence.',
  },
  {
    icon: Globe2,
    title: 'Structured communication for remote stakeholders',
    copy: 'Ideal for founders, investors, and homeowners who need a team that can move fast, summarize clearly, and protect quality.',
  },
  {
    icon: Palette,
    title: 'Material storytelling shaped for Dubai',
    copy: 'Warm stone, reflective surfaces, layered neutrals, brass accents, and atmosphere-led lighting create a Dubai-relevant interior mood.',
  },
];

const dubaiJourney = [
  {
    step: '01',
    title: 'Brief + Positioning',
    copy: 'We align project ambition, target user, budget comfort zone, and handover priorities before design direction starts.',
  },
  {
    step: '02',
    title: 'Concept + Mood',
    copy: 'Spatial story, material language, and signature moments are developed to match Dubai-level expectations and brand perception.',
  },
  {
    step: '03',
    title: 'Design Development',
    copy: 'Layouts, joinery intent, lighting layers, FF&E direction, and technical coordination move into client-approval-ready clarity.',
  },
  {
    step: '04',
    title: 'Documentation + Delivery',
    copy: 'We prepare construction-ready outputs, BOQ-linked decisions, contractor alignment, and review checkpoints through to handover.',
  },
];

const dubaiFaqs = [
  {
    question: 'Can you handle Dubai interior projects for clients who are not always on site?',
    answer:
      'Yes. The workflow is built for remote visibility with structured approvals, milestone summaries, material direction, and decision-ready presentations.',
  },
  {
    question: 'Do you support both design and fit-out readiness?',
    answer:
      'Yes. Our work is strongest when concept quality is matched with detailed documentation, BOQ coordination, and contractor-facing clarity.',
  },
  {
    question: 'What project types do you prioritise in Dubai?',
    answer:
      'Luxury villas, hospitality spaces, premium residential interiors, executive workplaces, and high-impression commercial environments.',
  },
  {
    question: 'Why shortlist Wanderlust Architects for Dubai interiors?',
    answer:
      'Because the offer is not only visual. You get aesthetic direction, execution discipline, and a communication process that reduces uncertainty.',
  },
];

const serviceDeliverables: Record<string, string[]> = {
  'Architecture Design': ['Planning strategy', 'Facade and massing direction', 'Authority-ready design coordination'],
  'Interior Design': ['Material palette and styling intent', 'Luxury joinery and lighting detailing', 'Client-facing presentation and approval decks'],
  'Office Fit-Outs': ['Brand-led planning', 'Contractor-ready interior packages', 'Meeting, reception, and leadership suite detailing'],
  'Project Delivery': ['BOQ-linked coordination', 'Site review rhythm', 'Vendor, contractor, and snag-list follow-through'],
};

const signatureProjects = projects.slice(0, 4);

function DubaiPortfolioCard({ project, compact = false }: { project: ProjectRecord; compact?: boolean }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className='group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#dcc7a5]/55 bg-white/88 shadow-[0_26px_60px_rgba(43,24,9,0.08)] transition-transform duration-500 hover:-translate-y-1'
    >
      <div className={compact ? 'relative h-56 overflow-hidden' : 'relative h-72 overflow-hidden'}>
        <img
          src={project.image}
          alt={project.title}
          className='h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:grayscale-0'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent' />
        <div className='absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 pb-5 text-[11px] uppercase tracking-[0.22em] text-white/90'>
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-4 p-5'>
        <div className='flex items-center justify-between gap-3'>
          <Badge className='border-[#dcc7a5] bg-[#fbf5ec] text-[#7f6c4f]'>{project.category}</Badge>
          <span className='text-[11px] uppercase tracking-[0.22em] text-[#8f7f69]'>{project.projectType}</span>
        </div>
        <div className='space-y-3'>
          <h3 className={compact ? 'text-2xl leading-tight text-[#17110b]' : 'text-3xl leading-tight text-[#17110b]'}>{project.title}</h3>
          <p className='text-sm leading-7 text-[#5f5343]'>{project.description}</p>
        </div>
        <div className='mt-auto inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#6f5a3d] transition group-hover:text-[#1b130b]'>
          <span>Open project</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}

export default function DubaiPage() {
  return (
    <div className='bg-[linear-gradient(180deg,#f7f0e6_0%,#f4ebdf_45%,#efe6db_100%)] text-[#1a140d]'>
      <section data-site-hero='true' className='relative isolate overflow-hidden border-b border-[#d2b282]/25 bg-[#060301] text-[#f8f1e5]'>
        <div className='absolute inset-0'>
          <img
            src={siteImages.dubaiHero}
            alt='Wanderlust Architects Dubai interior design'
            className='h-full w-full object-cover opacity-75 [filter:saturate(0.82)_brightness(0.42)]'
          />
        </div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(217,176,112,0.16),transparent_24%),radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.12),transparent_26%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(102deg,rgba(6,3,1,0.96)_6%,rgba(6,3,1,0.82)_38%,rgba(6,3,1,0.48)_70%,rgba(6,3,1,0.82)_100%)]' />
        <div className='absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:84px_84px]' />

        <Container className='relative z-10 py-24 sm:py-28 lg:py-36'>
          <div className='grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end'>
            <Reveal className='space-y-8'>
              <div className='inline-flex items-center gap-3 rounded-full border border-[#d7b27c]/35 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-[#f3dec1] backdrop-blur-md'>
                <Sparkles size={14} />
                <span>Dubai Interior Design Studio</span>
              </div>

              <div className='space-y-6'>
                <h1 className='max-w-5xl text-5xl leading-[0.96] text-white sm:text-6xl lg:text-[5.35rem]'>
                  <span className='block'>Luxury Dubai interiors</span>
                  <span className='block'>with delivery clarity</span>
                  <span className='block'>and executive confidence.</span>
                </h1>
                <p className='max-w-3xl text-base leading-8 text-[#e6d3bc] sm:text-lg'>
                  Wanderlust Architects designs villas, hospitality environments, branded workplaces, and premium interiors for clients who expect a
                  stronger finish than off-the-shelf fit-out design. The focus is simple: a space that looks globally refined, feels Dubai-relevant,
                  and moves cleanly from concept to execution.
                </p>
              </div>

              <div className='flex flex-wrap gap-3'>
                <Button href='/contact' className='border-[#e6c28b] bg-[#e6c28b] text-[#120b05] hover:bg-white hover:text-[#120b05]'>
                  Book Dubai Consultation
                </Button>
                <Button href={dubaiContact.whatsapp} variant='ghost' className='border-white/55 text-white hover:bg-white hover:text-[#120b05]'>
                  WhatsApp Dubai Studio
                </Button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {heroAreas.map((area) => (
                  <span
                    key={area}
                    className='rounded-full border border-white/14 bg-black/18 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#efe4d3] backdrop-blur-sm'
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12} className='lg:pl-6'>
              <div className='rounded-[30px] border border-white/12 bg-black/34 p-6 text-white shadow-[0_34px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl'>
                <div className='flex flex-col gap-4 border-b border-white/12 pb-5 sm:flex-row sm:items-start sm:justify-between'>
                  <div className='max-w-[28rem]'>
                    <p className='text-[11px] uppercase tracking-[0.24em] text-[#f0d8b3]'>Dubai-ready positioning</p>
                    <h2 className='mt-2 text-3xl leading-tight'>A premium interior partner that feels presentation-ready from day one.</h2>
                  </div>
                  <div className='shrink-0 self-start rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-right sm:min-w-[220px]'>
                    <p className='text-[11px] uppercase tracking-[0.24em] text-white/55'>Call</p>
                    <p className='mt-2 whitespace-nowrap text-[clamp(1.5rem,2vw,2rem)] tracking-[-0.03em]'>{dubaiPhoneDisplay}</p>
                  </div>
                </div>

                <div className='mt-6 grid gap-4 sm:grid-cols-2'>
                  {[
                    { icon: Building2, title: 'Villa + hospitality experience', copy: 'Spaces shaped for luxury living, guest arrival, and premium operational flow.' },
                    { icon: Layers3, title: 'Design + documentation continuity', copy: 'Concept quality is matched with detail packages that reduce contractor guesswork.' },
                    { icon: Clock3, title: 'Fast client decision support', copy: 'Clear presentations, milestone summaries, and next-step clarity for busy stakeholders.' },
                    { icon: Users, title: 'Single-point design ownership', copy: 'One studio voice across interiors, fit-out readiness, and delivery coordination.' },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className='rounded-[24px] border border-white/10 bg-white/6 p-5'>
                        <div className='mb-4 inline-flex rounded-2xl border border-white/12 bg-white/10 p-3 text-[#f0d8b3]'>
                          <Icon size={18} />
                        </div>
                        <h3 className='text-lg'>{item.title}</h3>
                        <p className='mt-2 text-sm leading-7 text-white/72'>{item.copy}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className='relative z-20 -mt-8 pb-6 sm:-mt-12'>
        <Container>
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
            {trustMetrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 0.05} className='h-full'>
                <article className='flex h-full min-h-[170px] flex-col justify-between rounded-[26px] border border-[#dcc6a3]/55 bg-white/90 p-5 shadow-[0_18px_48px_rgba(58,32,11,0.08)] backdrop-blur-md'>
                  <p className={`text-3xl leading-none text-[#1a140d] sm:text-4xl ${metric.valueClassName ?? ''}`}>{metric.value}</p>
                  <p className='mt-3 text-[11px] uppercase tracking-[0.24em] text-[#8c7758]'>{metric.label}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className='space-y-24 pb-24 pt-10'>
        <Container className='space-y-24'>
          <section className='space-y-10'>
            <SectionTitle
              eyebrow='Why Dubai Clients Shortlist Us'
              title='A design offer built for premium clients who need both atmosphere and execution confidence.'
              description='The strongest interior pitch is not only visual. It proves taste, structure, and delivery readiness at the same time.'
            />
            <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
              {dubaiAdvantages.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <article className='h-full rounded-[26px] border border-[#dcc6a3]/55 bg-white/88 p-6 shadow-[0_18px_52px_rgba(49,28,10,0.06)]'>
                      <div className='inline-flex rounded-2xl border border-[#ddc49f] bg-[#fbf3e8] p-3 text-[#8b6b3d]'>
                        <Icon size={18} />
                      </div>
                      <h3 className='mt-5 text-2xl leading-tight text-[#17110b]'>{item.title}</h3>
                      <p className='mt-4 text-sm leading-7 text-[#5f5343]'>{item.copy}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section className='grid gap-8 rounded-[34px] border border-[#d9c19a]/55 bg-[linear-gradient(160deg,rgba(255,255,255,0.88)_0%,rgba(250,243,233,0.92)_100%)] p-8 shadow-[0_22px_70px_rgba(44,26,9,0.08)] lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:p-12'>
            <div className='space-y-6'>
              <SectionTitle
                eyebrow='Services for Dubai'
                title='Interior design packages created to close decisions faster.'
                description='Every service is framed as a business-ready or homeowner-ready deliverable, not a vague design promise.'
              />
              <div className='grid gap-3'>
                {[
                  'Luxury residential interiors',
                  'Hospitality concept and detailing',
                  'Corporate office and leadership suites',
                  'Fit-out coordination and delivery support',
                ].map((point) => (
                  <div key={point} className='flex items-center gap-3 rounded-2xl border border-[#e3d0b1] bg-white/75 px-4 py-3 text-sm text-[#4d4337]'>
                    <span className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1b130b] text-white'>+</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='grid gap-5 md:grid-cols-2 lg:h-full lg:auto-rows-fr'>
              {dubaiServices.map((service, index) => {
                const image = siteImages.serviceHero[service.title as keyof typeof siteImages.serviceHero];

                return (
                  <Reveal key={service.title} delay={index * 0.05} className='h-full'>
                    <article className='flex h-full flex-col overflow-hidden rounded-[26px] border border-[#dcc6a3]/55 bg-white shadow-[0_18px_54px_rgba(49,28,10,0.07)]'>
                      <div className='relative h-44 overflow-hidden lg:h-36 xl:h-40'>
                        <img src={image} alt={service.title} className='h-full w-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0' />
                      </div>
                      <div className='flex flex-1 flex-col gap-3 p-4 lg:p-4'>
                        <h3 className='text-2xl leading-tight text-[#17110b]'>{service.title}</h3>
                        <p className='text-sm leading-6 text-[#5f5343]'>{service.copy}</p>
                        <div className='mt-auto space-y-1.5'>
                          {(serviceDeliverables[service.title] ?? []).map((item) => (
                            <div key={item} className='flex items-center gap-3 text-sm text-[#5b4c38]'>
                              <span className='h-1.5 w-1.5 rounded-full bg-[#8b6b3d]' />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section className='grid gap-8 lg:grid-cols-[1.05fr_0.95fr]'>
            <Reveal>
              <div className='relative overflow-hidden rounded-[34px] border border-[#d5bc95]/45 bg-[#120b06] p-8 text-white shadow-[0_26px_72px_rgba(12,7,3,0.32)] lg:p-10'>
                <div className='absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_18%_14%,rgba(230,194,139,0.28),transparent_22%),linear-gradient(140deg,rgba(255,255,255,0.08),transparent_48%)]' />
                <div className='relative z-[1]'>
                  <SectionTitle
                    eyebrow='Design Language'
                    title='A Dubai vocabulary of calm luxury, layered materials, and strong arrival moments.'
                    description='The page direction, palette, and design thinking are all tuned for clients who want spaces to feel premium without becoming loud.'
                    className='[&_h2]:text-white [&_p]:text-white/72 [&_.text-iron]:text-[#f0d8b3]'
                  />
                  <div className='mt-8 flex flex-wrap gap-3'>
                    {dubaiSectors.map((sector) => (
                      <span
                        key={sector}
                        className='rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/88'
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                  <div className='mt-8 grid gap-4 sm:grid-cols-2'>
                    {[
                      'Arabic geometry interpreted in a contemporary way',
                      'Warm stone, brass, and shadow-led lighting',
                      'Luxury villa and hospitality arrival sequencing',
                      'Detailing that supports fit-out clarity and maintenance logic',
                    ].map((item) => (
                      <div key={item} className='rounded-2xl border border-white/10 bg-white/6 p-4 text-sm leading-7 text-white/78'>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className='overflow-hidden rounded-[34px] border border-[#dcc6a3]/55 bg-white shadow-[0_22px_60px_rgba(49,28,10,0.08)]'>
                <div className='relative h-[420px] overflow-hidden'>
                  <img src={siteImages.hero} alt='Luxury design visual by Wanderlust Architects' className='h-full w-full object-cover grayscale' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent' />
                  <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                    <p className='text-[11px] uppercase tracking-[0.26em] text-white/75'>Interior positioning for Dubai</p>
                    <h3 className='mt-2 text-3xl leading-tight'>Spaces that feel decisive in presentations and effortless in everyday use.</h3>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section className='space-y-10'>
            <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
              <SectionTitle
                eyebrow='Signature Work'
                title='A portfolio language that helps Dubai clients trust our taste before the first call.'
                description='Selected projects across hospitality, residential, and corporate interiors that show how we compose mood, material, and functionality.'
              />
              <Button href='/projects' variant='ghost' className='self-start border-[#1a140d] text-[#1a140d] hover:bg-[#1a140d] hover:text-white'>
                Explore All Projects
              </Button>
            </div>
            <div className='grid gap-6 lg:grid-cols-2'>
              {signatureProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.06} className='h-full'>
                  <DubaiPortfolioCard project={project} />
                </Reveal>
              ))}
            </div>
          </section>

          <section className='space-y-10'>
            <SectionTitle
              eyebrow='Project Library'
              title='A broader portfolio view for Dubai clients who want to assess range before shortlisting.'
              description='Browse our wider body of work across villas, resorts, restaurants, offices, retail, and heritage-led environments.'
            />
            <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
              {projects.map((project, index) => (
                <Reveal key={project.slug} delay={(index % 4) * 0.04} className='h-full'>
                  <DubaiPortfolioCard project={project} compact />
                </Reveal>
              ))}
            </div>
          </section>

          <section className='space-y-10'>
            <SectionTitle
              eyebrow='Process for Dubai Projects'
              title='A client journey built to reduce friction, protect clarity, and keep premium intent intact.'
              description='Each stage is designed to move the project closer to decision, fit-out readiness, and handover confidence.'
            />
            <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
              {dubaiJourney.map((item, index) => (
                <Reveal key={item.step} delay={index * 0.05}>
                  <article className='h-full rounded-[28px] border border-[#dcc6a3]/55 bg-white/88 p-6 shadow-[0_18px_50px_rgba(49,28,10,0.06)]'>
                    <p className='text-[11px] uppercase tracking-[0.3em] text-[#9b8464]'>{item.step}</p>
                    <h3 className='mt-4 text-2xl leading-tight text-[#17110b]'>{item.title}</h3>
                    <p className='mt-4 text-sm leading-7 text-[#5f5343]'>{item.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section className='grid gap-6 rounded-[34px] border border-[#d8c4a5]/55 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(248,241,231,0.92))] p-8 shadow-[0_22px_64px_rgba(49,28,10,0.08)] lg:grid-cols-2 lg:p-12'>
            <div className='space-y-6'>
              <SectionTitle
                eyebrow='Dubai FAQ'
                title='The questions serious clients usually ask before they shortlist a studio.'
                description='This section is built to remove uncertainty for villa owners, investors, hospitality operators, and founders.'
              />
              <div className='rounded-[24px] border border-[#e3d3bc] bg-white/80 p-5'>
                <p className='text-[11px] uppercase tracking-[0.24em] text-[#9b8464]'>Direct contact</p>
                <p className='mt-3 text-3xl text-[#17110b]'>{dubaiPhoneDisplay}</p>
                <p className='mt-3 text-sm leading-7 text-[#5f5343]'>
                  Reach out with the project type, location, timeline, and budget band. We can quickly tell you what the first phase should look like.
                </p>
              </div>
            </div>
            <div className='grid gap-4'>
              {dubaiFaqs.map((item, index) => (
                <Reveal key={item.question} delay={index * 0.04}>
                  <article className='rounded-[24px] border border-[#e3d3bc] bg-white/80 p-5'>
                    <h3 className='text-lg leading-tight text-[#17110b]'>{item.question}</h3>
                    <p className='mt-3 text-sm leading-7 text-[#5f5343]'>{item.answer}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        </Container>

        <section className='relative overflow-hidden border-y border-[#d2b388]/35 bg-[#130c06] py-16 text-[#f8f0e6] lg:py-20'>
          <div className='absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_15%_18%,rgba(222,184,126,0.24),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.14),transparent_18%)]' />
          <Container className='relative z-[1]'>
            <div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
              <div className='space-y-6'>
                <p className='text-[11px] uppercase tracking-[0.28em] text-[#f0d8b3]'>Ready to convert the brief into a premium Dubai interior direction?</p>
                <h2 className='max-w-4xl text-4xl leading-tight text-white sm:text-5xl'>
                  Let’s turn your villa, hospitality space, or executive workplace into the project clients remember.
                </h2>
                <p className='max-w-3xl text-base leading-8 text-white/72'>
                  If you already have a location, target completion window, or mood direction, we can move quickly into a design conversation built for
                  decisions rather than guesswork.
                </p>
              </div>

              <div className='rounded-[28px] border border-white/12 bg-white/6 p-6 backdrop-blur-sm'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-3 text-[#f0d8b3]'>
                    <PhoneCall size={18} />
                    <span className='text-[11px] uppercase tracking-[0.24em]'>Dubai contact</span>
                  </div>
                  <p className='text-4xl text-white'>{dubaiPhoneDisplay}</p>
                  <div className='flex items-center gap-3 text-sm text-white/74'>
                    <MapPin size={16} />
                    <span>Dubai, UAE</span>
                  </div>
                  <div className='flex flex-wrap gap-3 pt-2'>
                    <Button href={`tel:${dubaiContact.phone}`} className='border-[#e6c28b] bg-[#e6c28b] text-[#120b05] hover:bg-white hover:text-[#120b05]'>
                      Call Dubai Studio
                    </Button>
                    <Button href={dubaiContact.whatsapp} variant='ghost' className='border-white/45 text-white hover:bg-white hover:text-[#120b05]'>
                      WhatsApp Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
