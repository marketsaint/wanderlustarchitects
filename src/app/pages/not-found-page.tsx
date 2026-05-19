import { Button } from '@/components/site/ui';

export default function NotFoundPage() {
  return (
    <div className='mx-auto max-w-4xl space-y-6 px-4 py-24 text-center sm:px-6 lg:px-10'>
      <p className='text-xs uppercase tracking-[0.2em] text-iron'>Not Found</p>
      <h1 className='text-4xl'>The page you are looking for does not exist.</h1>
      <p className='text-sm text-iron'>Try heading back to the main site or jump directly into the projects experience.</p>
      <div className='flex flex-wrap justify-center gap-3'>
        <Button href='/india'>Home</Button>
        <Button href='/projects' variant='ghost'>
          Projects
        </Button>
      </div>
    </div>
  );
}
