import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getAllSlugs, getPostBySlug } from 'src/lib/posts';
import '../../../styles/post.css';

export const generateStaticParams = () => getAllSlugs().map((slug) => ({ slug }));

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  return (
    <div className="post">
      <article className="post__inner">
        <h1 className="post__title">{post.title}</h1>
        <time className="post__date">{formatDate(post.date)}</time>
        <div className="post__body">{content}</div>
      </article>
    </div>
  );
};

export default PostPage;
