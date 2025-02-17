import { Header } from '@/app/ui/Header';
import { projects } from '@/app/resource';
import { ProjectCard } from '../ui/ProjectCard';
import Link from 'next/link';

export default function Page() {
    return (
        <main className='container mx-auto mb-4 xl:mb-8'>
            <Header title={projects.title} />
            <div className='grid md:grid-cols-2 gap-4 mb-4 xl:mb-8'>
                <div className='flex flex-col gap-4'>
                    <ProjectCard theProject={projects.projectList[0]} aspect={`aspect-[16/9]`} />
                </div>
                <div className='flex flex-col gap-4'>
                    <ProjectCard theProject={projects.projectList[1]} aspect={`aspect-[16/9]`} />
                </div>
            </div>

            <div className='relative group mb-4 xl:mb-8'>
                <div className='absolute z-10 inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-500'></div>
                <div className='flex flex-col gap-4 justify-center items-center absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500 text-white'>
                    <h2 className='text-3xl font-bold'>{projects.projectList[2].name}</h2>
                    <p>{projects.projectList[2].description}</p>
                    <Link href={projects.projectList[2].link}>
                        <button className='btn btn-neutral'>View More</button>
                    </Link>
                </div>
                <video
                    src='/video/video-01.mp4'
                    autoPlay
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                ></video>
            </div>
            <div className='divider'></div>
        </main>
    );
}

