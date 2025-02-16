import { BlogCard } from './BlogCard';
import { getLatestBlogs } from './lib/data';
import { blog } from './resource';

export const NewBlogs = async () => {
    const latestBlogs = await getLatestBlogs();
    return (
        <>
            <h2 className='text-3xl mb-8 font-bold'>{blog.headline}</h2>
            <div className='grid xl:grid-cols-2 xl:grid-rows-2 gap-4 mb-8'>
                {/* Left column spanning 2 rows */}
                <div className='col-start-1 col-end-2 row-start-1 row-end-3 flex flex-col gap-4'>
                    <BlogCard theBlog={latestBlogs[0]} aspect='aspect-[16/9]' />
                </div>

                {/* Right column first row */}
                <div className={`xl:col-start-2 xl:col-end-3 xl:row-start-1 xl:row-end-2 flex gap-4`}>
                    <BlogCard theBlog={latestBlogs[1]} aspect='aspect-[4/3]' />
                </div>

                {/* Right column second row */}
                <div className={`xl:col-start-2 xl:col-end-3 xl:row-start-2 xl:row-end-3 flex gap-4`}>
                    <BlogCard theBlog={latestBlogs[2]} aspect='aspect-[4/3]' />
                </div>
            </div>
        </>
    );
};

