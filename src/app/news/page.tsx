import React from 'react';
import { Playfair_Display, PT_Serif } from 'next/font/google';
import { getAllNews, NewsItem } from 'src/lib/news';
import '../../styles/news.css';

const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['700'] });
const ptSerif = PT_Serif({ subsets: ['latin'], weight: ['400', '700'] });

export const revalidate = 3600;

const formatDate = (publishedAt: string | null) => {
  if (publishedAt === null) return '';
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10).replace(/-/g, '');
};

const formatFooterDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const NewsCard = ({ item }: { item: NewsItem }) => (
  <article className="news-card">
    <a className="news-card__title" href={item.link} target="_blank" rel="noopener noreferrer">
      {item.title}
    </a>
    <div className="news-card__meta">
      <span className="news-card__byline">
        {item.source}
        {' · '}
        {item.category}
      </span>
      <span className="news-card__date">{formatDate(item.publishedAt)}</span>
    </div>
    {item.summary && <p className="news-card__summary">{item.summary}</p>}
  </article>
);

const NewsPage = async () => {
  const items = await getAllNews();

  return (
    <div className={`news ${ptSerif.className}`}>
      <main className="news__inner">
        <header className="news-masthead">
          <h1 className={`news-masthead__title ${playfairDisplay.className}`}>Dev Dispatch</h1>
        </header>
        <div className="news-grid">
          {items.map((item) => (
            <NewsCard item={item} key={item.link} />
          ))}
        </div>
        <footer className="news-footer">
          {formatFooterDate(new Date())} — CURATED BY HARI NARAYANAN
        </footer>
      </main>
    </div>
  );
};

export default NewsPage;
