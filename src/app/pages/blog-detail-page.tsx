import { useParams } from 'react-router';
import { BlogArticle, BlogHeader } from '@/components/site/blog';
import { Button } from '@/components/site/ui';
import { getBlogBySlug } from '@/lib/site-content';

export default function BlogDetailPage() {
  const { slug = '' } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className='mx-auto max-w-4xl space-y-6 px-4 py-24 text-center sm:px-6 lg:px-10'>
        <p className='text-xs uppercase tracking-[0.2em] text-iron'>Blog Not Found</p>
        <h1 className='text-4xl'>The requested article could not be found.</h1>
        <div className='flex justify-center'>
          <Button href='/blog'>Back to Blogs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-7xl space-y-10 px-4 py-16 sm:px-6 lg:px-10 lg:py-24'>
      <BlogHeader blog={blog} />
      <BlogArticle blog={blog} />
    </div>
  );
}
