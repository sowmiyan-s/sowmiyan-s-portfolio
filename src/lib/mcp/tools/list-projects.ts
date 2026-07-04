import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export default defineTool({
  name: "list_projects",
  title: "List Projects",
  description: "List Sowmiyan's GitHub projects showcased on the portfolio (excludes hidden ones).",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Max number of projects to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ limit }) => {
    const max = limit ?? 20;
    try {
      const [reposRes, hiddenRes] = await Promise.all([
        fetch("https://api.github.com/users/sowmiyan-s/repos?per_page=100&sort=updated"),
        (async () => {
          const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
          );
          return supabase.from("hidden_projects").select("github_repo_id");
        })(),
      ]);
      const repos = (await reposRes.json()) as Array<{
        id: number; name: string; description: string | null; html_url: string;
        homepage: string | null; language: string | null; stargazers_count: number; updated_at: string;
      }>;
      const hiddenIds = new Set((hiddenRes.data ?? []).map((r: { github_repo_id: number }) => r.github_repo_id));
      const filtered = repos.filter(r => !hiddenIds.has(r.id)).slice(0, max).map(r => ({
        name: r.name, description: r.description, url: r.html_url, homepage: r.homepage,
        language: r.language, stars: r.stargazers_count, updated: r.updated_at,
      }));
      return {
        content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
        structuredContent: { projects: filtered },
      };
    } catch (e) {
      return { content: [{ type: "text", text: `Error: ${(e as Error).message}` }], isError: true };
    }
  },
});
