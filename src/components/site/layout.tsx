import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Instagram, Linkedin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { Container } from './ui';
import { getContactByRegion, getRegionFromPathname, siteOffices, siteSocialLinks } from '@/lib/site-content';

const HEADER_LINKS = [
  { href: '/india', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blogs' },
  { href: '/career', label: 'Career' },
  { href: '/contact', label: 'Contact' },
] as const;

const HOME_PATHS = new Set(['/india', '/dubai']);
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function isHomePath(pathname: string) {
  return HOME_PATHS.has(pathname);
}

function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);
}

function BrandLogo({
  className,
  iconClassName,
  textClassName,
  iconSrc = '/branding/wanderlust_architects_logo-icon-Black.png',
}: {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  iconSrc?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <img src={iconSrc} alt='' aria-hidden='true' className={cn('h-12 w-auto object-contain', iconClassName)} />
      <span className={cn('font-[Montserrat] text-xs font-semibold uppercase tracking-[0.2em] text-black', textClassName)}>
        WANDERLUST ARCHITECTS
      </span>
    </span>
  );
}

function RegionSwitcher({ inverted = false }: { inverted?: boolean }) {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const activeRegion = pathname.startsWith('/dubai') ? 'dubai' : 'india';

  const handleSelect = (regionKey: 'india' | 'dubai') => {
    document.cookie = `site_region=${regionKey}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
    navigate(regionKey === 'dubai' ? '/dubai' : '/india');
  };

  return (
    <div
      className={cn('inline-flex items-center gap-1 rounded-full p-1', inverted ? 'border border-white/30 bg-white/10' : 'border border-mist bg-white')}
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
            onClick={() => handleSelect(option.key as 'india' | 'dubai')}
            aria-pressed={isActive}
            className={cn(
              'rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors',
              inverted
                ? isActive
                  ? 'bg-white text-black'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
                : isActive
                  ? 'bg-ink text-smoke'
                  : 'text-iron hover:bg-[#efefef]',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Header() {
  const pathname = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const isHomeOverlay = isHomePath(pathname);
  const useLightTheme = isHomeOverlay && isOverHero;
  const useWatchScrolledLayout = isHomeOverlay && !isOverHero;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateHeaderState = () => {
      const hero = document.querySelector<HTMLElement>('[data-site-hero="true"]');
      const headerHeight = headerRef.current?.offsetHeight ?? 96;

      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsOverHero(rect.top <= headerHeight && rect.bottom > headerHeight + 20);
      } else {
        setIsOverHero(false);
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);

    return () => {
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
    };
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === '/india') {
      return isHomePath(pathname);
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const desktopLinkClass = (href: string) =>
    cn(
      'rounded-full px-2.5 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors',
      useLightTheme
        ? isActiveLink(href)
          ? 'bg-black !text-white shadow-[0_10px_24px_rgba(0,0,0,0.34)]'
          : 'text-white/82 hover:bg-black hover:!text-white'
        : isActiveLink(href)
          ? 'bg-white !text-black shadow-[0_10px_24px_rgba(0,0,0,0.08)]'
          : 'text-black/70 hover:bg-black hover:!text-white',
    );

  const mobileLinkClass = (href: string) =>
    cn(
      'rounded-full px-3 py-2 text-xs uppercase tracking-[0.2em] transition-colors',
      useLightTheme
        ? isActiveLink(href)
          ? 'bg-black !text-white shadow-[0_10px_24px_rgba(0,0,0,0.34)]'
          : 'text-white/85 hover:bg-black hover:!text-white'
        : isActiveLink(href)
          ? 'bg-white !text-black shadow-[0_10px_24px_rgba(0,0,0,0.08)]'
          : 'text-black/75 hover:bg-black hover:!text-white',
    );

  return (
    <header ref={headerRef} className={cn('z-50 pt-3 sm:pt-4', isHomeOverlay ? 'fixed inset-x-0 top-0' : 'sticky top-0')}>
      <motion.div className={cn('h-[2px] origin-left', useLightTheme ? 'bg-white/80' : 'bg-black/70')} style={{ scaleX: scrollProgress }} />
      <Container className='relative'>
        <div
          className={cn(
            'flex min-h-[72px] items-center justify-between gap-2 rounded-[22px] px-3 py-3 backdrop-blur-xl sm:gap-3 sm:px-5',
            useLightTheme
              ? 'border border-white/24 bg-black/34 shadow-[0_16px_42px_rgba(0,0,0,0.38)]'
              : 'border border-black/15 bg-white/68 shadow-[0_14px_36px_rgba(0,0,0,0.14)]',
          )}
        >
          <Link
            to='/projects'
            className='min-w-0 max-w-[calc(100%-88px)] flex flex-1 items-center overflow-hidden pr-2 sm:pr-3 xl:max-w-none xl:flex-none xl:pr-5'
            aria-label='Wanderlust Architects projects'
          >
            <BrandLogo
              className='min-w-0 gap-1.5 sm:gap-2.5'
              iconClassName='h-7 w-7 sm:h-8 sm:w-8 xl:h-9 xl:w-9'
              textClassName={cn(
                'hidden truncate text-[8px] tracking-[0.08em] min-[420px]:inline sm:text-[10px] sm:tracking-[0.14em]',
                useLightTheme && 'text-white',
              )}
              iconSrc={useLightTheme ? '/branding/wanderlust_architects_logo-icon-White.png' : '/branding/wanderlust_architects_logo-icon-Black.png'}
            />
          </Link>

          <button
            type='button'
            className={cn(
              'shrink-0 rounded-full px-2.5 py-2 text-[10px] uppercase tracking-[0.2em] xl:hidden',
              useLightTheme ? 'border border-white/35 bg-white/12 text-white' : 'border border-black/20 bg-white/74 text-black/80',
            )}
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls='mobile-nav'
            aria-label='Toggle menu'
          >
            Menu
          </button>

          {useWatchScrolledLayout ? (
            <>
              <nav className='hidden items-center gap-1 md:flex' aria-label='Primary'>
                {HEADER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors',
                      isActiveLink(link.href)
                        ? 'bg-white !text-black shadow-[0_10px_24px_rgba(0,0,0,0.08)]'
                        : 'text-black/72 hover:bg-black hover:!text-white',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className='hidden shrink-0 items-center gap-2 lg:flex'>
                <Link to='/india' className='rounded-full border border-black/15 bg-white/72 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-black/72 transition hover:bg-black hover:text-white'>
                  India
                </Link>
                <Link to='/dubai' className='rounded-full border border-black/15 bg-white/72 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-black/72 transition hover:bg-black hover:text-white'>
                  UAE
                </Link>
              </div>
            </>
          ) : (
            <nav className='hidden items-center gap-2.5 xl:ml-3 xl:flex 2xl:gap-4' aria-label='Primary'>
              <div className='shrink-0'>
                <RegionSwitcher inverted={useLightTheme} />
              </div>
              {HEADER_LINKS.map((link) => (
                <Link key={link.href} to={link.href} className={desktopLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
              <Link
                to='/contact'
                className={cn(
                  'shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.16em] transition',
                  useLightTheme
                    ? 'border border-white/35 bg-white/12 text-white hover:bg-white hover:text-black'
                    : 'border border-black/20 bg-white/78 text-black/80 hover:bg-black hover:text-white',
                )}
              >
                Start Project
              </Link>
            </nav>
          )}
        </div>

        <nav
          id='mobile-nav'
          className={cn('mt-2 grid overflow-hidden transition-all duration-300 xl:hidden', open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0')}
          aria-label='Mobile'
        >
          <div
            className={cn(
              'rounded-[20px] p-4 backdrop-blur-xl',
              useLightTheme ? 'border border-white/24 bg-black/46 shadow-[0_16px_34px_rgba(0,0,0,0.42)]' : 'border border-black/15 bg-white/74 shadow-[0_12px_30px_rgba(0,0,0,0.12)]',
            )}
          >
            <div className='grid gap-3'>
              <RegionSwitcher inverted={useLightTheme} />
              {HEADER_LINKS.map((link) => (
                <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className={mobileLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

function formatDisplayPhone(phone: string) {
  if (phone === '+971545052126') {
    return '+971 54 505 2126';
  }

  if (phone === '+919828485111') {
    return '+91 98284 85111';
  }

  return phone;
}

function FooterPanel({ contact }: { contact: { phone: string; email: string; whatsapp: string } }) {
  return (
    <Container className='grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr]'>
      <div className='space-y-6'>
        <BrandLogo className='gap-3' iconClassName='h-10 w-10' textClassName='text-xs tracking-[0.22em]' />
        <h3 className='max-w-xl text-4xl leading-tight'>
          Premium spatial design for residences, offices, hospitality, and high-precision project execution.
        </h3>
        <div className='flex flex-wrap gap-3'>
          <Link to='/contact' className='inline-flex rounded-md border border-ink px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-smoke'>
            Book Consultation
          </Link>
          <a href={contact.whatsapp} className='inline-flex rounded-md border border-ink px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-smoke'>
            WhatsApp
          </a>
        </div>
        <div className='flex flex-wrap gap-3'>
          {siteSocialLinks.map((social) => {
            const Icon = social.label === 'Instagram' ? Instagram : Linkedin;

            return (
              <a
                key={social.label}
                href={social.href}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-md border border-ink/15 bg-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-smoke'
              >
                <Icon size={14} />
                <span>{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>
      <div className='space-y-3'>
        <p className='text-xs uppercase tracking-[0.2em] text-iron'>Studios</p>
        {siteOffices.map((office) => (
          <div key={office.city} className='space-y-1'>
            <p className='text-sm'>{office.city}</p>
            {office.phone ? (
              <a href={`tel:${office.phone}`} className='inline-flex items-center gap-2 text-sm text-iron transition hover:text-ink'>
                <Phone size={14} />
                <span>{office.phone}</span>
              </a>
            ) : null}
          </div>
        ))}
      </div>
      <div className='space-y-3'>
        <p className='text-xs uppercase tracking-[0.2em] text-iron'>Connect</p>
        <Link to='/projects' className='block text-sm hover:text-iron'>
          Portfolio
        </Link>
        <Link to='/blog' className='block text-sm hover:text-iron'>
          Blogs
        </Link>
        <a href={`mailto:${contact.email}`} className='block text-sm hover:text-iron'>
          {contact.email}
        </a>
        <a href={`tel:${contact.phone}`} className='block text-sm hover:text-iron'>
          {formatDisplayPhone(contact.phone)}
        </a>
      </div>
    </Container>
  );
}

function Footer() {
  const pathname = useLocation().pathname;
  const region = useMemo(() => getRegionFromPathname(pathname), [pathname]);
  const contact = useMemo(() => getContactByRegion(region), [region]);

  return (
    <footer className='mt-28 border-t border-mist bg-[#f0f0f0]'>
      <FooterPanel contact={contact} />
      <Container className='border-t border-mist py-6 text-xs uppercase tracking-[0.2em] text-iron'>
        <p>Copyright {new Date().getFullYear()} Wanderlust Architects. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export function SiteLayout({ children }: { children?: ReactNode }) {
  useScrollToTop();

  return (
    <>
      <Header />
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2'
      >
        Skip to content
      </a>
      <main id='main-content'>{children ?? <Outlet />}</main>
      <Footer />
    </>
  );
}
