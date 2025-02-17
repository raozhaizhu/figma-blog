// 将参数定义修改为对象解构的形式
export function Header({ title }: { title: string }) {
    return (
        <header className='w-full mb-8'>
            <div className='divider'></div>
            <h1>
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
                        {title}
                    </text>
                </svg>
            </h1>
            <div className='divider'></div>
        </header>
    );
}

