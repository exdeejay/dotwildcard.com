import { Page } from "@/components/Page";
import { GetStaticPaths, GetStaticProps } from "next";
import fs from 'node:fs/promises';
import path from 'node:path';

interface PostParams {
    [key: string]: string;
    name: string;
}

interface PostProps {
    title: string;
    contents: string;
}

export default function Post({ title, contents }: PostProps) {
    return (
        <Page title={title}>
            {contents}
        </Page>
    )
}

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({ params }) => {
    
    return {
        props: {
            title: params!.name,
            contents: await fs.readFile(path.join(process.cwd(), 'src/posts', `${params!.name}.mdx`), 'utf-8')
        }
    };
}

export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
    let fpath = path.join(process.cwd(), 'src/posts');
    return {
        paths: (await fs.readdir(fpath)).map(name => ({
            params: {
                name: name.replace('.mdx', '')
            }
        })),
        fallback: false,
    }
}
