import { Header } from '@/app/ui/Header';
import { contact } from '../resource';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import { Contact } from '../ui/Contact';

export default function Page() {
    const filePath = path.join(process.cwd(), 'app/contact', 'contact.mdx');
    const content = fs.readFileSync(filePath, 'utf8');

    return (
        <main className='container mx-auto mb-4 xl:mb-8'>
            <Header title={contact.title} />
            <article className='flex flex-col justify-center text-center prose max-w-none px-2 sm:px-4 xl:px-0 mb-4 xl:mb-8'>
                <MDXRemote source={content} />
            </article>
            <div
                className='hero min-h-[50vh]'
                style={{
                    backgroundImage: 'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
                }}
            >
                <div className='hero-overlay bg-opacity-60'></div>
                <div className='hero-content text-neutral-content text-center'>
                    <Contact />
                </div>
            </div>
        </main>
    );
}

