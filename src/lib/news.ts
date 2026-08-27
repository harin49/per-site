import Parser from 'rss-parser';

export type NewsCategory = 'General Tech' | 'AI' | 'Software Engineering';

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  category: NewsCategory;
  publishedAt: string | null;
};

type Feed = {
  name: string;
  url: string;
  category: NewsCategory;
};

const FEEDS: Feed[] = [
  { name: 'Hacker News', url: 'https://news.ycombinator.com/rss', category: 'General Tech' },
  { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', category: 'General Tech' },
  { name: 'Simon Willison', url: 'https://simonwillison.net/atom/everything/', category: 'AI' },
  { name: 'OpenAI News', url: 'https://openai.com/news/rss.xml', category: 'AI' },
  { name: 'Martin Fowler', url: 'https://martinfowler.com/feed.atom', category: 'Software Engineering' },
  { name: 'GitHub Blog', url: 'https://github.blog/feed/', category: 'Software Engineering' },
];

const parser = new Parser();
const ITEMS_PER_FEED = 5;

const fetchFeed = async (feed: Feed): Promise<NewsItem[]> => {
  try {
    const parsed = await parser.parseURL(feed.url);
    return parsed.items.slice(0, ITEMS_PER_FEED).map((item) => ({
      title: item.title ?? feed.name,
      link: item.link ?? feed.url,
      source: feed.name,
      category: feed.category,
      publishedAt: item.isoDate ?? item.pubDate ?? null,
    }));
  } catch {
    return [];
  }
};

export const getNewsByCategory = async (): Promise<Record<NewsCategory, NewsItem[]>> => {
  const items = (await Promise.all(FEEDS.map(fetchFeed))).flat();

  const sortByDateDesc = (a: NewsItem, b: NewsItem) => {
    if (a.publishedAt === null) return 1;
    if (b.publishedAt === null) return -1;
    return a.publishedAt < b.publishedAt ? 1 : -1;
  };

  return {
    'General Tech': items.filter((item) => item.category === 'General Tech').sort(sortByDateDesc),
    AI: items.filter((item) => item.category === 'AI').sort(sortByDateDesc),
    'Software Engineering': items.filter((item) => item.category === 'Software Engineering').sort(sortByDateDesc),
  };
};
