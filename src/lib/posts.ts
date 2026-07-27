import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), 'content', 'writing');

const readPost = (slug: string): Post => {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data['title']),
    date: String(data['date']),
    content,
  };
};

export const getAllSlugs = (): string[] =>
  fs
    .readdirSync(POSTS_DIR)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));

export const getAllPosts = (): Post[] =>
  getAllSlugs()
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPostBySlug = (slug: string): Post | null => {
  try {
    return readPost(slug);
  } catch {
    return null;
  }
};
