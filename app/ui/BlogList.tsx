import { BlogCard } from './BlogCard';
import { getFilteredBlogs, BlogPreview } from '@/app/lib/data';

// 服务端组件
export async function BlogList({
    searchParams,
}: {
    searchParams: Promise<{
        type?: string;
        page?: string;
    }>;
}) {
    // 等待 searchParams Promise 解析
    const params = await searchParams;
    const type = params?.type ?? 'views';
    const page = params?.page ?? '1';
    const filteredBlogs: BlogPreview[] = await getFilteredBlogs(type, page);

    return (
        <div className='grid md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 gap-4 mb-8'>
            {filteredBlogs.map((blog: BlogPreview) => (
                <div key={blog.id} className='grid grid-cols-1 gap-4'>
                    <BlogCard theBlog={blog} aspect='aspect-[4/3]' />
                </div>
            ))}
        </div>
    );
}

