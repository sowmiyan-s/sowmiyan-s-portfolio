// Edge function: manage site upvotes. One vote per voter_id (client-generated uuid stored in a cookie).
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const isUuid = (s: unknown): s is string =>
  typeof s === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function getState(voterId?: string) {
  const { count } = await supabase
    .from("site_votes")
    .select("*", { count: "exact", head: true });
  let hasVoted = false;
  if (voterId) {
    const { data } = await supabase.from("site_votes").select("voter_id").eq("voter_id", voterId).maybeSingle();
    hasVoted = !!data;
  }
  return { count: count ?? 0, hasVoted };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);

    if (req.method === "GET") {
      const voterId = url.searchParams.get("voter_id") ?? undefined;
      if (voterId && !isUuid(voterId)) return json({ error: "invalid voter_id" }, 400);
      return json(await getState(voterId));
    }

    const body = await req.json().catch(() => ({}));
    const voterId = body?.voter_id;
    if (!isUuid(voterId)) return json({ error: "invalid voter_id" }, 400);

    if (req.method === "POST") {
      await supabase.from("site_votes").upsert({ voter_id: voterId }, { onConflict: "voter_id" });
      return json(await getState(voterId));
    }
    if (req.method === "DELETE") {
      await supabase.from("site_votes").delete().eq("voter_id", voterId);
      return json(await getState(voterId));
    }
    return json({ error: "method not allowed" }, 405);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
