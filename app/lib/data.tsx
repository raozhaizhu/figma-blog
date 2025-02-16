import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 定义我们需要的字段类型
type BlogPreview = {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    createdAt: Date;
    tags: any;
};

const NUMBER_PER_PAGE = 6;

// 统一的字段选择器
const blogPreviewSelect = {
    id: true,
    title: true,
    description: true,
    imageUrl: true,
    createdAt: true,
    tags: true,
} as const;

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
export async function getFilteredBlogs(type: string, page: string): Promise<BlogPreview[]> {
    try {
        return await prisma.blog.findMany({
            select: blogPreviewSelect,
            orderBy: {
                [type]: 'desc',
            },
            skip: (parseInt(page) - 1) * NUMBER_PER_PAGE,
            take: NUMBER_PER_PAGE,
        });
    } catch (error) {
        console.error('error fetching filtered blogs:', error);
        return [];
    }
}

// 获取最新的博客
export async function getLatestBlogs(): Promise<BlogPreview[]> {
    try {
        const latestBlogs = await prisma.blog.findMany({
            select: blogPreviewSelect,
            orderBy: {
                createdAt: 'desc',
            },
            take: 4,
        });

        return latestBlogs.map((blog) => ({
            ...blog,
            tags: typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags,
        }));
    } catch (error) {
        console.error('error fetching latest blogs:', error);
        return [];
    }
}

// 获取最被喜欢的博客
export async function getMostLikedBlog(): Promise<BlogPreview | null> {
    try {
        return await prisma.blog.findFirst({
            select: blogPreviewSelect,
            orderBy: {
                likes: 'desc',
            },
        });
    } catch (error) {
        console.error('error fetching most liked blog:', error);
        return null;
    }
}

