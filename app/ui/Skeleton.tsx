export function BlogSkeleton() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='skeleton h-32 w-full'></div>
            <div className='skeleton h-4 w-28'></div>
            <div className='skeleton h-4 w-full'></div>
            <div className='skeleton h-4 w-full'></div>
        </div>
    );
}

export function BlogListSkeleton() {
    return (
        <div className='grid xl:grid-cols-3 xl:grid-rows-2 gap-4 mb-8'>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    );
}

export function SmallSkeleton() {
    return <div className='skeleton h-32 w-32'></div>;
}

export function HeroSkeleton() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='skeleton h-32 w-full'></div>
            <div className='skeleton h-4 w-28'></div>
            <div className='skeleton h-4 w-full'></div>
            <div className='skeleton h-4 w-full'></div>
        </div>
    );
}
