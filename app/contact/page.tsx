import { Header } from '@/app/ui/Header';
import { contact } from '../resource';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import { HeroContact } from '@/app/ui/HeroContact';

export default function Page() {
    const filePath = path.join(process.cwd(), 'app/contact', 'contact.mdx');
    const content = fs.readFileSync(filePath, 'utf8');

    return (
        <main className='container mx-auto mb-4 xl:mb-8'>
            <Header title={contact.title} />
            <article className='flex flex-col justify-center text-center prose max-w-none px-2 sm:px-4 xl:px-0 mb-4 xl:mb-8'>
                <MDXRemote source={content} />
            </article>
            <HeroContact />
        </main>
    );
}

