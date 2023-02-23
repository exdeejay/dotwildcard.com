import { Page } from "@/components/Page";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import fs from 'node:fs/promises';
import path from 'node:path';
import rehypePrism from '@mapbox/rehype-prism';


interface PostParams {
    [key: string]: string;
    name: string;
}

export interface PostFrontmatter {
    [key: string]: string | Date | undefined;
    title: string;
    slug?: string;
    publish?: string;
    description: string;
}

declare type MDXPost = MDXRemoteSerializeResult<Record<string, unknown>, PostFrontmatter>;
export interface PostProps {
    source: MDXPost;
}

export default function Post({ source }: PostProps) {
    return (
        <Page title={source.frontmatter!.title}>
            <MDXRemote {...source as MDXRemoteSerializeResult} />
        </Page>
    )
}

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({ params }) => {
    const source = await serialize(
        await fs.readFile(
            path.join(process.cwd(), 'src/posts', `${params!.name}.mdx`),
            'utf-8'
        ),
        {
            mdxOptions: {
                rehypePlugins: [rehypePrism]
            },
            parseFrontmatter: true
        }
    ) as MDXPost;
    return {
        props: {
            source
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
