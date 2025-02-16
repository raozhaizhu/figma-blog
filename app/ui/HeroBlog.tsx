import { BlogCard } from './BlogCard';
import { getMostLikedBlog } from '@/app/lib/data';

// 获取最被喜欢的博客

export async function HeroBlog() {
    const mostLikedBlog = await getMostLikedBlog();
    return (
        <>
            <BlogCard theBlog={mostLikedBlog!} justify='justify-center' />
        </>
    );
}

