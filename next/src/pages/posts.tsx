import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { listPosts, PostFrontmatter, readPost } from "@/util/post";
import { GetStaticProps } from "next";
import Link from "next/link";

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
                        <h2 className="text-2xl text-primary-300 font-bold font-mono tracking-tight">{post.title}</h2>
                        <h3 className="text-teal-700 font-mono mb-2 tracking-tight">{post.publish}</h3>
                        <p className="text-zinc-200">{post.description}</p>
                    </li>
                </Link>
            ))}
        </ul>
        <Footer />
    </>;
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
    let postFiles = await listPosts();
    return {
        props: {
            posts: await Promise.all(postFiles.map(async name => {
                const { frontmatter } = await readPost(name);
                return {
                    ...frontmatter,
                    slug: frontmatter.slug ?? name.replace('.md', '')
                };
            }))
        }
    }
}