export interface YouTubeVideo {
  title: string;
  url: string;
  thumbnail: string;
  category: string;
  duration: string;
  id?: string; // Add optional id to make visibility toggles easy
}

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

function parseISO8601Duration(durationStr: string): string {
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function getCategoryFromTitle(title: string): string {
  const uppercaseTitle = title.toUpperCase();
  if (uppercaseTitle.includes('AI') || uppercaseTitle.includes('COPILOT') || uppercaseTitle.includes('CURSOR') || uppercaseTitle.includes('ANTIGRAVITY') || uppercaseTitle.includes('GEMINI')) {
    if (uppercaseTitle.includes('IDE')) return 'AI IDE';
    return 'AI TOOLS';
  }
  if (uppercaseTitle.includes('OPEN SOURCE') || uppercaseTitle.includes('GITHUB') || uppercaseTitle.includes('GIT')) {
    return 'OPEN SOURCE';
  }
  if (uppercaseTitle.includes('TUTORIAL') || uppercaseTitle.includes('HOW TO') || uppercaseTitle.includes('GUIDE') || uppercaseTitle.includes('VIBE CODING')) {
    return 'TUTORIAL';
  }
  if (uppercaseTitle.includes('WORKFLOW') || uppercaseTitle.includes('DOCKER') || uppercaseTitle.includes('AWS') || uppercaseTitle.includes('CI/CD')) {
    return 'WORKFLOW';
  }
  return 'TECH';
}

export const fetchChannelVideos = async (channelIdOrHandle: string = 'UCIf9XVT_MbyZpi5v0SrvXRg'): Promise<YouTubeVideo[]> => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  
  if (!apiKey) {
    console.warn("VITE_YOUTUBE_API_KEY is not defined. Using local fallback YouTube videos.");
    return fallbackVideos;
  }

  try {
    const isChannelId = channelIdOrHandle.startsWith('UC') && channelIdOrHandle.length === 24;
    const queryParam = isChannelId 
      ? `id=${channelIdOrHandle}` 
      : `forHandle=${encodeURIComponent(channelIdOrHandle.startsWith('@') ? channelIdOrHandle : `@${channelIdOrHandle}`)}`;
    
    // Step 1: Fetch Channel Details to get the uploads playlist ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&${queryParam}&key=${apiKey}`
    );
    
    if (!channelRes.ok) {
      throw new Error(`YouTube API Channels request failed: ${channelRes.status} ${channelRes.statusText}`);
    }
    
    const channelData = await channelRes.json();
    const channel = channelData.items?.[0];
    
    if (!channel) {
      throw new Error(`Channel details not found for query: ${channelIdOrHandle}`);
    }
    
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      throw new Error(`Uploads playlist ID not found for channel: ${channelIdOrHandle}`);
    }

    // Step 2: Fetch recent items from the uploads playlist (fetch up to 12 videos)
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=12&key=${apiKey}`
    );
    
    if (!playlistRes.ok) {
      throw new Error(`YouTube API PlaylistItems request failed: ${playlistRes.status} ${playlistRes.statusText}`);
    }
    
    const playlistData = await playlistRes.json();
    const playlistItems = playlistData.items || [];
    
    if (playlistItems.length === 0) {
      return [];
    }

    // Extract video IDs to query their duration
    const videoIds = playlistItems.map((item: any) => item.snippet?.resourceId?.videoId).filter(Boolean);

    // Step 3: Fetch video durations from the videos endpoint
    let durationsMap: Record<string, string> = {};
    if (videoIds.length > 0) {
      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(',')}&key=${apiKey}`
      );
      if (videosRes.ok) {
        const videosData = await videosRes.json();
        const videoItems = videosData.items || [];
        videoItems.forEach((vItem: any) => {
          if (vItem.id && vItem.contentDetails?.duration) {
            durationsMap[vItem.id] = parseISO8601Duration(vItem.contentDetails.duration);
          }
        });
      }
    }

    // Step 4: Map and construct video data list
    return playlistItems.map((item: any): YouTubeVideo => {
      const videoId = item.snippet?.resourceId?.videoId;
      const title = item.snippet?.title || "Untitled Video";
      const thumbnail = item.snippet?.thumbnails?.high?.url || 
                        item.snippet?.thumbnails?.medium?.url || 
                        item.snippet?.thumbnails?.default?.url ||
                        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      
      return {
        id: videoId,
        title: title,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: thumbnail,
        category: getCategoryFromTitle(title),
        duration: durationsMap[videoId] || "WATCH"
      };
    });

  } catch (error) {
    console.error("Failed to fetch YouTube videos from API. Falling back to default list:", error);
    return fallbackVideos;
  }
};
