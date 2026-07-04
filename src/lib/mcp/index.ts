import { defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import listSkillsTool from "./tools/list-skills";
import getProfileTool from "./tools/get-profile";

export default defineMcp({
  name: "sowmiyan-portfolio-mcp",
  title: "Sowmiyan S Portfolio MCP",
  version: "0.1.0",
  instructions:
    "Tools to query Sowmiyan S's portfolio: profile info, GitHub projects, and skills. Use `get_profile` for identity/contact, `list_projects` for showcased work, `list_skills` for capabilities.",
  tools: [listProjectsTool, listSkillsTool, getProfileTool],
});
