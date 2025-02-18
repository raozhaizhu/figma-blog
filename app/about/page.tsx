import { about } from '../resource';
import { Header } from '@/app/ui/Header';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { HeroContact } from '@/app/ui/HeroContact';

// 定义需要在 MDX 中使用的组件
const components = {
    Image: (props: any) => (
        <div className='w-full mb-8'>
            <Image {...props} className='w-full h-auto' />
        </div>
    ),
};

export default function Page() {
    const filePath = path.join(process.cwd(), 'app/about', 'about.mdx');
    const content = fs.readFileSync(filePath, 'utf8');

    return (
        <main className='container mx-auto mb-4 xl:mb-8'>
            <Header title={about.title} />
            <article className='prose max-w-none px-2 sm:px-4 xl:px-0 mb-8'>
                <MDXRemote source={content} components={components} />
            </article>
            <HeroContact />
        </main>
    );
}

