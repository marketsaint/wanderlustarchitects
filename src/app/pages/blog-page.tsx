import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { BlogListClient } from '@/components/site/blog';
import { SectionTitle } from '@/components/site/ui';
import { getBlogTagMatches, getBlogs } from '@/lib/site-content';

export default function BlogPage() {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const activeTag = searchParams.get('tag') ?? '';
  const blogs = activeTag ? getBlogTagMatches(activeTag) : getBlogs();

  return (
    <div className='mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-10 lg:py-24'>
      <section className='rounded-xl border border-mist bg-white p-8 shadow-soft lg:p-12'>
        <SectionTitle
          eyebrow='Blogs'
          title={activeTag ? `Insights tagged ${activeTag}` : 'Design intelligence for clients planning high-value spaces.'}
          description='Read practical strategy on architecture, interior systems, fit-outs, and execution planning.'
        />
      </section>
      <BlogListClient blogs={blogs} />
    </div>
  );
}
