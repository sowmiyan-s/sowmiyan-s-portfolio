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

export interface FeaturedProject {
  id: number;
  repo_name: string;
  position: number;
}

export interface Certificate {
  name: string;
  image: string;
}

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  description: string;
  author: string;
  categories: string[];
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}
