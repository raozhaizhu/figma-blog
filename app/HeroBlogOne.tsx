import { Blog } from '@prisma/client';
import Image from 'next/image';
import { badgeList } from '@/app/resource';

export function HeroBlogOne({ firstBlog }: { firstBlog: Blog }) {
    const { title, description, imageUrl, createdAt, type, tags } = firstBlog;
    // 将 JSON 转换为数组
    const tagArray = typeof tags === 'string' ? JSON.parse(tags) : tags;

    return (
        <>
            <div className='relative aspect-[16/9] group'>
                <Image src='/images/alejandro-henriquez.jpg' alt='Example' fill className='object-cover' />
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-primary'>
                    {createdAt.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </p>
                <h3 className='text-lg font-bold'>{title}</h3>
                <p>{description}</p>
                <div className='flex gap-2'>
                    {Array.isArray(tagArray) &&
                        tagArray.map((tag, index) => {
                            // 随机选择一个 badge 类名
                            const randomIndex = Math.floor(Math.random() * badgeList.length);
                            const randomBadge = badgeList[randomIndex];

                            return (
                                <span key={index} className={`badge ${randomBadge}`}>
                                    {tag}
                                </span>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

