export interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  categories: string[];
}

export const fetchMediumPosts = async (): Promise<MediumPost[]> => {
  try {
    const username = '@sowmiyan_s_';
    const rssUrl = `https://medium.com/feed/${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    const response = await fetch(apiUrl);
    if (!response.ok) return [];

    const data = await response.json();

    if (data.status === 'ok' && Array.isArray(data.items)) {
      return data.items.map((item: any, idx: number) => {
        const rawContent = item.description || item.content || '';

        // Extract first valid content image (ignoring Medium's 1x1 tracking pixel)
        const imgMatches = [...rawContent.matchAll(/<img[^>]+src="([^">]+)"/g)];
        const validImg = imgMatches.find((m) => !m[1].includes('stat?event=') && !m[1].includes('/1*1.png'));
        const thumbnail = item.thumbnail || (validImg ? validImg[1] : '') || '/og-image.png';

        // Strip HTML tags and clean up whitespace & entities
        const cleanDescription = rawContent
          .replace(/<[^>]*>/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 160) + (rawContent.length > 160 ? '...' : '');

        // Format publication date into human-readable e.g. "Sep 16, 2026"
        let formattedDate = item.pubDate;
        try {
          const dt = new Date(item.pubDate.replace(' ', 'T'));
          if (!isNaN(dt.getTime())) {
            formattedDate = dt.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
          }
        } catch {
          // Keep raw date if parsing fails
        }

        // Clean category labels
        const cleanCategories = (item.categories || ['TECH'])
          .slice(0, 2)
          .map((cat: string) => cat.replace(/-/g, ' ').toUpperCase());

        return {
          title: item.title,
          pubDate: formattedDate,
          link: item.link,
          guid: item.guid || `post-${idx}`,
          author: item.author || 'Sowmiyan S',
          thumbnail,
          description: cleanDescription,
          categories: cleanCategories,
        };
      });
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch Medium posts:', error);
    return [];
  }
};
