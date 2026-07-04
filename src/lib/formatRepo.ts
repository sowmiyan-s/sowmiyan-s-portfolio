/**
 * Convert a GitHub repo slug (e.g. "my_cool-project") into a display title
 * ("My Cool Project"). Handles snake_case, kebab-case and camelCase.
 */
export function formatRepoName(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}
