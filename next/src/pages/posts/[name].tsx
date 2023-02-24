import { Page } from '@/components/Page';
import { listPosts, PostFrontmatter, readPost } from '@/util/post';
import { GetStaticPaths, GetStaticProps } from 'next';

interface PostParams {
  [key: string]: string;
  name: string;
}

export interface PostProps {
  source: string;
  frontmatter: PostFrontmatter;
}

export default function Post({ source, frontmatter }: PostProps) {
  return <Page title={frontmatter.title} dangerouslySetInnerHtml={source}>

  </Page>;
}

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({
  params,
}) => {
  const { source, frontmatter } = await readPost(`${params!.name}.md`);

  return {
    props: {
      source,
      frontmatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
  const posts = await listPosts();
  return {
    paths: await Promise.all(posts.map(async (name) => {
      const { frontmatter } = await readPost(name);
      return {
        params: {
          name: frontmatter.slug ?? name.slice(0, name.lastIndexOf('.')),
        },
      };
    })),
    fallback: false,
  };
};
