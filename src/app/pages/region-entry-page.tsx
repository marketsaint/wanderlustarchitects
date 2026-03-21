import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { BrandLogo } from '@/components/site/brand-logo';
import { RegionSwitcher } from '@/components/site/region-switcher';
import { persistSiteRegion, readPersistedRegion, type SiteRegionKey } from '@/lib/site-region';

export default function RegionEntryPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'loader' | 'selector'>('loader');
  const [selectedRegion, setSelectedRegion] = useState<SiteRegionKey>('india');
  const [isLeaving, setIsLeaving] = useState(false);

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
    <section className='relative min-h-screen overflow-hidden bg-white text-black'>
      <div
        className='pointer-events-none absolute inset-0 opacity-70'
        style={{
          backgroundImage: `
            linear-gradient(rgba(225,225,225,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225,225,225,0.7) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98),rgba(255,255,255,0.9)_44%,rgba(246,246,246,0.75)_100%)]' />

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
                <BrandLogo
                  className='justify-center gap-4'
                  iconSrc='/branding/wanderlust_architects_logo-icon-Black.png'
                  iconClassName='h-20 w-20'
                  textClassName='text-sm tracking-[0.32em] sm:text-base'
                />
              </motion.div>
              <motion.div
                className='inline-flex items-center rounded-full border border-black/12 bg-white/88 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-black/68'
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                India
              </motion.div>
              <div className='w-full max-w-[18rem] space-y-3'>
                <motion.div
                  className='h-px origin-left bg-black/70'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className='h-[2px] origin-left bg-black'
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
              className='w-full max-w-[44rem] border border-black/12 bg-white/94 px-8 py-12 shadow-[0_34px_90px_-60px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-12 sm:py-14'
              animate={isLeaving ? { scale: 0.98, opacity: 0.72 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className='flex flex-col items-center gap-8 text-center'>
                <BrandLogo
                  className='justify-center gap-4'
                  iconSrc='/branding/wanderlust_architects_logo-icon-Black.png'
                  iconClassName='h-16 w-16 sm:h-20 sm:w-20'
                  textClassName='text-[11px] tracking-[0.28em] sm:text-sm sm:tracking-[0.34em]'
                />
                <div className='space-y-3'>
                  <p className='text-[10px] uppercase tracking-[0.34em] text-black/52'>Select Studio Experience</p>
                  <h1 className='font-[Cormorant_Garamond] text-5xl leading-none sm:text-7xl'>Enter Wanderlust</h1>
                  <p className='mx-auto max-w-[32rem] text-sm leading-7 text-black/62 sm:text-base'>
                    Choose the active studio region first. You will enter the projects experience, and the Home destination will follow the selected India or UAE studio.
                  </p>
                </div>
                <RegionSwitcher activeRegion={selectedRegion} onSelect={handleSelect} size='lg' className='justify-center' />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
