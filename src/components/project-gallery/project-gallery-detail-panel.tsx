import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ProjectRecord } from '../../lib/projects';

interface ProjectGalleryDetailPanelProps {
  project: ProjectRecord;
  onOpenCaseStudy: (project: ProjectRecord) => void;
}

export function ProjectGalleryDetailPanel({
  project,
  onOpenCaseStudy,
}: ProjectGalleryDetailPanelProps) {
  const hasLongTitle = project.title.length > 24;
  const hasVeryLongTitle = project.title.length > 34;

  return (
    <motion.div
      layout
      className="flex h-full min-h-0 flex-col overflow-hidden border border-[#ddd6ca] bg-[#fbf8f2] p-5 sm:p-6 lg:p-6 xl:p-7"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          className="flex h-full min-h-0 flex-col"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.34em] text-[#8f8576]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Selected Project
          </p>

          <h2
            className="mt-4 overflow-hidden whitespace-nowrap pr-2 text-ellipsis text-[#2d2923] leading-[1] tracking-[-0.035em]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: hasVeryLongTitle
                ? 'clamp(1.35rem, 1.55vw, 1.95rem)'
                : hasLongTitle
                  ? 'clamp(1.55rem, 1.8vw, 2.25rem)'
                  : 'clamp(1.85rem, 2.2vw, 2.8rem)',
            }}
          >
            {project.title}
          </h2>

          <p
            className="mt-4 text-[0.98rem] text-[#655c50]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.location}
          </p>

          <p
            className="mt-2 text-[0.98rem] text-[#7b7165]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.area} | Completed {project.year}
          </p>

          <p
            className="mt-5 max-w-[36rem] text-[0.96rem] leading-[1.72] text-[#544c42]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.description}
          </p>

          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="mt-auto inline-flex shrink-0 self-start whitespace-nowrap border border-[#d0c7ba] bg-white px-4 py-2.5 text-[0.92rem] text-[#4f473d] transition-all hover:border-[#bfb4a2] hover:bg-[#f7f2ea]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span>View Full Case Study</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
