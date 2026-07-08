import { supabase } from "@/integrations/supabase/client";

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published?: string;
  category?: string;
  duration?: string;
}

const CHANNEL_ID = "UCIf9XVT_MbyZpi5v0SrvXRg"; // @bound-by-code
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

// Multiple CORS proxies for resilience
const CORS_PROXIES = [
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
  "https://api.codetabs.com/v1/proxy?chrome=true&url="
];

export const fallbackVideos: YouTubeVideo[] = [
  {
    id: "R9tFkC05g_g",
    title: "Subway Surfers Desktop Open Source Project (தமிழ்)",
    url: "https://www.youtube.com/watch?v=R9tFkC05g_g",
    thumbnail: "https://img.youtube.com/vi/R9tFkC05g_g/hqdefault.jpg",
    category: "OPEN SOURCE",
    duration: "11:42"
  },
  {
    id: "vte-fDoZczE",
    title: "Cursor AI: The New Era of Coding! Say Goodbye to VS Code! [Tamil]",
    url: "https://www.youtube.com/watch?v=vte-fDoZczE",
    thumbnail: "https://img.youtube.com/vi/vte-fDoZczE/hqdefault.jpg",
    category: "AI TOOLS",
    duration: "14:15"
  },
  {
    id: "qT4Z3yN-4S4",
    title: "Google Antigravity Explained: IDE vs 2.0 vs CLI in Tamil #geminiai #vibecoding",
    url: "https://www.youtube.com/watch?v=qT4Z3yN-4S4",
    thumbnail: "https://img.youtube.com/vi/qT4Z3yN-4S4/hqdefault.jpg",
    category: "AI IDE",
    duration: "15:40"
  },
  {
    id: "L2Uf-a2eZtI",
    title: "Escape Vibe Coding Platform Restrictions — GitHub Integration || Tamil",
    url: "https://www.youtube.com/watch?v=L2Uf-a2eZtI",
    thumbnail: "https://img.youtube.com/vi/L2Uf-a2eZtI/hqdefault.jpg",
    category: "WORKFLOW",
    duration: "18:22"
  },
  {
    id: "Tw18-4U7mts",
    title: "Vibe Coding 101: Building Apps Without Coding [Tamil]",
    url: "https://www.youtube.com/watch?v=Tw18-4U7mts",
    thumbnail: "https://img.youtube.com/vi/Tw18-4U7mts/hqdefault.jpg",
    category: "TUTORIAL",
    duration: "22:05"
  }
];

function parseYouTubeFeedXml(xml: string): YouTubeVideo[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const entries = Array.from(doc.getElementsByTagName("entry")).slice(0, 12);

  return entries
    .map((entry) => {
      const ns = "http://www.youtube.com/xml/schemas/2015";
      const idNode =
        entry.getElementsByTagNameNS(ns, "videoId")[0] ??
        entry.getElementsByTagName("yt:videoId")[0];
      const id = idNode?.textContent?.trim() ?? "";
      const title = entry.querySelector("title")?.textContent?.trim() ?? "Untitled";
      const published = entry.querySelector("published")?.textContent?.trim() ?? "";
      
      // Determine category from title
      const uppercaseTitle = title.toUpperCase();
      let category = "TECH";
      if (uppercaseTitle.includes('AI') || uppercaseTitle.includes('COPILOT') || uppercaseTitle.includes('CURSOR') || uppercaseTitle.includes('ANTIGRAVITY') || uppercaseTitle.includes('GEMINI')) {
        category = uppercaseTitle.includes('IDE') ? 'AI IDE' : 'AI TOOLS';
      } else if (uppercaseTitle.includes('OPEN SOURCE') || uppercaseTitle.includes('GITHUB') || uppercaseTitle.includes('GIT')) {
        category = 'OPEN SOURCE';
      } else if (uppercaseTitle.includes('TUTORIAL') || uppercaseTitle.includes('HOW TO') || uppercaseTitle.includes('GUIDE') || uppercaseTitle.includes('VIBE CODING')) {
        category = 'TUTORIAL';
      } else if (uppercaseTitle.includes('WORKFLOW')) {
        category = 'WORKFLOW';
      }

      return {
        id,
        title,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        published,
        category,
        duration: "WATCH"
      };
    })
    .filter((video) => Boolean(video.id));
}

async function fetchYouTubeFeedViaProxy(): Promise<YouTubeVideo[]> {
  for (const proxy of CORS_PROXIES) {
    try {
      console.log(`Attempting YouTube feed fetch via proxy: ${proxy}`);
      const response = await fetch(`${proxy}${encodeURIComponent(RSS_URL)}`);
      if (!response.ok) throw new Error(`Proxy status: ${response.status}`);
      const xml = await response.text();
      const parsed = parseYouTubeFeedXml(xml);
      if (parsed.length > 0) return parsed;
    } catch (err) {
      console.warn(`Proxy fetch failed for ${proxy}:`, err);
    }
  }
  
  console.warn("All RSS proxies failed. Falling back to local default videos list.");
  return fallbackVideos;
}

/**
 * Fetches the latest videos from the official @bound-by-code channel.
 * Tries the Supabase edge function first, then falls back to direct RSS proxies, and finally to local default videos.
 */
export const fetchChannelVideos = async (): Promise<YouTubeVideo[]> => {
  try {
    const { data, error } = await supabase.functions.invoke("youtube-feed");
    if (error) throw error;
    const videos = (data?.videos ?? []) as YouTubeVideo[];
    if (videos.length > 0) return videos;
    console.warn("Supabase response contained no videos, falling back to RSS feeds.");
  } catch (err) {
    console.warn("Supabase youtube-feed invocation failed, using RSS proxies fallback:", err);
  }

  return fetchYouTubeFeedViaProxy();
};
