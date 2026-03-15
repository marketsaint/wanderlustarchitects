import { motion } from 'motion/react';
import { ProjectRecord } from '../../lib/projects';

interface ProjectGalleryCardProps {
  project: ProjectRecord;
  isActive: boolean;
  variant?: 'compact' | 'featured';
  onSelect: () => void;
}

export function ProjectGalleryCard({
  project,
  isActive,
  variant = 'compact',
  onSelect,
}: ProjectGalleryCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <motion.button
      layout
      type="button"
      aria-label={`Open details for ${project.title}`}
      aria-pressed={isActive}
      onClick={onSelect}
      className={`group relative h-full w-full overflow-hidden border bg-[#fbf8f2] text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bfb4a2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3ec] ${
        isActive
          ? 'border-[#bfb4a2] bg-[#fcfaf6]'
          : 'border-[#ddd6ca] hover:border-[#c8bdad]'
      }`}
      whileHover={{ y: isFeatured ? 0 : -1.5 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-full overflow-hidden p-3">
        <div className="relative h-full overflow-hidden border border-[#ddd6ca] bg-[#efebe2]">
          <img
            src={project.image}
            alt={project.title}
            className={`h-full w-full object-cover transition duration-500 ease-out ${
              isActive
                ? 'scale-[1.015] grayscale-0'
                : 'grayscale group-hover:scale-[1.018] group-hover:grayscale-0 group-hover:brightness-[1.03]'
            }`}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isFeatured
                ? 'bg-gradient-to-t from-black/8 via-transparent to-transparent opacity-100'
                : 'bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100'
            }`}
          />
        </div>
      </div>

      {isActive && (
        <motion.div
          layoutId="active-project-border"
          className="pointer-events-none absolute inset-0 border border-[#bfb4a2]"
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </motion.button>
  );
}
