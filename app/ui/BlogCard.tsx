import Image from 'next/image';
import { badgeList } from '@/app/resource';
import { BlogPreview } from '@/app/lib/data';

export function BlogCard({
    aspect = '',
    justify = '',
    theBlog,
}: {
    aspect?: string;
    justify?: string;
    theBlog: BlogPreview;
}) {
    if (!theBlog) {
        return null; // 或者返回一个加载状态/错误状态的UI
    }

    const { title, description, imageUrl, createdAt, tags } = theBlog;
    // 将 JSON 转换为数组
    const tagArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
    // 如果没有博客数据，返回 null

    return (
        <>
            <div className={`relative ${aspect} group`}>
                <Image src={`${imageUrl}`} alt='Example' fill className='object-cover' />
            </div>
            <div className={`flex flex-col gap-3 ${justify}`}>
                <p className='text-primary'>
                    {createdAt.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </p>
                <h3 className='text-lg font-bold'>{title}</h3>
                <p>{description}</p>
                <div className='flex flex-wrap gap-2'>
                    {Array.isArray(tagArray) &&
                        tagArray.map((tag, index) => {
                            // 随机选择一个 badge 类名
                            const randomBadge = badgeList[index];

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

