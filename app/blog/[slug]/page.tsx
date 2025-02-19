import { getBlogBySlug } from '@/app/lib/data';
import { BlogCard } from '@/app/ui/BlogCard';
import { getLatestBlogs } from '@/app/lib/data';
import Image from 'next/image';
import { badgeList } from '@/app/resource';
import { HeroContact } from '@/app/ui/HeroContact';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { BlogPreview } from '@/app/lib/data';
import { BlogSkeleton } from '@/app/ui/Skeleton';

const SafeMarkdown = dynamic(() => import('@/app/lib/SafeMarkdown'), {
    loading: () => <div className='animate-pulse bg-base-200 h-96' />,
});

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPost({ params }: PageProps) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // 并行获取数据
    const [latestBlogs, blog] = await Promise.all([getLatestBlogs(), getBlogBySlug(slug)]);

    if (!blog) return null;

    return (
        <main className='container mx-auto mb-4 xl:mb-8'>
            <div className='divider'></div>
            <section className='flex items-stretch gap-8'>
                <div className='w-full min-h-screen hidden lg:flex lg:w-1/3 xl:w-1/4 flex-col gap-4'>
                    <Suspense fallback={<BlogSkeleton />}>
                        <LatestBlogs latestBlogs={latestBlogs} />
                    </Suspense>
                </div>
                <div className='flex flex-col gap-4 xl:gap-8 min-h-screen w-full lg:w-2/3 xl:w-3/4 px-2 sm:px-4 xl:px-0'>
                    <Suspense fallback={<BlogSkeleton />}>
                        <BlogContent {...blog} />
                    </Suspense>
                </div>
            </section>
        </main>
    );
}

interface Blog {
    title: string;
    imageUrl: string | null;
    createdAt: Date;
    tags: string | string[];
    content: string;
}

function BlogContent({ title, imageUrl, createdAt, tags, content }: Blog) {
    const tagArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
    return (
        <>
            <div className={`relative aspect-[16/9] group`}>
                <Image
                    src={imageUrl || ''}
                    alt='Example'
                    fill
                    priority
                    className='object-cover'
                    placeholder='blur'
                    blurDataURL='/placeholder.jpg'
                />
            </div>
            <article className='flex flex-col justify-center items-center prose max-w-none '>
                <p className='text-primary mr-auto'>
                    {createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <h1>{title}</h1>
                <SafeMarkdown content={content} />
            </article>
            <div className='flex justify-end gap-2 my-4'>
                {Array.isArray(tagArray) &&
                    tagArray.map((tag, index) => {
                        // 随机选择一个 badge 类名
                        const randomBadge = badgeList[index];

                        return (
                            <span key={index} className={`badge lg:badge-lg p-4 ${randomBadge}`}>
                                {tag}
                            </span>
                        );
                    })}
            </div>
            <div className='mt-auto'></div>
            <HeroContact />
        </>
    );
}

function LatestBlogs({ latestBlogs }: { latestBlogs: BlogPreview[] }) {
    return (
        <>
            <p className='text-3xl mb-4'>Latest Blogs</p>
            {latestBlogs.map((blog, index) => (
                <BlogCard key={index} theBlog={blog} aspect='aspect-[4/3]' />
            ))}
        </>
    );
}

