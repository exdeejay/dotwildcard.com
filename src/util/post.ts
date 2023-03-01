import fs from 'node:fs/promises';
import path from 'node:path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { matter } from 'vfile-matter';

export interface PostFrontmatter {
  title: string;
  slug?: string;
  date?: string;
  description: string;
  draft: boolean;
}

const EXTENSIONS = ['.md', '.mdx'];

export async function listPosts(): Promise<string[]> {
  return (await fs.readdir(path.join(process.cwd(), 'src/pages/posts'))).filter(
    (name) => EXTENSIONS.some((ext) => name.endsWith(ext))
  );
}

export async function readPostFrontmatter(name: string): Promise<PostFrontmatter> {
  const source = await fs.readFile(path.join(process.cwd(), 'src/pages/posts', name));
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => {
      return (_, file) => {
        matter(file);
      }
    })
    .use(remarkStringify).process(source);
  return file.data.matter as PostFrontmatter;
}
