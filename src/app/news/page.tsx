import React from 'react';
import { getNewsByCategory, NewsCategory, NewsItem } from 'src/lib/news';
import '../../styles/news.css';

export const revalidate = 3600;

const CATEGORIES: NewsCategory[] = ['General Tech', 'AI', 'Software Engineering'];

const formatDate = (publishedAt: string | null) => {
  if (publishedAt === null) return '';
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10).replace(/-/g, '');
};

const NewsList = ({ items }: { items: NewsItem[] }) => (
  <ul className="news-list">
    {items.map((item) => (
      <li className="news-item" key={item.link}>
        <a className="news-item__link" href={item.link} target="_blank" rel="noopener noreferrer">
          <span className="news-item__title">{item.title}</span>
          <span className="news-item__rule" />
          <span className="news-item__meta">
            {item.source}
            {formatDate(item.publishedAt) && ` · ${formatDate(item.publishedAt)}`}
          </span>
        </a>
      </li>
    ))}
  </ul>
);

const NewsPage = async () => {
  const newsByCategory = await getNewsByCategory();

  return (
    <div className="news">
      <main className="news__inner">
        {CATEGORIES.map((category) => {
          const items = newsByCategory[category];
          if (items.length === 0) return null;

          return (
            <section className="news-section" key={category}>
              <h2 className="news-section__heading">{category}</h2>
              <NewsList items={items} />
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default NewsPage;
