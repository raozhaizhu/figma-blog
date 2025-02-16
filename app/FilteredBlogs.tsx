'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { BlogCard } from './BlogCard';
import { Blog } from '@prisma/client';
import { FilterButtons } from './FilterButtons';
import { blog } from './resource';
import { BlogList } from './BlogList';

export function FilteredBlogs() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'views';

    return (
        <>
            <div className='grid xl:grid-cols-3 xl:grid-rows-2 gap-4 mb-8'></div>
        </>
    );
}

