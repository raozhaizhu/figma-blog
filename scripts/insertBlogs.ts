import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 清理 JSON 字符串的函数
function cleanJsonString(str: string): string {
    // 移除 BOM
    if (str.charCodeAt(0) === 0xfeff) {
        str = str.slice(1);
    }

    // 移除所有注释（包括多行注释）
    str = str.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

    // 移除文件开头的任何非 JSON 内容
    str = str.substring(str.indexOf('['));

    // 移除所有不可见字符，除了合法的空白
    str = str.replace(/[^\x20-\x7E\s]/g, '');

    return str;
}

async function main() {
    try {
        const filePath = join(__dirname, 'palceholder.json');
        console.log('Reading file from:', filePath);

        let fileContent = fs.readFileSync(filePath, 'utf-8');

        // 清理并格式化 JSON
        const cleanedContent = cleanJsonString(fileContent);
        console.log('Cleaned content start:', cleanedContent.substring(0, 100));

        // 验证 JSON 格式
        try {
            JSON.parse(cleanedContent);
        } catch (parseError) {
            console.error('Invalid JSON. Attempting to fix...');
            // 如果解析失败，尝试写入文件以便检查
            fs.writeFileSync(join(__dirname, 'debug-content.json'), cleanedContent);
            throw parseError;
        }

        const blogData = JSON.parse(cleanedContent);

        for (const blog of blogData) {
            await prisma.blog.create({
                data: {
                    id: blog.id,
                    title: blog.title,
                    slug: blog.slug,
                    userId: blog.userId,
                    description: blog.description,
                    content: blog.content, // 现在 content 已经包含正确的 \n
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
        console.error('Error details:', error);
        if (error instanceof SyntaxError) {
            console.error('JSON Syntax Error. Please check debug-content.json');
        }
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});

