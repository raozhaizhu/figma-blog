import { Header } from '@/app/ui/Header';
import { contact } from '../resource';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';

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

export function Contact() {
    return (
        <div className='flex-1 card bg-base-100 w-96 mx-auto p-6'>
            <div className='form-control mb-3'>
                <label className='label'>
                    <span className='label-text'>Name</span>
                </label>
                <input type='text' placeholder='Your name' className='input input-bordered' />
            </div>
            <div className='form-control mb-3'>
                <label className='label'>
                    <span className='label-text'>Email</span>
                </label>
                <input type='email' placeholder='Your email' className='input input-bordered' />
            </div>
            <div className='form-control mb-4'>
                <label className='label'>
                    <span className='label-text'>Message</span>
                </label>
                <textarea className='textarea textarea-bordered' placeholder='Your message'></textarea>
            </div>
            <button className='btn btn-neutral w-full'>Send Message</button>
        </div>
    );
}

