import { blog } from '@/app/resource';
import { Header } from './Header';
import { BlogList } from './BlogList';
import { Suspense } from 'react';
import { FilterButtons } from './FilterButtons';
import { BlogListSkeleton } from './BlogListSkeleton';
import { NewBlogs } from './NewBlogs';
import { Pagination } from './Pagination';
import { HeroBlog } from './HeroBlog';
import { fetchBlogsPages } from '@/app/lib/data';

type PageProps = {
    searchParams?: {
        type?: string;
        page?: string;
    };
};

export default async function Home({
    searchParams,
}: {
    searchParams: {
        type?: string;
        page?: string;
    };
}) {
    // 使用 Promise.resolve() 来处理异步的 searchParams
    const params = await Promise.resolve(searchParams);
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

