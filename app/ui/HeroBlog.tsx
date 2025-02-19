import { BlogCard } from './BlogCard';
import { getMostLikedBlog } from '@/app/lib/data';

// 获取最被喜欢的博客

export async function HeroBlog() {
    const mostLikedBlog = await getMostLikedBlog();
    return (
        <section className='w-full grid grid-cols-2 gap-4 h-[50vh] mb-4 xl:mb-8 bg-neutral text-neutral-content'>
            <BlogCard theBlog={mostLikedBlog!} justify='justify-center' />
        </section>
    );
}

