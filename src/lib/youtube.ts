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
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

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
      return {
        id,
        title,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        published,
      };
    })
    .filter((video) => Boolean(video.id));
}

async function fetchYouTubeFeedViaProxy(): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(RSS_URL)}`);
    if (!response.ok) throw new Error(`Proxy fetch failed: ${response.status}`);
    const xml = await response.text();
    return parseYouTubeFeedXml(xml);
  } catch (err) {
    console.error("YouTube proxy fetch failed:", err);
    return [];
  }
}

/**
 * Fetches the latest videos from the official @bound-by-code channel.
 * Tries the Supabase edge function first, then falls back to a direct RSS proxy.
 */
export const fetchChannelVideos = async (): Promise<YouTubeVideo[]> => {
  try {
    const { data, error } = await supabase.functions.invoke("youtube-feed");
    if (error) throw error;
    const videos = (data?.videos ?? []) as YouTubeVideo[];
    if (videos.length > 0) return videos;
    console.warn("Supabase response contained no videos, falling back to direct RSS feed.");
  } catch (err) {
    console.warn("Supabase youtube-feed invocation failed, using RSS proxy fallback:", err);
  }

  return fetchYouTubeFeedViaProxy();
};
