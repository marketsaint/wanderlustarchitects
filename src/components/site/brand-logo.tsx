import { cn } from '@/app/components/ui/utils';

interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
  iconImageClassName?: string;
  iconSrc?: string;
  textClassName?: string;
  text?: string;
}

export function BrandLogo({
  className,
  iconClassName,
  iconImageClassName,
  iconSrc = '/branding/wanderlust_architects_logo-icon-Black.png',
  textClassName,
  text = 'WANDERLUST ARCHITECTS',
}: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <img src={iconSrc} alt='' aria-hidden='true' className={cn('h-12 w-auto object-contain', iconClassName, iconImageClassName)} />
      <span className={cn('font-[Montserrat] text-xs font-semibold uppercase tracking-[0.2em] text-black', textClassName)}>{text}</span>
    </span>
  );
}
