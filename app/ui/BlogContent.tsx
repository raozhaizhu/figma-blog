import { badgeList } from "@/app/resource";
import { HeroContact } from "@/app/ui/HeroContact";
import Image from "next/image";
import { Blog } from "../blog/[slug]/page";
import dynamic from "next/dynamic";

export const SafeMarkdown = dynamic(() => import("@/app/lib/SafeMarkdown"), {
    loading: () => <div className="animate-pulse bg-base-200 h-96" />,
});

export function BlogContent({
    title,
    imageUrl,
    createdAt,
    tags,
    content,
}: Blog) {
    const tagArray = typeof tags === "string" ? JSON.parse(tags) : tags;
    return (
        <>
            <div className={`relative aspect-[16/9] group min-h-96`}>
                <Image
                    src={imageUrl || ""}
                    alt="Example"
                    fill
                    priority
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                />
            </div>
            <article className="flex flex-col justify-center items-start prose max-w-screen">
                <p className="text-primary mr-auto">
                    {createdAt.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
                <h1 className="self-center">{title}</h1>
                <SafeMarkdown content={content} />
            </article>
            <div className="flex justify-end gap-2 my-4">
                {Array.isArray(tagArray) &&
                    tagArray.map((tag, index) => {
                        // 随机选择一个 badge 类名
                        const randomBadge = badgeList[index];

                        return (
                            <span
                                key={index}
                                className={`badge lg:badge-lg p-4 ${randomBadge}`}
                            >
                                {tag}
                            </span>
                        );
                    })}
            </div>
            <div className="mt-auto"></div>
            <HeroContact />
        </>
    );
}
