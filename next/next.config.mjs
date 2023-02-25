import rehypePrism from '@mapbox/rehype-prism';
import nextMdx from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { matter } from 'vfile-matter';
import remarkMdxDefaultLayout from './src/util/remarkMdxDefaultLayout.mjs';

const withMdx = nextMdx({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, () => (_, file) => {
      matter(file)
    }, remarkMdxDefaultLayout],
    rehypePlugins: [rehypePrism],
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
};

export default withMdx(nextConfig);
