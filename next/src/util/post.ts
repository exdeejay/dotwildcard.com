import rehypePrism from '@mapbox/rehype-prism';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ReactNode } from 'react';
import rehypeStringify from 'rehype-stringify/lib';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { matter } from 'vfile-matter';

export interface PostFrontmatter {
  title: string;
  slug?: string;
  publish?: string;
  description: string;
}

export interface SerializedPost {
  source: string;
  frontmatter: PostFrontmatter;
}

const EXTENSIONS = ['.md'];

export async function listPosts(): Promise<string[]> {
  return (await fs.readdir(path.join(process.cwd(), 'src/posts'))).filter(
    (name) => EXTENSIONS.some((ext) => name.endsWith(ext))
  );
}

export async function readPost(name: string): Promise<SerializedPost> {
  const source = await fs.readFile(path.join(process.cwd(), 'src/posts', name));
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => {
      return (_, file) => {
        matter(file);
      }
    })
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(source);
  return {
    source: String(file),
    frontmatter: file.data.matter as PostFrontmatter,
  };
}
