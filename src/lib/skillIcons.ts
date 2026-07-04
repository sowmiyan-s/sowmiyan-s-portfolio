/**
 * Map of skill name (lowercased) -> Simple Icons CDN slug.
 * Uses https://cdn.simpleicons.org which serves official brand SVGs.
 */
const map: Record<string, string> = {
  // languages
  python: "python",
  java: "openjdk",
  sql: "mysql",
  javascript: "javascript",
  typescript: "typescript",
  // AI/ML
  llms: "openai",
  llm: "openai",
  rag: "openai",
  "fine-tune": "huggingface",
  langchain: "langchain",
  crewai: "openai",
  mcp: "anthropic",
  "hugging face": "huggingface",
  huggingface: "huggingface",
  tensorflow: "tensorflow",
  pytorch: "pytorch",
  // web
  react: "react",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  // data
  mongodb: "mongodb",
  mysql: "mysql",
  pandas: "pandas",
  // cloud / infra
  aws: "amazonwebservices",
  vercel: "vercel",
  netlify: "netlify",
  docker: "docker",
  linux: "linux",
  "tailwind css": "tailwindcss",
  vite: "vite",
  vscode: "visualstudiocode",
  claude: "anthropic",
  figma: "figma",
  gigma: "figma",
  canva: "canva",
  // tools
  git: "git",
  github: "github",
  ollama: "ollama",
  n8n: "n8n",
  "power bi": "powerbi",
};

export function getSkillIconUrl(name: string): string | null {
  const slug = map[name.trim().toLowerCase()];
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}
