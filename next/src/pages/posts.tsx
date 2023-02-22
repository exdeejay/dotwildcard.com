import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { GetStaticProps } from "next";
import Link from "next/link";
import fs from 'node:fs/promises';
import path from 'node:path';

interface PostsProps {
    posts: [string];
}

export default function Posts({ posts }: PostsProps) {
    return <>
        <Header title={'posts'} />
        <ul className="grow w-full md:w-[theme(screens.md)] mx-auto">
            {posts.map(post => (
                <Link key={post} href={`/posts/${post}`}>
                    <li className="text-2xl bg-primary-800 p-8 my-8 text-primary-300">
                        <h2 className="font-bold font-mono">{post}</h2>
                    </li>
                </Link>
            ))}
        </ul>
        <Footer />
    </>;
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            posts: (await fs.readdir(path.join(process.cwd(), 'src/posts'))).map(name => name.replace('.mdx', ''))
        }
    }
}