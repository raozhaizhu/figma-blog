'use client';

import React, { useEffect, useState } from 'react';
import { blog, projects, about, newsletter } from '@/app/resource';
import Link from 'next/link';

interface NavbarProps {
    initialTheme: string;
}

export const Navbar = ({ initialTheme }: NavbarProps) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme as 'light' | 'dark');

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    return (
        <nav className='navbar container mx-auto p-0 pt-4 bg-base-100 text-base-content'>
            <div className='navbar-start'>
                {/* 移动端菜单 */}
                <div className='dropdown'>
                    <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h8m-8 6h16'
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
                    >
                        <li>
                            <p>{blog.label}</p>
                        </li>
                        <li>
                            <p>{projects.label}</p>
                            <ul className='p-2'>
                                {projects.projectList.map((project) => (
                                    <Link href={project.link} key={project.name}>
                                        <li>
                                            <p>{project.name}</p>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <p>{about.label}</p>
                        </li>
                        <li>
                            <p>{newsletter.label}</p>
                        </li>
                    </ul>
                </div>
                {/* 博客名称 */}
                <p className='btn btn-ghost text-xl'>Rzz Hub</p>
            </div>
            {/* 桌面端菜单 */}
            <div className='navbar-center hidden lg:flex'>
                <ul className='menu menu-horizontal px-1'>
                    <li>
                        <p>{blog.label}</p>
                    </li>
                    <li>
                        <details>
                            <summary>{projects.label}</summary>
                            <ul className='p-2 w-[200px]'>
                                {projects.projectList.map((project) => (
                                    <Link href={project.link} key={project.name}>
                                        <li>
                                            <p>{project.name}</p>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </details>
                    </li>
                    <li>
                        <p>{about.label}</p>
                    </li>
                    <li>
                        <p>{newsletter.label}</p>
                    </li>
                </ul>
            </div>

            <div className='navbar-end'>
                {/* 主题切换 */}
                <label className='flex cursor-pointer gap-2 mr-4'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <circle cx='12' cy='12' r='5' />
                        <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
                    </svg>
                    <input
                        type='checkbox'
                        value='synthwave'
                        className='toggle theme-controller'
                        onChange={handleThemeChange}
                        checked={theme === 'dark'}
                    />
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
                    </svg>
                </label>
                {/*登录按钮 */}
                <p className='btn'>Login</p>
            </div>
        </nav>
    );
};

