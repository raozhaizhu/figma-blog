'use client';

import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import clsx from 'clsx';

export const Pagination = ({ totalPages }: { totalPages: number }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const allPages = generatePagination(currentPage, totalPages);

    const handlePageChange = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className='flex justify-center items-center'>
            <div className='flex'>
                {allPages.map((page, index) => {
                    let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                    if (index === 0) position = 'first';
                    if (index === allPages.length - 1) position = 'last';
                    if (allPages.length === 1) position = 'single';
                    if (page === '...') position = 'middle';

                    return (
                        <PaginationNumber
                            key={page}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                            onClick={() => handlePageChange(page)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

function PaginationNumber({
    page,
    position,
    isActive,
    onClick,
}: {
    page: number | string;
    position?: 'first' | 'last' | 'middle' | 'single';
    isActive: boolean;
    onClick: () => void;
}) {
    const className = clsx('flex h-10 w-10 items-center justify-center text-sm border border-primary', {
        'rounded-l-md': position === 'first' || position === 'single',
        'rounded-r-md': position === 'last' || position === 'single',
        'z-10 bg-primary border-primary text-primary-content': isActive,
        'hover:bg-base-300': !isActive && position !== 'middle',
        'text-base-300': position === 'middle',
    });

    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div>
    ) : (
        <button onClick={onClick} className={className}>
            {page}
        </button>
    );
}

