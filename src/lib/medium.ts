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
        const data = await response.json();
        
        if (data.status === 'ok') {
            return data.items.map((item: any) => {
                // Extract first image from content if thumbnail is missing
                const content = item.description || "";
                const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
                const extractedImg = imgMatch ? imgMatch[1] : null;

                return {
                    title: item.title,
                    pubDate: item.pubDate,
                    link: item.link,
                    guid: item.guid,
                    author: item.author,
                    thumbnail: item.thumbnail || extractedImg || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80',
                    description: item.description,
                    categories: item.categories || ['INSIGHTS']
                };
            });
        }
        return [];
    } catch (error) {
        console.error('Failed to fetch Medium posts:', error);
        return [];
    }
};
