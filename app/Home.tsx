import { Blogs } from './page';
import { blog } from './resource';

export default function Home() {
    return (
        <main className='container mx-auto'>
            <header className='w-full'>
                <div className='divider'></div>

                <svg
                    className='w-full font-bold flex items-center'
                    viewBox='0 0 100 20'
                    preserveAspectRatio='xMidYMid meet'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <text
                        x='50%'
                        y='50%'
                        dominantBaseline='middle'
                        textAnchor='middle'
                        fill='currentColor'
                        textLength='100%'
                        alignmentBaseline='central'
                    >
                        {blog.title}
                    </text>
                </svg>

                <div className='divider '></div>
            </header>
            <Blogs />
        </main>
    );
}

