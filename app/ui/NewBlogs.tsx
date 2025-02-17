import { BlogCard } from './BlogCard';
import { getLatestBlogs } from '@/app/lib/data';
import { blog } from '@/app/resource';
import '@/app/ui/Newblogs.scss';

export const NewBlogs = async () => {
    const latestBlogs = await getLatestBlogs();
    return (
        <>
            <h2 className='text-3xl mb-8 font-bold'>{blog.headline}</h2>
            {/* use scss */}
            <div className='blog-box grid md:grid-cols-2 gap-4'>
                {/* Left column spanning 2 rows */}
                <div className='blog-1'>
                    <BlogCard theBlog={latestBlogs[0]} aspect='aspect-[16/9]' />
                </div>

                {/* Right column first row */}
                <div className={`blog-2 `}>
                    <BlogCard theBlog={latestBlogs[1]} aspect='aspect-[4/3]' />
                </div>

                {/* Right column second row */}
                <div className={`blog-3`}>
                    <BlogCard theBlog={latestBlogs[2]} aspect='aspect-[4/3]' />
                </div>
            </div>
        </>
    );
};

