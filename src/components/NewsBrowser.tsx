'use client';

import React, { useState } from 'react';
import { NewsCategory, NewsItem } from 'src/lib/news';

const CATEGORIES: NewsCategory[] = ['General Tech', 'AI', 'Software Engineering'];

const formatDate = (publishedAt: string | null) => {
  if (publishedAt === null) return '';
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10).replace(/-/g, '');
};

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

const NewsBrowser = ({ items }: { items: NewsItem[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null);

  const visibleItems = selectedCategory === null ? items : items.filter((item) => item.category === selectedCategory);

  return (
    <>
      <div className="news-tags">
        <button
          type="button"
          className={`news-tag${selectedCategory === null ? ' news-tag--active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {CATEGORIES.map((category) => (
          <button
            type="button"
            className={`news-tag${selectedCategory === category ? ' news-tag--active' : ''}`}
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="news-grid">
        {visibleItems.map((item) => (
          <NewsCard item={item} key={item.link} />
        ))}
      </div>
    </>
  );
};

export default NewsBrowser;
