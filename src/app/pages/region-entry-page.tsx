import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { AmbientImageSlider } from '@/components/site/ambient-image-slider';
import { siteImages } from '@/lib/site-content';
import { persistSiteRegion, readPersistedRegion, type SiteRegionKey } from '@/lib/site-region';

export default function RegionEntryPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'loader' | 'selector'>('loader');
  const [selectedRegion, setSelectedRegion] = useState<SiteRegionKey>('india');
  const [isLeaving, setIsLeaving] = useState(false);
  const backgroundImages = [
    siteImages.hero,
    siteImages.dubaiHero,
    ...siteImages.featuredProjects,
    ...siteImages.projectGalleryFallbacks,
  ];

  useEffect(() => {
    const persistedRegion = readPersistedRegion();
    if (persistedRegion) {
      setSelectedRegion(persistedRegion);
    }

    const timeout = window.setTimeout(() => {
      setStage('selector');
    }, 1400);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  const handleSelect = (region: SiteRegionKey) => {
    setSelectedRegion(region);
    persistSiteRegion(region);
    setIsLeaving(true);

    window.setTimeout(() => {
      navigate('/projects');
    }, 360);
  };

  return (
    <section
      className='relative min-h-screen overflow-hidden bg-black text-white'
      style={{
        backgroundImage: `url(${backgroundImages[0]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AmbientImageSlider
        images={backgroundImages}
        imageClassName='scale-[1.04] grayscale contrast-[1.01] brightness-[0.62]'
      />
      <div
        className='pointer-events-none absolute inset-0 opacity-40'
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.52)_100%)]' />

      <AnimatePresence mode='wait'>
        {stage === 'loader' ? (
          <motion.div
            key='loader'
            className='relative flex min-h-screen items-center justify-center px-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className='flex max-w-[32rem] flex-col items-center gap-8 text-center'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className='font-[Montserrat] text-[0.95rem] font-semibold uppercase tracking-[0.34em] text-white sm:text-[1.05rem]'>
                  Wanderlust Architects
                </p>
              </motion.div>
              <motion.div
                className='inline-flex items-center border border-white/16 bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-white/68'
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                Select Region
              </motion.div>
              <div className='w-full max-w-[18rem] space-y-3'>
                <motion.div
                  className='h-px origin-left bg-white/70'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className='h-[2px] origin-left bg-white'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.15, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key='selector'
            className='relative flex min-h-screen items-center justify-center px-6 py-12'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className='grid aspect-[16/9] w-full max-w-[68rem] grid-rows-[1fr_auto_1fr] border border-white/20 bg-black/10 px-8 py-10 shadow-[0_36px_80px_-56px_rgba(0,0,0,0.65)] backdrop-blur-[8px] sm:px-12 sm:py-14'
              animate={isLeaving ? { scale: 0.98, opacity: 0.72 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className='contents text-center'>
                <div className='flex items-start justify-center pt-2 sm:pt-4'>
                  <div className='space-y-3 sm:space-y-4'>
                    <p className='font-[Montserrat] text-[0.95rem] font-semibold uppercase tracking-[0.34em] text-white sm:text-[1.15rem]'>
                      Wanderlust Architects
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-center justify-center gap-6 sm:gap-8'>
                  <div className='inline-flex items-center border border-white/20 bg-white/6 p-1.5 sm:p-2'>
                    {[
                      { key: 'india', label: 'IND' },
                      { key: 'dubai', label: 'UAE' },
                    ].map((option) => {
                      const isActive = option.key === selectedRegion;

                      return (
                        <button
                          key={option.key}
                          type='button'
                          onClick={() => handleSelect(option.key as SiteRegionKey)}
                          className={cn(
                            'min-w-[7rem] px-6 py-3 text-sm uppercase tracking-[0.28em] transition-colors sm:min-w-[8.5rem] sm:px-8 sm:text-base',
                            isActive ? 'bg-white text-black' : 'text-white/72 hover:bg-white/10 hover:text-white',
                          )}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className='flex items-end justify-center pb-1 sm:pb-2'>
                  <div className='h-px w-44 bg-white/18' />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
