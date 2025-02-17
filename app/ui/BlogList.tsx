import { BlogCard } from './BlogCard';
import { getFilteredBlogs } from '@/app/lib/data';

// 服务端组件
export async function BlogList({ type, page }: { type: string; page: string }) {
    const filteredBlogs = await getFilteredBlogs(type, page);

    return (
        <div className='grid md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 gap-4 mb-8'>
            {filteredBlogs.map((blog) => (
                <div key={blog.id} className='grid grid-cols-1 gap-4'>
                    <BlogCard theBlog={blog} aspect='aspect-[4/3]' />
                </div>
            ))}
        </div>
    );
}

