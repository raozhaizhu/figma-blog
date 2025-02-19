import { blog } from '@/app/resource';
import { Header } from '@/app/ui/Header';
import { BlogList } from '@/app/ui/BlogList';
import { Suspense } from 'react';
import { FilterButtons } from '@/app/ui/FilterButtons';
import { HeroBlog } from '@/app/ui/HeroBlog';
import { NewBlogs } from '@/app/ui/NewBlogs';
import { BlogSkeleton, SmallSkeleton } from '@/app/ui/Skeleton';
import { AsyncPagination } from '@/app/ui/AsyncPagination';

export default async function HomePage({
    searchParams,
}: {
    searchParams: Promise<{
        type?: string;
        page?: string;
    }>;
}) {
    return (
        <main>
            <section className='container mx-auto mb-4 xl:mb-8'>
                <Header title={blog.title} />
                <div className='px-2 sm:px-4 xl:px-0 '>
                    <Suspense fallback={<BlogSkeleton />}>
                        <NewBlogs />
                    </Suspense>
                </div>
            </section>
            <section className='w-full grid grid-cols-2 gap-4 h-[50vh] mb-4 xl:mb-8 bg-neutral text-neutral-content'>
                <Suspense fallback={<BlogSkeleton />}>
                    <HeroBlog />
                </Suspense>
            </section>
            <section className='container mx-auto mb-4 xl:mb-8 px-2 sm:px-4 xl:px-0 '>
                <div className='flex justify-between items-center mb-4 xl:mb-8'>
                    <h2 className='text-3xl font-bold'>{blog.subtitles[0]}</h2>
                    <FilterButtons />
                </div>
                <Suspense fallback={<BlogSkeleton />}>
                    <BlogList searchParams={searchParams} />
                </Suspense>
                <Suspense fallback={<SmallSkeleton />}>
                    <AsyncPagination />
                </Suspense>
            </section>
        </main>
    );
}

