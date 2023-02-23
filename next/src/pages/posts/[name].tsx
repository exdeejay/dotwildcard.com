import { Page } from "@/components/Page";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import fs from 'node:fs/promises';
import path from 'node:path';
import { ReactNode } from "react";

interface PostParams {
    [key: string]: string;
    name: string;
}

interface PostProps {
    title: string;
}

export default function Post({ title }: PostProps) {
    const Component = dynamic(() => import(`@/posts/${title}.mdx`));
    return (
        <Page title={title}>
            <Component />
        </Page>
    )
}

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({ params }) => {
    return {
        props: {
            title: params!.name
        }
    };
}

export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
    let fpath = path.join(process.cwd(), 'src/posts');
    return {
        paths: (await fs.readdir(fpath)).filter(name => name.endsWith('.mdx')).map(name => ({
            params: {
                name: name.replace('.mdx', '')
            }
        })),
        fallback: false,
    }
}
