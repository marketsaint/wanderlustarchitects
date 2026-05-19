import { cn } from '@/app/components/ui/utils';
import { type SiteRegionKey } from '@/lib/site-region';

interface RegionSwitcherProps {
  activeRegion: SiteRegionKey;
  onSelect: (region: SiteRegionKey) => void;
  inverted?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: {
    container: 'gap-1 p-1',
    button: 'px-3 py-1.5 text-[10px] tracking-[0.18em]',
  },
  md: {
    container: 'gap-1 p-1',
    button: 'px-3.5 py-1.5 text-[10px] tracking-[0.18em]',
  },
  lg: {
    container: 'gap-1.5 p-1.5',
    button: 'px-5 py-2.5 text-xs tracking-[0.24em]',
  },
} as const;

export function RegionSwitcher({
  activeRegion,
  onSelect,
  inverted = false,
  className,
  size = 'md',
}: RegionSwitcherProps) {
  const scale = sizeClasses[size];

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full',
        scale.container,
        inverted ? 'border border-white/24 bg-white/10' : 'border border-black/12 bg-white/88',
        className,
      )}
      aria-label='Region switcher'
      role='group'
    >
      {[
        { key: 'india', label: 'India' },
        { key: 'dubai', label: 'UAE' },
      ].map((option) => {
        const isActive = option.key === activeRegion;

        return (
          <button
            key={option.key}
            type='button'
            onClick={() => onSelect(option.key as SiteRegionKey)}
            aria-pressed={isActive}
            className={cn(
              'rounded-full font-medium uppercase transition-colors duration-300',
              scale.button,
              inverted
                ? isActive
                  ? 'bg-white text-black'
                  : 'text-white/78 hover:bg-white/12 hover:text-white'
                : isActive
                  ? 'bg-black text-white'
                  : 'text-black/72 hover:bg-black hover:text-white',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
