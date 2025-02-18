import { generateSlug } from '@/app/lib/utils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSlugs() {
    const blogs = await prisma.blog.findMany();
    for (const blog of blogs) {
        const slug = generateSlug(blog.title);
        await prisma.blog.update({
            where: { id: blog.id },
            data: { slug },
        });
    }
    console.log('✅ Slugs updated!');
    await prisma.$disconnect();
}

updateSlugs();

