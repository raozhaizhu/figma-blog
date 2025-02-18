import { Contact } from '../ui/Contact';

export function HeroContact() {
    return (
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
    );
}

