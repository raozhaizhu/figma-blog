import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const prisma = new PrismaClient();

// 获取当前文件的路径和目录
const __filename = fileURLToPath(import.meta.url); // 转换 import.meta.url 为文件路径
const __dirname = dirname(__filename); // 获取目录路径

async function main() {
    try {
        // 构造 JSON 文件的路径
        const filePath = `${__dirname}/palceholder.json`; // 假设 JSON 文件在上级目录的 app 文件夹中
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const blogData = JSON.parse(fileContent);

        // 遍历每一篇博客数据并插入到数据库
        for (const blog of blogData) {
            await prisma.blog.create({
                data: {
                    id: blog.id,
                    title: blog.title,
                    userId: blog.userId,
                    description: blog.description,
                    content: blog.content,
                    imageUrl: blog.imageUrl,
                    publishedAt: blog.publishedAt ? new Date(blog.publishedAt) : null,
                    type: blog.type,
                    tags: blog.tags ? JSON.stringify(blog.tags) : Prisma.JsonNull,
                    status: blog.status,
                    views: blog.views,
                    likes: blog.likes,
                    commentsCount: blog.commentsCount,
                    createdAt: new Date(blog.createdAt),
                    updatedAt: new Date(blog.updatedAt),
                    deletedAt: blog.deletedAt ? new Date(blog.deletedAt) : null,
                },
            });

            console.log(`Blog with id ${blog.id} has been added.`);
        }
    } catch (error) {
        console.error('Error inserting blog data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});

