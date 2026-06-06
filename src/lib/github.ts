const GITHUB_USERNAME = 'sowmiyan-s';
const API_BASE = 'https://api.github.com';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  forks_count: number;
}

export const fetchRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
        console.error(`GitHub API Error: ${response.status} ${response.statusText}`);
        if (response.status === 403) console.error("GitHub API Rate Limit Exceeded. Using empty data set.");
        throw new Error('Failed to fetch repos');
    }
    return await response.json();
  } catch (error) {
    console.error("Repos Fetch Failure:", error);
    return [];
  }
};

export const fetchReadme = async (repoName: string): Promise<string> => {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/README.md`);
    if (!response.ok) {
        // Try master if main fails
        const altResponse = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/master/README.md`);
        if (!altResponse.ok) return '# No README found for this project.';
        return await altResponse.text();
    }
    return await response.text();
  } catch (error) {
    return '# Error loading README.';
  }
};
