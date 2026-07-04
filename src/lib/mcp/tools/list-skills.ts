import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export default defineTool({
  name: "list_skills",
  title: "List Skills",
  description: "List Sowmiyan's technical and soft skills as shown on the portfolio.",
  inputSchema: {
    category: z.enum(["tech", "non-tech", "all"]).optional().describe("Filter by category. Default 'all'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category }) => {
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
      );
      let query = supabase.from("skills").select("name, category");
      if (category && category !== "all") query = query.eq("category", category);
      const { data, error } = await query;
      if (error) return { content: [{ type: "text", text: error.message }], isError: true };
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        structuredContent: { skills: data ?? [] },
      };
    } catch (e) {
      return { content: [{ type: "text", text: `Error: ${(e as Error).message}` }], isError: true };
    }
  },
});
