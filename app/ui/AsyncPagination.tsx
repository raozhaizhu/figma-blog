import { fetchBlogsPages } from '@/app/lib/data';
import { Pagination } from '@/app/ui/Pagination';

export async function AsyncPagination() {
    const totalPages = await fetchBlogsPages();
    return <Pagination totalPages={totalPages} />;
}

