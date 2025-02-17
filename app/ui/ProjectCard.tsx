import { badgeList } from '@/app/resource';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
type ProjectPreview = {
    name: string;
    description: string;
    tags: string[];
    link: string;
    imageUrl: string;
};

interface ProjectCardProps {
    aspect?: string;
    justify?: string;
    theProject: ProjectPreview;
}

export function ProjectCard({ aspect = '', justify = '', theProject }: ProjectCardProps) {
    if (!theProject) {
        return null; // 或者返回一个加载状态/错误状态的UI
    }

    const { name, description, tags, link, imageUrl } = theProject;
    // 将 JSON 转换为数组
    const tagArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
    // 如果没有博客数据，返回 null

    return (
        <>
            <div className={`relative w-full ${aspect || 'aspect-[4/3]'} group overflow-hidden`}>
                <Image src={imageUrl} alt={name} fill className='object-cover ' />
            </div>
            <div className={`flex flex-col gap-3 ${justify}`}>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-bold'>{name}</h2>
                    <Link href={link}>
                        <ExternalLink className='h-6 w-6 text-neutral hover:scale-110 transition duration-300' />
                    </Link>
                </div>
                <p>{description}</p>
                <div className='flex flex-wrap gap-2'>
                    {Array.isArray(tagArray) &&
                        tagArray.map((tag, index) => {
                            // 按顺序选择一个 badge 类名
                            const badge = badgeList[index];

                            return (
                                <span key={index} className={`badge ${badge}`}>
                                    {tag}
                                </span>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

