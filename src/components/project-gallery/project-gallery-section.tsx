import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ProjectGalleryCard } from './project-gallery-card';
import { ProjectGalleryDetailPanel } from './project-gallery-detail-panel';
import { ProjectRecord, projects } from '../../lib/projects';

const DESKTOP_COLUMNS = 5;

type DesktopGalleryRow =
  | { kind: 'cards'; projects: ProjectRecord[] }
  | { kind: 'expanded'; project: ProjectRecord };

function chunkProjects(items: ProjectRecord[], size: number) {
  const rows: ProjectRecord[][] = [];

  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }

  return rows;
}

export function ProjectGallerySection() {
  const navigate = useNavigate();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProjectId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const desktopRows = useMemo<DesktopGalleryRow[]>(() => {
    if (!selectedProject) {
      return chunkProjects(projects, DESKTOP_COLUMNS).map((rowProjects) => ({
        kind: 'cards' as const,
        projects: rowProjects,
      }));
    }

    const selectedIndex = projects.findIndex((project) => project.id === selectedProject.id);
    const selectedRowStart =
      Math.floor(selectedIndex / DESKTOP_COLUMNS) * DESKTOP_COLUMNS;
    const beforeRows = chunkProjects(
      projects.slice(0, selectedRowStart),
      DESKTOP_COLUMNS
    ).map((rowProjects) => ({ kind: 'cards' as const, projects: rowProjects }));
    const afterRows = chunkProjects(
      [
        ...projects.slice(selectedRowStart, selectedIndex),
        ...projects.slice(selectedIndex + 1),
      ],
      DESKTOP_COLUMNS
    ).map((rowProjects) => ({ kind: 'cards' as const, projects: rowProjects }));

    return [
      ...beforeRows,
      { kind: 'expanded', project: selectedProject },
      ...afterRows,
    ];
  }, [selectedProject]);

  const handleProjectSelect = (projectId: number) => {
    setSelectedProjectId((currentProjectId) =>
      currentProjectId === projectId ? null : projectId
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f3ec] py-12 sm:py-14 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(rgba(210, 204, 194, 0.38) 1px, transparent 1px),
            linear-gradient(90deg, rgba(210, 204, 194, 0.38) 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at top, rgba(255,255,255,0.92), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.56) 0%, rgba(247,243,236,0.96) 34%, rgba(247,243,236,1) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-[1640px] px-5 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-7 flex items-center justify-between gap-4 lg:mb-8">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.34em] text-[#8c826f]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Curated Project Gallery
            </p>
          </div>
          <p
            className="text-[10px] uppercase tracking-[0.28em] text-[#9d9384]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {selectedProject
              ? `${selectedProject.title}`
              : `${String(projects.length).padStart(2, '0')} Projects`}
          </p>
        </div>

        <LayoutGroup id="wanderlust-project-gallery">
          <div className="grid gap-5 lg:hidden">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {projects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  className="aspect-[5/4]"
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectGalleryCard
                    project={project}
                    isActive={project.id === selectedProject?.id}
                    onSelect={() => handleProjectSelect(project.id)}
                  />
                </motion.div>
              ))}
            </div>

            <AnimatePresence initial={false}>
              {selectedProject && (
                <motion.div
                  layout
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectGalleryDetailPanel
                    project={selectedProject}
                    onOpenCaseStudy={(project) => navigate(`/projects/${project.slug}`)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="hidden gap-5 lg:flex lg:flex-col"
            style={
              {
                '--gallery-row-size': 'clamp(150px, 16vh, 196px)',
              } as CSSProperties
            }
          >
            {desktopRows.map((row, rowIndex) => {
              if (row.kind === 'cards') {
                return (
                  <motion.div
                    layout
                    key={`cards-row-${rowIndex}-${row.projects.map((project) => project.id).join('-')}`}
                    className="grid grid-cols-10 gap-5"
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {row.projects.map((project) => (
                      <motion.div
                        layout
                        key={`project-${project.id}`}
                        className="col-span-2 min-h-0"
                        style={{ height: 'var(--gallery-row-size)' }}
                        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ProjectGalleryCard
                          project={project}
                          isActive={false}
                          onSelect={() => handleProjectSelect(project.id)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                );
              }

              return (
                <motion.div
                  layout
                  key={`expanded-row-${row.project.id}`}
                  className="grid grid-cols-10 gap-5"
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    layout
                    className="col-span-5 min-h-0"
                    style={{ height: 'calc(var(--gallery-row-size) * 2 + 2.5rem)' }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectGalleryCard
                      project={row.project}
                      isActive
                      variant="featured"
                      onSelect={() => handleProjectSelect(row.project.id)}
                    />
                  </motion.div>

                  <motion.div
                    layout
                    className="col-span-5 min-h-0"
                    style={{ height: 'calc(var(--gallery-row-size) * 2 + 2.5rem)' }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectGalleryDetailPanel
                      project={row.project}
                      onOpenCaseStudy={(project) => navigate(`/projects/${project.slug}`)}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
