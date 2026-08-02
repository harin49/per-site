import React from 'react';
import Link from 'next/link';
import FlipClock from 'src/components/FlipClock';
import { getAllPosts } from 'src/lib/posts';
import '../../styles/writing-index.css';
import '../../styles/flip-clock.css';

const formatDate = (date: string) => new Date(date).toISOString().slice(0, 10).replace(/-/g, '');

const HOVER_COLOR_VARS = [
  '--dna-curiosity-active',
  '--dna-learning-active',
  '--dna-problem-solving-active',
  '--dna-ownership-active',
  '--dna-delivery-active',
];

const WritingIndexPage = () => {
  const posts = getAllPosts();

  return (
    <div className="writing-index">
      <main className="writing-index__inner">
        <ul className="writing-index__list">
          {posts.map((post, index) => (
            <li className="writing-index-item" key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="writing-index-item__link"
                style={
                  {
                    '--writing-hover-color': `var(${HOVER_COLOR_VARS[index % HOVER_COLOR_VARS.length]})`,
                  } as React.CSSProperties
                }
              >
                <span className="writing-index-item__title">{post.title}</span>
                <span className="writing-index-item__rule" />
                <span className="writing-index-item__date">{formatDate(post.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <FlipClock />
      </main>
    </div>
  );
};

export default WritingIndexPage;
