import { getBlogBySlug } from "@/app/lib/data";
import { BlogCard } from "@/app/ui/BlogCard";
import { getLatestBlogs } from "@/app/lib/data";
import { Suspense } from "react";
import { BlogPreview } from "@/app/lib/data";
import { BlogSkeleton } from "@/app/ui/Skeleton";
import { BlogContent } from "@/app/ui/BlogContent";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPost({ params }: PageProps) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // 并行获取数据
    const [latestBlogs, blog] = await Promise.all([
        getLatestBlogs(),
        getBlogBySlug(slug),
    ]);

    if (!blog) return null;

    return (
        <main className="container mx-auto mb-4 xl:mb-8">
            <div className="divider"></div>
            <section className="flex items-stretch gap-8">
                <div className="w-full min-h-screen hidden lg:flex lg:w-1/3 xl:w-1/4 flex-col gap-4">
                    <Suspense fallback={<BlogSkeleton />}>
                        <LatestBlogs latestBlogs={latestBlogs} />
                    </Suspense>
                </div>
                <div className="flex flex-col gap-4 xl:gap-8 min-h-screen w-full lg:w-2/3 xl:w-3/4 px-2 sm:px-4 xl:px-0">
                    <Suspense fallback={<BlogSkeleton />}>
                        <BlogContent {...blog} />
                    </Suspense>
                </div>
            </section>
        </main>
    );
}

export interface Blog {
    title: string;
    imageUrl: string | null;
    createdAt: Date;
    tags: string | string[];
    content: string;
}

function LatestBlogs({ latestBlogs }: { latestBlogs: BlogPreview[] }) {
    return (
        <>
            <p className="text-3xl mb-4">Latest Blogs</p>
            {latestBlogs.map((blog, index) => (
                <BlogCard key={index} theBlog={blog} aspect="aspect-[4/3]" />
            ))}
        </>
    );
}
