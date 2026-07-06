// Fetches the latest videos from the @bound-by-code YouTube channel via its
// public RSS feed. Runs server-side to avoid CORS and requires no API key.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const CHANNEL_ID = "UCIf9XVT_MbyZpi5v0SrvXRg"; // @bound-by-code
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
}

function extract(block: string, tag: string): string | null {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return m ? m[1].trim() : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const res = await fetch(FEED_URL, {
      headers: { "user-agent": "Mozilla/5.0 (portfolio-fetch)" },
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const xml = await res.text();

    const entries = xml.split("<entry>").slice(1);
    const videos: Video[] = entries.slice(0, 12).map((raw) => {
      const block = "<entry>" + raw;
      const id = extract(block, "yt:videoId") ?? "";
      const title = extract(block, "title") ?? "Untitled";
      const published = extract(block, "published") ?? "";
      return {
        id,
        title,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        published,
      };
    });

    return new Response(JSON.stringify({ videos }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=900",
      },
    });
  } catch (err) {
    console.error("youtube-feed error", err);
    return new Response(
      JSON.stringify({ videos: [], error: String(err) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
