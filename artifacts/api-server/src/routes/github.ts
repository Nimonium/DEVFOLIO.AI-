import { Router, type IRouter } from "express";
import { ScanGithubBody, GetAiSuggestionsBody } from "@workspace/api-zod";

const router: IRouter = Router();

const GH_HEADERS: Record<string, string> = {
  "User-Agent": "DevFolio-AI/1.0",
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function fetchGitHub(path: string) {
  const res = await fetch(`https://api.github.com${path}`, { headers: GH_HEADERS });
  if (res.status === 404) throw Object.assign(new Error("GitHub user not found"), { status: 404 });
  if (res.status === 403) throw Object.assign(new Error("GitHub API rate limit exceeded. Please try again in a minute."), { status: 429 });
  if (!res.ok) throw Object.assign(new Error(`GitHub API error: ${res.status}`), { status: 502 });
  return res.json();
}

function computeQuality(repo: {
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  homepage: string | null;
  has_wiki: boolean;
}): number {
  let score = 40;
  if (repo.description) score += 15;
  if (repo.homepage) score += 15;
  if ((repo.topics ?? []).length > 0) score += 10;
  score += Math.min(repo.stargazers_count / 20, 15);
  score += Math.min(repo.forks_count / 10, 5);
  return Math.round(Math.min(score, 100));
}

router.post("/github/scan", async (req, res): Promise<void> => {
  const parsed = ScanGithubBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  let { username } = parsed.data;
  username = username
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/\/$/, "")
    .trim();

  req.log.info({ username }, "Scanning GitHub profile");

  try {
    const [user, rawRepos] = await Promise.all<any>([
      fetchGitHub(`/users/${username}`),
      fetchGitHub(`/users/${username}/repos?sort=stars&per_page=100&type=owner`),
    ]);

    const repos = (rawRepos as any[])
      .filter((r: any) => !r.fork)
      .map((r: any) => ({
        name: r.name as string,
        description: (r.description as string | null) ?? null,
        language: (r.language as string | null) ?? null,
        stars: r.stargazers_count as number,
        forks: r.forks_count as number,
        url: r.html_url as string,
        topics: (r.topics as string[]) ?? [],
        hasReadme: !!(r.description),
        hasDeployment: !!(r.homepage),
        quality: computeQuality(r),
      }))
      .sort((a: any, b: any) => b.stars - a.stars);

    const topLanguages: string[] = [];
    const langCount: Record<string, number> = {};
    for (const r of repos) {
      if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
    }
    Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .forEach(([lang]) => topLanguages.push(lang));

    const totalStars = repos.reduce((s: number, r: any) => s + r.stars, 0);
    const withReadme = repos.filter((r: any) => r.hasReadme).length;
    const withDeploy = repos.filter((r: any) => r.hasDeployment).length;
    const portfolioReadiness = Math.round(
      (user.bio ? 20 : 0) +
      (user.avatar_url ? 10 : 0) +
      (topLanguages.length > 0 ? 10 : 0) +
      Math.min((withReadme / Math.max(repos.length, 1)) * 30, 30) +
      Math.min((withDeploy / Math.max(repos.length, 1)) * 20, 20) +
      Math.min(repos.length >= 5 ? 10 : repos.length * 2, 10)
    );

    res.json({
      username: user.login,
      avatarUrl: user.avatar_url,
      bio: user.bio ?? null,
      totalRepos: user.public_repos,
      totalStars: totalStars,
      followers: user.followers,
      following: user.following,
      topLanguages,
      repositories: repos,
      contributionStreak: 0,
      portfolioReadiness,
    });
  } catch (err: any) {
    const status = err.status ?? 500;
    req.log.error({ username, err: err.message }, "GitHub scan failed");
    res.status(status).json({ error: err.message ?? "Failed to scan GitHub profile" });
  }
});

router.post("/github/suggestions", async (req, res): Promise<void> => {
  const parsed = GetAiSuggestionsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  let { username } = parsed.data;
  username = username
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/\/$/, "")
    .trim();

  req.log.info({ username }, "Generating AI suggestions for GitHub profile");

  try {
    const [user, rawRepos] = await Promise.all<any>([
      fetchGitHub(`/users/${username}`),
      fetchGitHub(`/users/${username}/repos?sort=stars&per_page=30&type=owner`),
    ]);

    const repos = (rawRepos as any[]).filter((r: any) => !r.fork);
    const suggestions: any[] = [];

    for (const r of repos.slice(0, 6)) {
      if (!r.description) {
        suggestions.push({
          type: "description",
          title: `Add a description to '${r.name}'`,
          description: `${r.name} has no repository description. GitHub descriptions appear in search results — without one, your repo is invisible to most discovery channels.`,
          priority: "high",
          project: r.name,
        });
      }
      if (!r.homepage && r.stargazers_count > 10) {
        suggestions.push({
          type: "deployment",
          title: `Deploy '${r.name}'`,
          description: `${r.name} has ${r.stargazers_count} stars but no live demo. Deployed projects appear 4x more credible to hiring managers.`,
          priority: r.stargazers_count > 50 ? "high" : "medium",
          project: r.name,
        });
      }
    }

    if (!user.bio) {
      suggestions.push({
        type: "skills",
        title: "Add a GitHub bio",
        description: "Your GitHub profile has no bio. A short bio with your key skills dramatically improves recruiter discovery.",
        priority: "high",
        project: null,
      });
    }

    const langCount: Record<string, number> = {};
    for (const r of repos) {
      if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
    }
    const strongestSkills = Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 7)
      .map(([lang]) => lang);

    const overallScore = Math.round(
      (user.bio ? 20 : 0) +
      Math.min((repos.filter((r: any) => r.description).length / Math.max(repos.length, 1)) * 40, 40) +
      Math.min((repos.filter((r: any) => r.homepage).length / Math.max(repos.length, 1)) * 40, 40)
    );

    res.json({ username: user.login, suggestions: suggestions.slice(0, 6), strongestSkills, overallScore });
  } catch (err: any) {
    const status = err.status ?? 500;
    req.log.error({ username, err: err.message }, "GitHub suggestions failed");
    res.status(status).json({ error: err.message ?? "Failed to generate suggestions" });
  }
});

export default router;
