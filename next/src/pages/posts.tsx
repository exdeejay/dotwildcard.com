import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GetStaticProps } from "next";
import { serialize } from 'next-mdx-remote/serialize';
import Link from "next/link";
import fs from 'node:fs/promises';
import path from 'node:path';
import { PostFrontmatter } from "./posts/[name]";

interface PostsProps {
    posts: PostFrontmatter[];
}

export default function Posts({ posts }: PostsProps) {
    return <>
        <Header title={'posts'} />
        <ul className="grow w-full md:w-[theme(screens.md)] mx-auto">
            {posts.map(post => (
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                    <li className="bg-primary-800 p-8 my-8">
                        <h2 className="text-2xl text-primary-300 font-bold font-mono mb-2">{post.title}</h2>
                        <h3>{post.publish}</h3>
                        <p className="text-zinc-200">{post.description}</p>
                    </li>
                </Link>
            ))}
        </ul>
        <Footer />
    </>;
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
    let postFiles = (await fs.readdir(path.join(process.cwd(), 'src/posts'))).filter(name => name.endsWith('.mdx'));
    return {
        props: {
            posts: await Promise.all(postFiles.map(async name => {
                const source = await serialize(
                    await fs.readFile(
                        path.join(process.cwd(), 'src/posts', name),
                        'utf-8'
                    ),
                    {
                        parseFrontmatter: true,
                    }
                );
                const frontmatter = source.frontmatter! as Record<string, string | Date>;
                
                return {
                    ...frontmatter,
                    slug: frontmatter.slug ?? name.replace('.mdx', ''),
                    publish: frontmatter.publish?.toDateString() ?? '',
                } as PostFrontmatter;
            }))
        }
    }
}