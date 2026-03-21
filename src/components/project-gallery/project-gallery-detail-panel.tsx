import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { type ProjectRecord } from '@/lib/projects';

interface ProjectGalleryDetailPanelProps {
  project: ProjectRecord;
  onOpenCaseStudy: (project: ProjectRecord) => void;
}

export function ProjectGalleryDetailPanel({
  project,
  onOpenCaseStudy,
}: ProjectGalleryDetailPanelProps) {
  return (
    <motion.div
      layout
      className='pointer-events-auto w-full border border-[#d9d9d9] bg-white p-4 shadow-[0_28px_70px_-52px_rgba(0,0,0,0.32)] sm:p-5'
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className='grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] xl:items-stretch'
        >
          <div className='border border-[#d9d9d9] bg-white p-4 sm:p-4'>
            <div className='h-full min-h-[18rem] overflow-hidden border border-[#dcdcdc] bg-white xl:min-h-[25rem]'>
              <img src={project.image} alt={project.title} className='h-full w-full object-cover grayscale' />
            </div>
          </div>

          <div className='flex flex-col justify-between border border-[#d9d9d9] bg-white p-6 sm:p-8'>
            <div className='space-y-6'>
              <div>
                <p className='text-[10px] uppercase tracking-[0.3em] text-black/55'>Selected Project</p>
                <h2 className='mt-5 max-w-[14ch] text-[2rem] leading-[0.96] text-black sm:text-[2.55rem]'>{project.title}</h2>
              </div>

              <div className='space-y-3 text-black/72'>
                <p className='text-[1.05rem] leading-8'>{project.location}</p>
                <p className='text-[1.05rem] leading-8'>
                  {project.area} | Completed {project.year}
                </p>
              </div>

              <p className='max-w-[34ch] text-[1.05rem] leading-9 text-black/68'>{project.description}</p>
            </div>

            <button
              type='button'
              onClick={() => onOpenCaseStudy(project)}
              data-no-canvas-drag='true'
              className='mt-8 inline-flex items-center gap-2 self-start border border-[#d2d2d2] bg-white px-5 py-4 text-[11px] uppercase tracking-[0.22em] text-black transition hover:border-[#111111] hover:bg-white'
            >
              <span>View Full Case Study</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
