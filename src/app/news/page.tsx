import React from 'react';
import { Playfair_Display, PT_Serif } from 'next/font/google';
import NewsBrowser from 'src/components/NewsBrowser';
import { getAllNews } from 'src/lib/news';
import '../../styles/news.css';

const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['700'] });
const ptSerif = PT_Serif({ subsets: ['latin'], weight: ['400', '700'] });

export const revalidate = 3600;

const formatFooterDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const NewsPage = async () => {
  const items = await getAllNews();

  return (
    <div className={`news ${ptSerif.className}`}>
      <main className="news__inner">
        <header className="news-masthead">
          <h1 className={`news-masthead__title ${playfairDisplay.className}`}>Dev Dispatch</h1>
        </header>
        <NewsBrowser items={items} />
        <footer className="news-footer">
          {formatFooterDate(new Date())} — CURATED BY HARI NARAYANAN
        </footer>
      </main>
    </div>
  );
};

export default NewsPage;
