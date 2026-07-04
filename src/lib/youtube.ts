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

/**
 * Fetches the latest videos from the official @bound-by-code channel via the
 * `youtube-feed` edge function. No fallback data — returns [] on failure.
 */
export const fetchChannelVideos = async (): Promise<YouTubeVideo[]> => {
  try {
    const { data, error } = await supabase.functions.invoke("youtube-feed");
    if (error) throw error;
    return (data?.videos ?? []) as YouTubeVideo[];
  } catch (err) {
    console.error("Failed to fetch YouTube feed:", err);
    return [];
  }
};
