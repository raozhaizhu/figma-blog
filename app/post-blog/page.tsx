"use client";
import { useState, FormEvent, useRef, KeyboardEvent, ChangeEvent } from "react";
import clsx from "clsx";
import { generateSlug } from "@/app/lib/utils";
import { BlogContent } from "@/app/ui/BlogContent";

export default function PostBlogPage() {
    const [editor, setEditor] = useState(true);
    const [tags, setTags] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const tagInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    const handleGenerateSlug = () => {
        setSlug(generateSlug(title));
    };

    const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 防止表单提交
            if (tagInputRef.current) {
                const newTag = tagInputRef.current.value.trim();
                if (newTag && !tags.includes(newTag)) {
                    setTags((prev) => [...prev, newTag]);
                    tagInputRef.current.value = "";
                }
            }
        }
    };

    const removeTag = (tag: string) => {
        setTags((prev) => prev.filter((t) => t !== tag));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result && typeof e.target.result === "string") {
                    setImageUrl(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="divider"></div>
            </div>
            <main className="container mx-auto flex gap-8">
                <section className="w-full xl:basis-1/2 xl:shrink-0 flex flex-col gap-4">
                    <h1 className="text-center text-2xl font-bold">
                        Enjoy instant as-you-type previews!
                    </h1>
                    <div className="flex justify-end ">
                        <button
                            className={clsx("btn btn-sm ", {
                                "btn-primary": editor,
                                "btn-ghost": !editor,
                            })}
                            onClick={() => setEditor((prev) => !prev)}
                        >
                            Editor
                        </button>
                        <button
                            className={clsx("btn btn-sm ", {
                                "btn-primary": !editor,
                                "btn-ghost": editor,
                            })}
                            onClick={() => setEditor((prev) => !prev)}
                        >
                            Preview
                        </button>
                    </div>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        {/* Title Input */}
                        <label className="form-control w-full flex flex-col gap-2">
                            <div>
                                <span className="text-lg">Title</span>
                            </div>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Type your title here"
                                className="input input-bordered input-lg w-full "
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>

                        {/* Slug Input */}
                        <label className="form-control w-full flex flex-col gap-2">
                            <div>
                                <span className="text-lg">Slug</span>
                            </div>
                            <label className="input input-bordered input-lg w-full flex items-center gap-2">
                                <input
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    className="grow"
                                    placeholder="Type your slug or automatically generate one"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                                <button
                                    className="btn btn-ghost"
                                    type="button"
                                    onClick={handleGenerateSlug}
                                >
                                    Generate
                                </button>
                            </label>
                        </label>

                        {/* Tags Input */}
                        <label className="form-control w-full flex flex-col gap-2">
                            <div>
                                <span className="text-lg">Labels</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <div
                                        className="badge badge-lg badge-neutral flex items-center gap-2"
                                        key={tag}
                                    >
                                        {tag}
                                        <button
                                            className="btn btn-xs btn-circle btn-ghost"
                                            onClick={() => removeTag(tag)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <input
                                id="tags"
                                name="tags"
                                type="text"
                                placeholder="Type your tag and press Enter to generate tags"
                                className="input input-bordered input-lg w-full "
                                onKeyDown={handleTagKeyDown}
                                ref={tagInputRef}
                            />
                        </label>
                        {/* Image Input */}
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered file-input-lg w-full "
                            onChange={handleImageUpload}
                        />
                        {/* Content Input */}
                        <label className="form-control w-full flex flex-col gap-2">
                            <div>
                                <span className="text-lg">Content</span>
                            </div>
                            <textarea
                                id="content"
                                name="content"
                                placeholder="Bio"
                                className="textarea textarea-bordered textarea-lg w-full min-h-[50vh]"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </label>
                    </form>
                </section>
                <section className="flex flex-col gap-4 xl:gap-8 min-h-screen xl:basis-1/2 px-2 sm:px-4 xl:px-0">
                    <BlogContent
                        title={title}
                        content={content}
                        tags={tags}
                        createdAt={new Date()}
                        imageUrl={imageUrl}
                    />
                </section>
            </main>
        </>
    );
}
