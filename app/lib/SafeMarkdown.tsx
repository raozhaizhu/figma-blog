import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSanitize from 'rehype-sanitize';

// 定义允许的安全标签和属性
const allowedSchema = {
    tagNames: [
        'p',
        'strong',
        'em',
        'ul',
        'ol',
        'li',
        'img',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'code',
        'pre',
    ],
    attributes: {
        img: ['src', 'alt', 'title', 'width', 'height'],
        code: ['className'],
    },
};

type Props = { content: string };

const SafeMarkdown = ({ content }: Props) => {
    return (
        <div className='prose prose-lg max-w-none break-words '>
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[[rehypeSanitize, allowedSchema]]}>
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default SafeMarkdown;

