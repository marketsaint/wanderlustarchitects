import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';
import { type ProjectRecord } from '@/lib/projects';

interface ProjectGalleryCardProps {
  project: ProjectRecord;
  isActive: boolean;
  onSelect: () => void;
}

export function ProjectGalleryCard({ project, isActive, onSelect }: ProjectGalleryCardProps) {
  return (
    <motion.button
      type='button'
      aria-label={`Select ${project.title}`}
      aria-pressed={isActive}
      onClick={onSelect}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative aspect-square w-full overflow-hidden border border-[#dddddd] bg-white p-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        isActive ? 'border-[#111111] shadow-[0_20px_44px_-36px_rgba(0,0,0,0.28)]' : 'hover:border-[#b8b8b8]',
      )}
    >
      <div className='relative h-full overflow-hidden border border-[#dcdcdc] bg-white'>
        <img
          src={project.image}
          alt={project.title}
          className={cn(
            'h-full w-full object-cover grayscale transition duration-700 ease-out',
            isActive ? 'scale-[1.04]' : 'group-hover:scale-[1.05]',
          )}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent' />
        <div className='absolute inset-x-0 bottom-0 p-3.5'>
          <p className='text-[9px] uppercase tracking-[0.24em] text-white/68'>{project.category}</p>
          <h3 className='mt-2 line-clamp-2 text-sm leading-[1.05] text-white sm:text-base'>{project.title}</h3>
        </div>
      </div>
    </motion.button>
  );
}
