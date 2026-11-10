/**
 * Live LeetCode GraphQL profile data service for sowmiyan-s
 */

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  ranking: number;
  totalSubmissions: number;
  recentSubmissions: Array<{
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
  }>;
}

export const fallbackLeetCodeStats: LeetCodeStats = {
  totalSolved: 381,
  easySolved: 221,
  mediumSolved: 135,
  hardSolved: 25,
  totalQuestions: 4101,
  ranking: 358500,
  totalSubmissions: 661,
  recentSubmissions: [
    {
      title: "Score of Parentheses",
      titleSlug: "score-of-parentheses",
      timestamp: "1791173142",
      statusDisplay: "Wrong Answer",
      lang: "python"
    },
    {
      title: "Merge Strings Alternately",
      titleSlug: "merge-strings-alternately",
      timestamp: "1790845049",
      statusDisplay: "Accepted",
      lang: "python"
    },
    {
      title: "Valid Parentheses",
      titleSlug: "valid-parentheses",
      timestamp: "1790828322",
      statusDisplay: "Accepted",
      lang: "java"
    },
    {
      title: "Smallest Index With Digit Sum Equal to Index",
      titleSlug: "smallest-index-with-digit-sum-equal-to-index",
      timestamp: "1790672497",
      statusDisplay: "Accepted",
      lang: "python3"
    },
    {
      title: "Maximum Nesting Depth of the Parentheses",
      titleSlug: "maximum-nesting-depth-of-the-parentheses",
      timestamp: "1790669344",
      statusDisplay: "Accepted",
      lang: "python3"
    }
  ]
};

let cachedStats: LeetCodeStats | null = null;
let pendingPromise: Promise<LeetCodeStats> | null = null;

export async function fetchLeetCodeStats(forceRefresh = false): Promise<LeetCodeStats> {
  if (!forceRefresh && cachedStats) {
    return cachedStats;
  }

  if (!forceRefresh && pendingPromise) {
    return pendingPromise;
  }

  pendingPromise = (async () => {
    // 1. Try fast and reliable Vercel proxy first (sub-200ms latency)
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2500);
      const res = await fetch('https://leetcode-api-faisalshohag.vercel.app/sowmiyan-s', {
        signal: controller.signal
      });
      clearTimeout(id);

      if (res.ok) {
        const data = await res.json();
        if (typeof data.totalSolved === 'number') {
          cachedStats = {
            totalSolved: data.totalSolved,
            easySolved: data.easySolved ?? 221,
            mediumSolved: data.mediumSolved ?? 135,
            hardSolved: data.hardSolved ?? 25,
            totalQuestions: data.totalQuestions ?? 4101,
            ranking: data.ranking ?? 359532,
            totalSubmissions: data.totalSubmissions?.[0]?.submissions ?? 661,
            recentSubmissions: Array.isArray(data.recentSubmissions) ? data.recentSubmissions.slice(0, 5) : fallbackLeetCodeStats.recentSubmissions
          };
          return cachedStats;
        }
      }
    } catch {
      // Try secondary endpoint
    }

    // 2. Secondary fallback: alfa-leetcode-api
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 1500);
      const res = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/sowmiyan-s', {
        signal: controller.signal
      });
      clearTimeout(id);

      if (res.ok) {
        const data = await res.json();
        if (typeof data.totalSolved === 'number') {
          cachedStats = {
            totalSolved: data.totalSolved,
            easySolved: data.easySolved ?? 221,
            mediumSolved: data.mediumSolved ?? 135,
            hardSolved: data.hardSolved ?? 25,
            totalQuestions: data.totalQuestions ?? 4101,
            ranking: data.ranking ?? 359532,
            totalSubmissions: data.totalSubmissions?.[0]?.submissions ?? 661,
            recentSubmissions: Array.isArray(data.recentSubmissions) ? data.recentSubmissions.slice(0, 5) : fallbackLeetCodeStats.recentSubmissions
          };
          return cachedStats;
        }
      }
    } catch {
      // Fall through to deterministic static fallback
    } finally {
      pendingPromise = null;
    }

    cachedStats = fallbackLeetCodeStats;
    return fallbackLeetCodeStats;
  })();

  return pendingPromise;
}

