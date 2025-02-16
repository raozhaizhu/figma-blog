import { blog } from '@/app/resource';
import { Header } from '@/app/ui/Header';
import { BlogList } from '@/app/ui/BlogList';
import { Suspense } from 'react';
import { FilterButtons } from '@/app/ui/FilterButtons';
import { BlogListSkeleton } from '@/app/ui/BlogListSkeleton';
import { HeroBlog } from '@/app/ui/HeroBlog';
import { NewBlogs } from '@/app/ui/NewBlogs';
import { fetchBlogsPages } from '@/app/lib/data';
import { Pagination } from '@/app/ui/Pagination';

export default async function HomePage({
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
    const totalePages = await fetchBlogsPages();

    return (
        <main>
            {/* Main Title */}
            <section className='container mx-auto mb-8'>
                <Header />
            </section>
            {/*3 Newest Blogs*/}
            <section className='container mx-auto mb-8'>
                <NewBlogs />
            </section>
            {/*Hero Blog*/}
            <section className='w-full grid grid-cols-2 gap-4 h-[50vh] mb-8 bg-neutral text-neutral-content'>
                <HeroBlog />
            </section>

            <section className='container mx-auto mb-8'>
                <div className='flex justify-between items-center mb-8'>
                    <h2 className='text-3xl font-bold'>{blog.subtitles[0]}</h2>
                    <FilterButtons />
                </div>
                {/* 确保 key 值变化时会触发重新加载 */}
                <Suspense key={type} fallback={<BlogListSkeleton />}>
                    <BlogList type={type} page={page} />
                </Suspense>
            </section>

            <section className='container mx-auto mb-8'>
                <Pagination totalPages={totalePages} />
            </section>
        </main>
    );
}

