'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function FilterButtons() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(type: string) {
        const params = new URLSearchParams(searchParams);
        params.set('type', type);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    const types = ['createdAt', 'views', 'likes'] as const;

    return (
        <div className='dropdown dropdown-end'>
            <div tabIndex={0} role='button' className='btn m-1'>
                Sort by
            </div>
            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
                {types.map((type) => (
                    <li key={type}>
                        <button onClick={() => handleSearch(type)} className='w-full text-left'>
                            {type}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

