import { blog } from '@/app/resource';

export function Header() {
    return (
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
    );
}

