import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { cn } from '@/app/components/ui/utils';

export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10', className)} {...props}>
      {children}
    </div>
  );
}

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'ghost' | 'subtle';
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const buttonVariants = {
  primary: 'border border-ink bg-ink text-smoke hover:bg-black hover:tracking-[0.26em]',
  ghost: 'border border-ink bg-transparent text-ink hover:bg-ink hover:text-smoke hover:tracking-[0.26em]',
  subtle: 'border border-mist bg-white text-ink hover:border-ink hover:bg-smoke',
};

function isExternalHref(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/i.test(href);
}

export function Button({ href, variant = 'primary', className, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-xs uppercase tracking-[0.22em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 disabled:cursor-not-allowed disabled:opacity-50',
    buttonVariants[variant],
    className,
  );

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function Card({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <article className={cn('rounded-xl border border-mist bg-white shadow-soft', className)} {...props}>
      {children}
    </article>
  );
}

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('inline-flex border border-mist px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-iron', className)} {...props}>
      {children}
    </span>
  );
}

type TabsProps<T extends string> = {
  items: readonly T[];
  active: T;
  onChange: (item: T) => void;
};

export function Tabs<T extends string>({ items, active, onChange }: TabsProps<T>) {
  return (
    <div className='flex flex-wrap gap-2'>
      {items.map((item) => {
        const isActive = item === active;

        return (
          <button
            key={item}
            type='button'
            onClick={() => onChange(item)}
            className={cn(
              'rounded-md border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors duration-300',
              isActive ? 'border-ink bg-ink text-smoke' : 'border-mist bg-white text-iron hover:border-ink hover:text-ink',
            )}
            aria-pressed={isActive}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-md border border-silver bg-white px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-iron focus:border-ink focus:ring-1 focus:ring-ink/50',
        props.className,
      )}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full rounded-md border border-silver bg-white px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-iron focus:border-ink focus:ring-1 focus:ring-ink/50',
        props.className,
      )}
    />
  );
}

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionTitle({ eyebrow, title, description = '', align = 'left', className = '' }: SectionTitleProps) {
  return (
    <div className={cn('space-y-5', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className='h-px w-10 bg-gradient-to-r from-silver/10 via-silver to-silver/10' />
          <p className='text-[11px] uppercase tracking-[0.24em] text-iron'>{eyebrow}</p>
        </div>
      ) : null}
      <h2 className='text-3xl font-medium leading-[1.08] text-ink [text-wrap:balance] sm:text-5xl lg:text-6xl'>{title}</h2>
      {description ? <p className='max-w-2xl text-sm text-iron sm:text-base'>{description}</p> : null}
    </div>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  depth?: boolean;
};

export function Reveal({ children, className = '', delay = 0, y = 26, depth = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={depth ? { transformPerspective: 1400, transformStyle: 'preserve-3d' } : undefined}
      initial={depth ? { opacity: 0, y, rotateX: 13, scale: 0.985, filter: 'blur(2px)' } : { opacity: 0, y }}
      whileInView={depth ? { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: depth ? 0.82 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
