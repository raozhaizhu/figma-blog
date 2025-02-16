import type { Metadata } from 'next';
import './global.scss';
import { inter } from './ui/fonts';
import { Navbar } from './ui/Navbar';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialTheme = 'light'; // 你也可以从 localStorage 获取

    return (
        <html lang='en' data-theme={initialTheme}>
            <body className={`${inter.className} antialiased text-base-content bg-base-100`}>
                <Navbar initialTheme={initialTheme} />
                {children}
            </body>
        </html>
    );
}

