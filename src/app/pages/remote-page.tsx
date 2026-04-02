import { useMemo, useState } from 'react';
import { ArrowUpRight, Bot, Copy, FolderKanban, Github, Layers3, Rocket, Sparkles } from 'lucide-react';
import { Badge, Button, Card, Container, Reveal, SectionTitle } from '@/components/site/ui';

const GITHUB_REPO_URL = 'https://github.com/marketsaint/wanderlustarchitects';
const GITHUB_PROJECTS_URL = `${GITHUB_REPO_URL}/tree/main/src/app/pages`;
const LIVE_SITE_URL = 'https://wanderlustarchitects.vercel.app';
const CHAT_URL = 'https://chatgpt.com';

const quickActions = [
  {
    title: 'Open Live Project',
    description: 'Launch the current Vercel production site from any device and jump straight into the public experience.',
    href: LIVE_SITE_URL,
    icon: Rocket,
  },
  {
    title: 'Browse GitHub Source',
    description: 'Open the public repository and inspect routes, components, and content directly from GitHub.',
    href: GITHUB_REPO_URL,
    icon: Github,
  },
  {
    title: 'Open Project Pages',
    description: 'Jump to the page-level source files that drive this app so Codex or ChatGPT can be pointed at concrete files quickly.',
    href: GITHUB_PROJECTS_URL,
    icon: FolderKanban,
  },
  {
    title: 'Start Remote Chat',
    description: 'Open ChatGPT on any device and use the prepared handoff prompt below to continue project work remotely.',
    href: CHAT_URL,
    icon: Bot,
  },
] as const;

const repoShortcuts = [
  {
    label: 'Routes map',
    path: 'src/app/routes.tsx',
  },
  {
    label: 'App root',
    path: 'src/app/App.tsx',
  },
  {
    label: 'Page directory',
    path: 'src/app/pages',
  },
  {
    label: 'Site components',
    path: 'src/components/site',
  },
  {
    label: 'Remote MCP server',
    path: 'tools/remote-mcp-server',
  },
] as const;

function getRepoUrl(path: string) {
  const mode = path.includes('.') ? 'blob' : 'tree';
  return `${GITHUB_REPO_URL}/${mode}/main/${path}`;
}

export default function RemotePage() {
  const [copied, setCopied] = useState(false);
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : LIVE_SITE_URL;

  const handoffPrompt = useMemo(
    () => `Help me continue working on the Wanderlust Architects project.

GitHub repo: ${GITHUB_REPO_URL}
Live site: ${LIVE_SITE_URL}
Remote hub: ${currentOrigin}/remote

Start by checking:
- src/app/routes.tsx
- src/app/pages
- src/components/site
- tools/remote-mcp-server

When you answer, reference concrete files and explain how the change affects the route or visible UI.`,
    [currentOrigin],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(handoffPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className='relative overflow-hidden bg-[#f5f1e8] pb-24 pt-28 text-ink sm:pt-32'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(177,140,74,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(21,22,20,0.08),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.7),_rgba(245,241,232,0.95))]' />
      <Container className='relative z-10 space-y-16'>
        <Reveal>
          <div className='grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)] lg:items-end'>
            <div className='space-y-6'>
              <Badge className='border-black/10 bg-white/70 text-black'>GitHub + Vercel Remote Hub</Badge>
              <SectionTitle
                eyebrow='Remote Workflow'
                title='One URL for the project, the source, and the chat handoff.'
                description='This page is the lightweight remote gateway for Wanderlust Architects. Open it from any device to jump into the live Vercel app, the GitHub codebase, and a prepared ChatGPT handoff for continuing work with Codex.'
              />
              <div className='flex flex-wrap gap-3'>
                <Button href={LIVE_SITE_URL}>Open Live Site</Button>
                <Button href={GITHUB_REPO_URL} variant='ghost'>
                  Open GitHub
                </Button>
                <Button href={CHAT_URL} variant='subtle'>
                  Open Chat
                </Button>
              </div>
            </div>

            <Card className='border-black/10 bg-[#171614] p-6 text-white shadow-[0_28px_70px_rgba(23,22,20,0.22)]'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <p className='text-[11px] uppercase tracking-[0.24em] text-white/55'>Remote Access URL</p>
                  <p className='mt-2 text-lg leading-tight [overflow-wrap:anywhere]'>{currentOrigin}/remote</p>
                </div>
                <div className='rounded-full border border-white/12 bg-white/8 p-3'>
                  <Sparkles className='h-5 w-5 text-[#d7bc86]' />
                </div>
              </div>
              <div className='mt-6 grid gap-3 sm:grid-cols-3'>
                <div className='rounded-2xl border border-white/10 bg-white/6 p-4'>
                  <p className='text-[10px] uppercase tracking-[0.22em] text-white/45'>Frontend</p>
                  <p className='mt-2 text-sm text-white/88'>Hosted on Vercel for easy device access.</p>
                </div>
                <div className='rounded-2xl border border-white/10 bg-white/6 p-4'>
                  <p className='text-[10px] uppercase tracking-[0.22em] text-white/45'>Codebase</p>
                  <p className='mt-2 text-sm text-white/88'>Public GitHub repo for routes, components, and content.</p>
                </div>
                <div className='rounded-2xl border border-white/10 bg-white/6 p-4'>
                  <p className='text-[10px] uppercase tracking-[0.22em] text-white/45'>Chat</p>
                  <p className='mt-2 text-sm text-white/88'>Prepared handoff prompt for Codex or ChatGPT from any browser.</p>
                </div>
              </div>
            </Card>
          </div>
        </Reveal>

        <section className='space-y-6'>
          <Reveal>
            <SectionTitle
              eyebrow='Quick Actions'
              title='Open the right surface without hunting for links.'
              description='Each action below is device-friendly and points at the exact place you are most likely to need when continuing work away from this machine.'
            />
          </Reveal>

          <div className='grid gap-5 lg:grid-cols-2'>
            {quickActions.map(({ title, description, href, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.06}>
                <Card className='group h-full border-black/10 bg-white/85 p-6 shadow-[0_18px_44px_rgba(23,22,20,0.08)] transition-transform duration-300 hover:-translate-y-1'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='space-y-4'>
                      <div className='inline-flex rounded-full border border-black/10 bg-[#f4ead5] p-3 text-[#171614]'>
                        <Icon className='h-5 w-5' />
                      </div>
                      <div className='space-y-2'>
                        <h3 className='text-2xl font-medium leading-tight text-ink'>{title}</h3>
                        <p className='text-sm leading-6 text-iron'>{description}</p>
                      </div>
                    </div>
                    <ArrowUpRight className='h-5 w-5 text-black/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                  </div>
                  <div className='mt-6'>
                    <Button href={href} variant='ghost' className='w-full justify-center'>
                      Open Now
                    </Button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section className='grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)]'>
          <Reveal>
            <Card className='h-full border-black/10 bg-white/88 p-6 shadow-[0_18px_44px_rgba(23,22,20,0.08)]'>
              <div className='flex items-center gap-3'>
                <div className='rounded-full border border-black/10 bg-[#efe2c4] p-3'>
                  <Layers3 className='h-5 w-5' />
                </div>
                <div>
                  <p className='text-[11px] uppercase tracking-[0.24em] text-iron'>GitHub Shortcuts</p>
                  <h3 className='mt-1 text-2xl font-medium text-ink'>High-signal entry points into the codebase.</h3>
                </div>
              </div>
              <div className='mt-6 grid gap-3'>
                {repoShortcuts.map((shortcut) => (
                  <a
                    key={shortcut.path}
                    href={getRepoUrl(shortcut.path)}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center justify-between gap-3 rounded-2xl border border-black/8 bg-[#fbf8f1] px-4 py-4 transition-colors hover:border-black/18 hover:bg-white'
                  >
                    <div>
                      <p className='text-sm font-medium text-ink'>{shortcut.label}</p>
                      <p className='mt-1 text-xs text-iron'>{shortcut.path}</p>
                    </div>
                    <ArrowUpRight className='h-4 w-4 shrink-0 text-black/40' />
                  </a>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className='h-full border-black/10 bg-[#171614] p-6 text-white shadow-[0_28px_70px_rgba(23,22,20,0.22)]'>
              <div className='flex items-center gap-3'>
                <div className='rounded-full border border-white/12 bg-white/8 p-3'>
                  <Bot className='h-5 w-5 text-[#d7bc86]' />
                </div>
                <div>
                  <p className='text-[11px] uppercase tracking-[0.24em] text-white/50'>Chat Handoff</p>
                  <h3 className='mt-1 text-2xl font-medium text-white'>Project context you can paste into ChatGPT or Codex.</h3>
                </div>
              </div>
              <p className='mt-4 text-sm leading-6 text-white/70'>
                This app does not embed a private LLM backend. Instead, it gives you a ready handoff so you can open ChatGPT on any device and continue with the right repo and files immediately.
              </p>
              <div className='mt-6 rounded-[24px] border border-white/10 bg-white/6 p-4'>
                <pre className='overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-white/86'>{handoffPrompt}</pre>
              </div>
              <div className='mt-5 flex flex-wrap gap-3'>
                <Button onClick={handleCopy} className='min-w-[190px] justify-center border-white bg-white text-black hover:bg-[#efe2c4]'>
                  <Copy className='h-4 w-4' />
                  {copied ? 'Copied' : 'Copy Prompt'}
                </Button>
                <Button href={CHAT_URL} variant='subtle' className='min-w-[190px] justify-center border-white/20 bg-white/10 text-white hover:border-white hover:bg-white hover:text-black'>
                  Open ChatGPT
                </Button>
              </div>
            </Card>
          </Reveal>
        </section>
      </Container>
    </main>
  );
}
