const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = withMDX(nextConfig);

module.exports = {
    async redirects() {
        return [
            {
                source: '/blog',
                destination: '/',
                permanent: true, // 301永久重定向
            },
        ];
    },
};

