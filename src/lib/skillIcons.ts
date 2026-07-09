/**
 * Map of skill name (lowercased) -> Simple Icons CDN slug.
 * Uses https://cdn.simpleicons.org which serves official brand SVGs.
 */
const map: Record<string, string> = {
  // languages
  python: "python",
  java: "openjdk",
  "java script": "javascript",
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  html: "html5",
  "html5": "html5",
  css: "css3",
  "css3": "css3",
  sql: "mysql",

  // AI / ML
  ai: "openai",
  llm: "openai",
  llms: "openai",
  rag: "openai",
  openai: "openai",
  "fine-tune": "huggingface",
  langchain: "langchain",
  langflow: "langchain",
  crewai: "openai",
  mcp: "anthropic",
  "hugging face": "huggingface",
  huggingface: "huggingface",
  tensorflow: "tensorflow",
  pytorch: "pytorch",
  claude: "anthropic",
  ollama: "ollama",

  // web
  react: "react",
  "react.js": "react",
  reactjs: "react",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  node: "nodedotjs",
  "node js": "nodedotjs",
  vite: "vite",
  "tailwind": "tailwindcss",
  "tailwind css": "tailwindcss",
  tailwindcss: "tailwindcss",
  bootstrap: "bootstrap",
  bootstraps: "bootstrap",

  // data
  mongodb: "mongodb",
  "mongo db": "mongodb",
  mongo: "mongodb",
  mysql: "mysql",
  pandas: "pandas",
  "power bi": "powerbi",

  // cloud / infra
  aws: "amazonwebservices",
  "amazon(aws)": "amazonwebservices",
  amazon: "amazonwebservices",
  vercel: "vercel",
  netlify: "netlify",
  docker: "docker",
  linux: "linux",

  // tools
  vscode: "visualstudiocode",
  "vs code": "visualstudiocode",
  figma: "figma",
  gigma: "figma",
  canva: "canva",
  git: "git",
  github: "github",
  n8n: "n8n",
};

export function getSkillIconUrl(name: string): string | null {
  const key = name.trim().toLowerCase();
  const slug = map[key] ?? map[key.replace(/[._-]/g, " ")];
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}
