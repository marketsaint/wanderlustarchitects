import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { getProjectById, getProjectBySlug, projects } from '../../lib/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug ?? '') ?? getProjectById(Number(slug)) ?? projects[0];
  const introSection = project.sections[0];
  const supportingSections = project.sections.slice(1);
  const nextProject = projects[project.id % projects.length];
  const projectsRootPath = '/projects';
  const nextProjectPath = `${projectsRootPath}/${nextProject.slug}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/8 bg-black/35 px-6 py-5 backdrop-blur-md md:px-12"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(projectsRootPath)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10"
            >
              <ArrowLeft size={18} className="text-white/80" />
            </button>
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.35em] text-white/45"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.category}
              </p>
              <h1
                className="text-sm text-white md:text-base"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {project.title}
              </h1>
              <p
                className="mt-1 text-xs text-white/45"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.area} | Completed {project.year}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(nextProjectPath)}
            className="hidden items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition-all hover:bg-white/10 hover:text-white md:flex"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span>Next Project</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.header>

      <section className="relative min-h-[88vh] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#0a0a0a]" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-end px-6 pb-16 pt-28 md:px-12 md:pb-20">
          <div className="max-w-3xl">
            <p
              className="mb-4 text-xs uppercase tracking-[0.38em] text-white/60"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Project {String(project.id).padStart(2, '0')} / {projects.length}
            </p>
            <h2
              className="mb-6 text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 9vw, 110px)' }}
            >
              {project.title}
            </h2>
            <p
              className="max-w-2xl text-base leading-8 text-white/78 md:text-lg"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-black/45 px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            { label: 'Category', value: project.category },
            { label: 'Location', value: project.location },
            { label: 'Area', value: project.area },
            { label: 'Completion', value: project.year },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/40"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {item.label}
              </p>
              <p
                className="text-lg text-white"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <motion.div
            className="overflow-hidden rounded-[32px] border border-white/10 bg-black/40"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-full max-h-[720px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p
              className="mb-4 text-xs uppercase tracking-[0.32em] text-[#C8BBAA]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {introSection.title}
            </p>
            <h3
              className="mb-6 text-white leading-tight"
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              A grounded architectural narrative with a carefully shaped user experience.
            </h3>
            <div className="space-y-5">
              {introSection.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-white/72 md:text-lg"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p
              className="text-xs uppercase tracking-[0.32em] text-white/40"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Case Study Notes
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {supportingSections.map((section, index) => (
              <motion.article
                key={section.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <p
                  className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#C8BBAA]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {section.title}
                </p>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-white/68 md:text-base"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12 md:pb-24">
        <motion.div
          className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 md:flex-row md:items-center md:justify-between md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p
              className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Continue Exploring
            </p>
            <h3
              className="text-3xl text-white md:text-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Explore more Wanderlust Architects case studies.
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(projectsRootPath)}
              className="border border-white/10 bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.22em] text-white transition-all hover:bg-white/10"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              View All Projects
            </button>
            <button
              onClick={() => navigate(nextProjectPath)}
              className="bg-white px-6 py-3 text-xs uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Next Project
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
