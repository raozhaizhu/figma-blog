import { PrismaClient, Blog } from '@prisma/client';

const prisma = new PrismaClient();

// 每页显示的博客数量
const NUMBER_PER_PAGE = 6;

// 获取页面总数量
export async function fetchBlogsPages() {
    try {
        const count = await prisma.blog.count();
        return Math.ceil(count / NUMBER_PER_PAGE);
    } catch (error) {
        console.error('error fetching blogs pages', error);
        return 1;
    }
}
// 获取被筛选的博客
export async function getFilteredBlogs(type: string, page: string): Promise<Blog[]> {
    const prisma = new PrismaClient();

    try {
        return await prisma.blog.findMany({
            orderBy: {
                [type]: 'desc',
            },
            skip: (parseInt(page) - 1) * NUMBER_PER_PAGE,
            take: NUMBER_PER_PAGE,
        });
    } catch (error) {
        console.error('error fetching filtered blogs:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}

// 获取最新的博客
export async function getLatestBlogs() {
    try {
        const latestBlogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 4,
        });

        // 处理每个博客的 tags
        return latestBlogs.map((blog: Blog) => ({
            ...blog,
            tags: typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags,
        }));
    } catch (error) {
        console.error('error fetching latest blogs', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}

// 获取最被喜欢的博客
export async function getMostLikedBlog() {
    try {
        const getMostLikedBlog = await prisma.blog.findFirst({
            orderBy: {
                likes: 'desc',
            },
        });
        return getMostLikedBlog;
    } catch (error) {
        console.error('error fetching most liked blog', error);
        return null;
    }
}

