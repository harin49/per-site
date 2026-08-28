import Parser from 'rss-parser';

export type NewsCategory = 'General Tech' | 'AI' | 'Software Engineering';

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  category: NewsCategory;
  publishedAt: string | null;
  summary: string | null;
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
  { name: 'ByteByteGo', url: 'https://blog.bytebytego.com/feed', category: 'Software Engineering' },
];

const parser = new Parser();
const ITEMS_PER_FEED = 5;
const SUMMARY_MAX_LENGTH = 220;

const extractSummary = (item: Parser.Item): string | null => {
  const raw = item.contentSnippet ?? item.summary ?? item.content ?? null;
  if (!raw) return null;

  const text = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return null;

  if (text.length <= SUMMARY_MAX_LENGTH) return text;
  return `${text.slice(0, SUMMARY_MAX_LENGTH).trimEnd()}…`;
};

const fetchFeed = async (feed: Feed): Promise<NewsItem[]> => {
  try {
    const parsed = await parser.parseURL(feed.url);
    return parsed.items.slice(0, ITEMS_PER_FEED).map((item) => ({
      title: item.title ?? feed.name,
      link: item.link ?? feed.url,
      source: feed.name,
      category: feed.category,
      publishedAt: item.isoDate ?? item.pubDate ?? null,
      summary: extractSummary(item),
    }));
  } catch {
    return [];
  }
};

const sortByDateDesc = (a: NewsItem, b: NewsItem) => {
  if (a.publishedAt === null) return 1;
  if (b.publishedAt === null) return -1;
  return a.publishedAt < b.publishedAt ? 1 : -1;
};

export const getAllNews = async (): Promise<NewsItem[]> => {
  const sortedItems = (await Promise.all(FEEDS.map(fetchFeed))).flat().sort(sortByDateDesc);

  const groupedItemsBySource: Record<string, NewsItem[]>= {};

  for(const item of sortedItems) {
    groupedItemsBySource[item.source]= [...(groupedItemsBySource[item.source] ?? []), item]
  }

  const roundRobinedItems: NewsItem[]=[];

  const groupedItems = Object.values(groupedItemsBySource)

  const maxLength = Math.max(...groupedItems.map(i => i.length));

  for(let round = 0; round <maxLength; round++){
    for (const group of groupedItems) {
      const nextItem = group[round];
      if (nextItem) roundRobinedItems.push(nextItem);
}
  }

  return roundRobinedItems;
};
