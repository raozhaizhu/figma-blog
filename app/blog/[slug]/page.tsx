import { getBlogBySlug } from '@/app/lib/data';
import SafeMarkdown from '@/app/lib/SafeMarkdown';
import { BlogCard } from '@/app/ui/BlogCard';
import { getLatestBlogs } from '@/app/lib/data';
import { Contact } from '@/app/ui/Contact';
import Image from 'next/image';
import { badgeList } from '@/app/resource';
import { HeroContact } from '@/app/ui/HeroContact';

interface PageProps {
    params: {
        slug: string;
    };
}
export default async function BlogPost({ params }: PageProps) {
    const latestBlogs = await getLatestBlogs();

    const { slug } = params;
    const blog = await getBlogBySlug(slug);
    if (!blog) return null;
    const { title, imageUrl, createdAt, tags, content } = blog;
    const tagArray = typeof tags === 'string' ? JSON.parse(tags) : tags;

    return (
        <main className='container mx-auto mb-4 xl:mb-8'>
            <div className='divider'></div>
            <section className='flex items-stretch gap-8'>
                <div className='w-full hidden lg:flex lg:w-1/3 xl:w-1/4 flex-col gap-4'>
                    <p className='text-3xl mb-4'>Latest Blogs</p>
                    <div className='grid grid-rows-auto gap-4'>
                        <BlogCard theBlog={latestBlogs[0]} aspect='aspect-[4/3]' />
                    </div>
                    <div className='grid grid-rows-auto gap-4'>
                        <BlogCard theBlog={latestBlogs[1]} aspect='aspect-[4/3]' />
                    </div>
                    <div className='grid grid-rows-auto gap-4'>
                        <BlogCard theBlog={latestBlogs[2]} aspect='aspect-[4/3]' />
                    </div>
                    <div className='grid grid-rows-auto gap-4'>
                        <BlogCard theBlog={latestBlogs[3]} aspect='aspect-[4/3]' />
                    </div>
                </div>
                <div className='flex flex-col gap-4 xl:gap-8 min-h-screen w-full lg:w-2/3 xl:w-3/4 px-2 sm:px-4 xl:px-0'>
                    <div className={`relative aspect-[16/9] group`}>
                        <Image src={imageUrl || ''} alt='Example' fill className='object-cover' />
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
                </div>
            </section>
        </main>
    );
}

