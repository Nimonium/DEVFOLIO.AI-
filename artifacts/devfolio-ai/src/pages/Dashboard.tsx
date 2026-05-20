import { useState, useEffect, useCallback } from "react";
import {
  Check, Settings, Eye, Code, Zap, RefreshCw, LayoutTemplate,
  Star, GitFork, Github, AlertCircle, X, ExternalLink, Copy,
  CheckCheck, Globe, ArrowUpRight, Sparkles, Download, Link2, FileText, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import type { GithubScanResult, Repository } from "@workspace/api-client-react/src/generated/api.schemas";

const THEMES = [
  { id: "cyberpunk", name: "Cyberpunk", colors: ["bg-cyan-400", "bg-fuchsia-500"], desc: "Neon gradients and dark futuristic layouts" },
  { id: "minimal", name: "Dark Minimal", colors: ["bg-gray-100", "bg-gray-600"], desc: "Clean, no-frills — code speaks louder" },
  { id: "hacker", name: "Terminal", colors: ["bg-green-500", "bg-green-900"], desc: "Green-on-black, straight from the matrix" },
  { id: "ocean", name: "Ocean", colors: ["bg-blue-400", "bg-indigo-700"], desc: "Deep blues and flowing transitions" },
];

const THEME_STYLES: Record<string, {
  bg: string; header: string; accent: string; card: string;
  text: string; muted: string; tag: string; border: string; glow: string;
}> = {
  cyberpunk: {
    bg: "bg-[#060610]",
    header: "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-400",
    accent: "text-cyan-400",
    card: "bg-white/5 border border-cyan-500/20 hover:border-cyan-400/40",
    text: "text-white",
    muted: "text-gray-400",
    tag: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    border: "border-white/10",
    glow: "shadow-[0_0_30px_rgba(0,255,255,0.15)]",
  },
  minimal: {
    bg: "bg-[#111113]",
    header: "bg-gradient-to-r from-gray-100 to-gray-400",
    accent: "text-gray-100",
    card: "bg-white/[0.04] border border-white/10 hover:border-white/20",
    text: "text-white",
    muted: "text-gray-500",
    tag: "bg-white/10 text-gray-300 border border-white/10",
    border: "border-white/10",
    glow: "",
  },
  hacker: {
    bg: "bg-[#030a03]",
    header: "bg-gradient-to-r from-green-400 to-green-600",
    accent: "text-green-400",
    card: "bg-green-950/30 border border-green-500/20 hover:border-green-400/40",
    text: "text-green-50",
    muted: "text-green-600",
    tag: "bg-green-500/10 text-green-400 border border-green-500/20",
    border: "border-green-900/50",
    glow: "shadow-[0_0_30px_rgba(0,255,0,0.08)]",
  },
  ocean: {
    bg: "bg-[#050d1a]",
    header: "bg-gradient-to-r from-blue-400 to-indigo-600",
    accent: "text-blue-400",
    card: "bg-blue-950/30 border border-blue-500/20 hover:border-blue-400/40",
    text: "text-white",
    muted: "text-blue-300/60",
    tag: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    border: "border-blue-900/40",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.1)]",
  },
};

function PortfolioPreview({
  scanResult,
  selectedRepos,
  theme,
  onClose,
}: {
  scanResult: GithubScanResult | null;
  selectedRepos: Set<string>;
  theme: string;
  onClose: () => void;
}) {
  const s = THEME_STYLES[theme] ?? THEME_STYLES.cyberpunk;
  const showcasedRepos = (scanResult?.repositories ?? []).filter(r => selectedRepos.has(r.name));
  const username = scanResult?.username ?? "developer";
  const portfolioUrl = `devfolio.ai/u/${username}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
    >
      {/* Preview chrome bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border-b border-white/10 shrink-0">
        <div className="flex gap-1.5">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-black/40 rounded-lg px-3 py-1.5 text-sm text-gray-400 border border-white/10">
            <Globe className="w-3 h-3" />
            <span className="font-mono text-xs">{portfolioUrl}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors px-2 py-1 rounded"
        >
          <X className="w-4 h-4" /> Close Preview
        </button>
      </div>

      {/* Rendered portfolio */}
      <div className={`flex-1 overflow-y-auto ${s.bg}`}>
        {/* Portfolio Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.3),transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
            <img
              src={scanResult?.avatarUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
              alt={username}
              className={`w-24 h-24 rounded-full mx-auto mb-4 border-2 ring-4 ring-offset-2 ring-offset-transparent ${s.glow}`}
              style={{ borderColor: "rgba(255,255,255,0.2)", ringColor: "rgba(255,255,255,0.1)" }}
            />
            <h1 className={`text-4xl font-bold mb-2 bg-clip-text text-transparent ${s.header}`}>
              @{username}
            </h1>
            <p className={`text-lg mb-4 max-w-xl mx-auto ${s.muted}`}>
              {scanResult?.bio ?? "Software Engineer · Open Source Contributor"}
            </p>
            <div className={`flex items-center justify-center gap-6 text-sm ${s.muted}`}>
              <span className={`font-semibold ${s.accent}`}>{scanResult?.totalRepos ?? 0}</span> repos
              <span className={`font-semibold ${s.accent}`}>{scanResult?.totalStars ?? 0}</span> stars
              <span className={`font-semibold ${s.accent}`}>{scanResult?.followers ?? 0}</span> followers
            </div>
          </div>
        </div>

        {/* Skills */}
        {(scanResult?.topLanguages?.length ?? 0) > 0 && (
          <div className={`border-y ${s.border} py-6`}>
            <div className="max-w-4xl mx-auto px-6">
              <p className={`text-xs font-mono uppercase tracking-widest mb-3 ${s.muted}`}>Top Skills</p>
              <div className="flex flex-wrap gap-2">
                {scanResult!.topLanguages.map(lang => (
                  <span key={lang} className={`px-3 py-1 rounded-full text-sm font-medium ${s.tag}`}>{lang}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className={`text-xs font-mono uppercase tracking-widest mb-6 ${s.muted}`}>
            Featured Projects ({showcasedRepos.length})
          </p>
          {showcasedRepos.length === 0 ? (
            <p className={s.muted}>No projects selected. Go back and select at least one repository.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {showcasedRepos.map(repo => (
                <div
                  key={repo.name}
                  className={`rounded-xl p-5 transition-all cursor-pointer group ${s.card} ${s.glow}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Code className={`w-4 h-4 ${s.accent}`} />
                      <h3 className={`font-bold ${s.text}`}>{repo.name}</h3>
                    </div>
                    <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${s.accent}`} />
                  </div>
                  {repo.description && (
                    <p className={`text-sm mb-4 line-clamp-2 ${s.muted}`}>{repo.description}</p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap">
                    {repo.language && (
                      <span className={`text-xs px-2 py-0.5 rounded-md ${s.tag}`}>{repo.language}</span>
                    )}
                    <span className={`text-xs flex items-center gap-1 ${s.muted}`}>
                      <Star className="w-3 h-3 text-yellow-400" /> {repo.stars}
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${s.muted}`}>
                      <GitFork className="w-3 h-3" /> {repo.forks}
                    </span>
                    {repo.hasDeployment && (
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Live
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`border-t ${s.border} py-8 text-center`}>
          <p className={`text-sm ${s.muted}`}>
            Built with <span className={s.accent}>DevFolio AI</span> · devfolio.ai/u/{username}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function PublishDialog({
  scanResult,
  selectedRepos,
  theme,
  onClose,
}: {
  scanResult: GithubScanResult | null;
  selectedRepos: Set<string>;
  theme: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"building" | "done">("building");
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const username = scanResult?.username ?? "developer";
  const portfolioUrl = `https://devfolio.ai/u/${username}`;
  const buildSteps = [
    "Analyzing selected repositories...",
    "Applying Cyberpunk theme...",
    "Generating project pages...",
    "Optimizing images...",
    "Deploying to CDN...",
    "Portfolio is live!",
  ];
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + (100 / (buildSteps.length * 8));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep("done"), 300);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) {
      const idx = Math.min(Math.floor(progress / (100 / buildSteps.length)), buildSteps.length - 1);
      setStepIdx(idx);
    }
  }, [progress]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(portfolioUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [portfolioUrl]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-md p-8 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {step === "building" ? (
            <motion.div key="building" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Generating Portfolio</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Building {selectedRepos.size} project{selectedRepos.size !== 1 ? "s" : ""} with the {THEMES.find(t => t.id === theme)?.name} theme...
              </p>

              {/* Progress bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Build log */}
              <div className="bg-black/40 rounded-xl p-4 font-mono text-xs space-y-1.5 min-h-[120px]">
                {buildSteps.slice(0, stepIdx + 1).map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-2 ${i === stepIdx ? "text-primary" : "text-gray-500"}`}
                  >
                    {i < stepIdx ? (
                      <CheckCheck className="w-3 h-3 text-green-400 shrink-0" />
                    ) : (
                      <RefreshCw className="w-3 h-3 animate-spin shrink-0" />
                    )}
                    {s}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {/* Success */}
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                <CheckCheck className="w-7 h-7 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Portfolio is Live!</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Your portfolio has been published and is accessible at:
              </p>

              {/* URL box */}
              <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl p-3 mb-6">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <span className="flex-1 font-mono text-sm text-white truncate">{portfolioUrl}</span>
                <button
                  onClick={handleCopy}
                  className="shrink-0 text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {copied ? <CheckCheck className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Projects", value: selectedRepos.size },
                  { label: "Theme", value: THEMES.find(t => t.id === theme)?.name ?? theme },
                  { label: "Readiness", value: `${scanResult?.portfolioReadiness ?? 72}%` },
                ].map(stat => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-white font-bold text-lg">{stat.value}</div>
                    <div className="text-muted-foreground text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                  onClick={() => window.open(portfolioUrl, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" /> View Portfolio
                </Button>
                <Button variant="outline" className="border-white/10" onClick={onClose}>
                  Done
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function SettingsPanel({
  scanResult,
  selectedRepos,
  selectedTheme,
}: {
  scanResult: GithubScanResult | null;
  selectedRepos: Set<string>;
  selectedTheme: string;
}) {
  const [domain, setDomain] = useState("");
  const [domainSaved, setDomainSaved] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeSaved, setResumeSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  const saveDomain = () => {
    if (!domain.trim()) return;
    setDomainSaved(true);
    setTimeout(() => setDomainSaved(false), 2500);
  };

  const saveResume = () => {
    if (!resumeUrl.trim()) return;
    setResumeSaved(true);
    setTimeout(() => setResumeSaved(false), 2500);
  };

  const exportPortfolio = () => {
    setExporting(true);
    const username = scanResult?.username ?? "developer";
    const repos = (scanResult?.repositories ?? []).filter(r => selectedRepos.has(r.name));
    const themeObj = THEMES.find(t => t.id === selectedTheme) ?? THEMES[0];

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${username} — Portfolio</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #060610; color: #e2e8f0; font-family: system-ui, sans-serif; line-height: 1.6; }
    .container { max-width: 860px; margin: 0 auto; padding: 2rem 1.5rem; }
    header { text-align: center; padding: 4rem 0 2rem; }
    header img { width: 96px; height: 96px; border-radius: 50%; border: 2px solid rgba(0,255,255,0.3); margin-bottom: 1.5rem; }
    h1 { font-size: 2.5rem; font-weight: 800; background: linear-gradient(90deg,#00ffff,#ff00cc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .bio { color: #94a3b8; margin: 0.75rem 0; font-size: 1.1rem; }
    .stats { display: flex; gap: 2rem; justify-content: center; margin: 1.5rem 0; color: #94a3b8; font-size: 0.9rem; }
    .stats strong { color: #00ffff; }
    .skills { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin: 1rem 0 3rem; }
    .skill { padding: 0.3rem 0.9rem; border-radius: 99px; border: 1px solid rgba(0,255,255,0.2); color: #00ffff; font-size: 0.85rem; }
    .projects { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px,1fr)); gap: 1.25rem; }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(0,255,255,0.15); border-radius: 1rem; padding: 1.5rem; transition: border-color 0.2s; }
    .card:hover { border-color: rgba(0,255,255,0.4); }
    .card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: #fff; }
    .card p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem; }
    .card-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: #64748b; flex-wrap: wrap; }
    .tag { background: rgba(0,255,255,0.08); color: #00ffff; border: 1px solid rgba(0,255,255,0.2); border-radius: 0.4rem; padding: 0.15rem 0.6rem; font-size: 0.78rem; }
    .live { color: #4ade80; }
    footer { text-align: center; padding: 3rem 0 1.5rem; color: #475569; font-size: 0.85rem; }
    section-title { display: block; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: #64748b; margin-bottom: 1.5rem; font-family: monospace; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <img src="${scanResult?.avatarUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}" alt="${username}" />
      <h1>@${username}</h1>
      <p class="bio">${scanResult?.bio ?? "Software Engineer · Open Source Contributor"}</p>
      <div class="stats">
        <span><strong>${scanResult?.totalRepos ?? 0}</strong> repos</span>
        <span><strong>${scanResult?.totalStars ?? 0}</strong> stars</span>
        <span><strong>${scanResult?.followers ?? 0}</strong> followers</span>
      </div>
      <div class="skills">
        ${(scanResult?.topLanguages ?? []).map(l => `<span class="skill">${l}</span>`).join("")}
      </div>
    </header>
    <span class="section-title">Featured Projects</span>
    <div class="projects">
      ${repos.map(r => `
      <div class="card">
        <h3>${r.name}</h3>
        <p>${r.description ?? "No description provided."}</p>
        <div class="card-meta">
          ${r.language ? `<span class="tag">${r.language}</span>` : ""}
          <span>⭐ ${r.stars}</span>
          <span>⑂ ${r.forks}</span>
          ${r.hasDeployment ? `<span class="live">● Live</span>` : ""}
        </div>
      </div>`).join("")}
    </div>
    <footer>
      <p>Built with <strong>DevFolio AI</strong> · ${themeObj.name} Theme</p>
    </footer>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${username}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setExporting(false), 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
      <div className="space-y-5">

        {/* Custom Domain */}
        <div className="p-5 rounded-xl border border-white/10 bg-background/50">
          <div className="flex items-center gap-2 mb-1">
            <Link2 className="w-4 h-4 text-primary" />
            <h4 className="text-white font-semibold">Custom Domain</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Connect your own domain to your published portfolio.</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              placeholder="yourdomain.com"
              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <Button
              size="sm"
              onClick={saveDomain}
              disabled={!domain.trim()}
              className={domainSaved ? "bg-green-600 hover:bg-green-600" : "bg-primary hover:bg-primary/90 text-primary-foreground"}
            >
              {domainSaved ? <><CheckCheck className="w-4 h-4 mr-1" /> Saved</> : <><Save className="w-4 h-4 mr-1" /> Save</>}
            </Button>
          </div>
          {domainSaved && <p className="text-xs text-green-400 mt-2">Domain saved. Point your DNS CNAME to <span className="font-mono">cname.devfolio.ai</span> to activate.</p>}
        </div>

        {/* Resume Integration */}
        <div className="p-5 rounded-xl border border-white/10 bg-background/50">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-accent" />
            <h4 className="text-white font-semibold">Resume Integration</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Paste your resume URL (Google Docs, PDF link) to auto-fill experience sections.</p>
          <div className="flex gap-2">
            <input
              type="url"
              value={resumeUrl}
              onChange={e => setResumeUrl(e.target.value)}
              placeholder="https://docs.google.com/..."
              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
            />
            <Button
              size="sm"
              onClick={saveResume}
              disabled={!resumeUrl.trim()}
              className={resumeSaved ? "bg-green-600 hover:bg-green-600" : "bg-accent hover:bg-accent/90 text-white"}
            >
              {resumeSaved ? <><CheckCheck className="w-4 h-4 mr-1" /> Linked</> : <><Link2 className="w-4 h-4 mr-1" /> Link</>}
            </Button>
          </div>
          {resumeSaved && <p className="text-xs text-green-400 mt-2">Resume linked. AI will use it to enhance your portfolio descriptions.</p>}
        </div>

        {/* Portfolio Export */}
        <div className="p-5 rounded-xl border border-white/10 bg-background/50">
          <div className="flex items-center gap-2 mb-1">
            <Download className="w-4 h-4 text-primary" />
            <h4 className="text-white font-semibold">Export Portfolio</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Download your portfolio as a standalone HTML file — self-host it anywhere with no dependencies.
            {selectedRepos.size === 0 && <span className="text-yellow-500"> Select at least one repository first.</span>}
          </p>
          <Button
            onClick={exportPortfolio}
            disabled={exporting || selectedRepos.size === 0}
            className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50"
          >
            {exporting
              ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
              : <><Download className="w-4 h-4 mr-2" /> Download HTML ({selectedRepos.size} project{selectedRepos.size !== 1 ? "s" : ""})</>}
          </Button>
        </div>

      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("repos");
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState<GithubScanResult | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set());
  const [selectedTheme, setSelectedTheme] = useState("cyberpunk");
  const [showPreview, setShowPreview] = useState(false);
  const [showPublish, setShowPublish] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("devfolio_scan_result");
      if (stored) {
        const parsed: GithubScanResult = JSON.parse(stored);
        setScanResult(parsed);
        const topRepos = parsed.repositories
          .sort((a, b) => b.stars - a.stars)
          .slice(0, 3)
          .map(r => r.name);
        setSelectedRepos(new Set(topRepos));
      }
    } catch {}
    const timer = setTimeout(() => setScanning(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleRepo = (name: string) => {
    setSelectedRepos(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const repos: Repository[] = scanResult?.repositories ?? [];
  const aiSuggestionCount = repos.filter(r => !r.hasReadme || !r.hasDeployment).length;

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <div className="container mx-auto px-4">

        <div className="mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono mb-4">
            {scanResult ? `LOADED: @${scanResult.username}` : "PREVIEW MODE"}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio Studio</h1>
          <p className="text-muted-foreground">
            {scanResult
              ? `${repos.length} repositories found — select which to showcase.`
              : "Configure your generated portfolio before publishing."}
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { id: "repos", icon: <Code className="w-4 h-4" />, label: "Repositories", badge: selectedRepos.size > 0 ? String(selectedRepos.size) : null, badgeColor: "bg-primary text-primary-foreground" },
              { id: "theme", icon: <LayoutTemplate className="w-4 h-4" />, label: "Theme & Styling", badge: null, badgeColor: "" },
              { id: "ai", icon: <Zap className="w-4 h-4" />, label: "AI Suggestions", badge: aiSuggestionCount > 0 ? String(aiSuggestionCount) : null, badgeColor: "bg-accent text-white" },
              { id: "settings", icon: <Settings className="w-4 h-4" />, label: "Settings", badge: null, badgeColor: "" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-primary/10 border border-primary/30 text-primary"
                    : "bg-transparent border border-transparent text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.icon}
                <span className="font-medium text-sm">{tab.label}</span>
                {tab.badge && (
                  <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${tab.badgeColor}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}

            {scanResult && (
              <div className="mt-4 p-4 rounded-xl border border-white/10 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <img src={scanResult.avatarUrl} alt={scanResult.username} className="w-10 h-10 rounded-full border border-primary/30" />
                  <div>
                    <div className="font-bold text-white text-sm">@{scanResult.username}</div>
                    <div className="text-xs text-muted-foreground">{scanResult.totalRepos} repos · {scanResult.totalStars} stars</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Portfolio Readiness</div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                    style={{ width: `${scanResult.portfolioReadiness}%` }}
                  />
                </div>
                <div className="text-right text-xs text-primary font-mono mt-1">{scanResult.portfolioReadiness}%</div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="bg-card border border-white/10 rounded-2xl p-6 min-h-[500px] relative overflow-hidden">
            {scanning && (
              <div className="absolute inset-0 z-50 bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <RefreshCw className="w-12 h-12 text-primary animate-spin" />
                <h3 className="text-xl font-bold text-white">
                  {scanResult ? `Loading @${scanResult.username}...` : "Analyzing Profile..."}
                </h3>
                <p className="text-muted-foreground font-mono text-sm">
                  {scanResult ? `Found ${repos.length} repositories` : "Evaluating repositories"}
                </p>
              </div>
            )}

            {/* Repositories Tab */}
            {activeTab === "repos" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">
                    {scanResult ? "Select Projects to Showcase" : "Selected Projects"}
                  </h2>
                  <span className="text-sm text-muted-foreground">{selectedRepos.size} selected</span>
                </div>

                {repos.length === 0 && !scanning ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Github className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">No scan results yet</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Go back to the home page and scan a GitHub username first.
                      </p>
                      <Link href="/">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          Scan a GitHub Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {repos.map(repo => {
                      const isSelected = selectedRepos.has(repo.name);
                      return (
                        <button
                          key={repo.name}
                          onClick={() => toggleRepo(repo.name)}
                          data-testid={`repo-${repo.name}`}
                          className={`w-full text-left flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-primary/5 border-primary/30 hover:border-primary/50"
                              : "bg-background/50 border-white/5 hover:border-white/20 opacity-70 hover:opacity-90"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-bold text-white">{repo.name}</span>
                              {repo.language && (
                                <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-muted-foreground shrink-0">{repo.language}</span>
                              )}
                              {repo.quality >= 90 && (
                                <span className="text-xs px-2 py-0.5 rounded-md bg-primary/20 text-primary shrink-0">Top</span>
                              )}
                            </div>
                            {repo.description && (
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{repo.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> {repo.stars}</span>
                              <span className="flex items-center gap-1"><GitFork className="w-3 h-3" /> {repo.forks}</span>
                              {!repo.hasReadme && <span className="flex items-center gap-1 text-yellow-500"><AlertCircle className="w-3 h-3" /> No README</span>}
                              {repo.hasDeployment && <span className="text-green-400">Live</span>}
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 ml-4 transition-colors ${
                            isSelected ? "bg-primary border-primary text-primary-foreground" : "border-white/20"
                          }`}>
                            {isSelected && <Check className="w-4 h-4" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === "theme" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-white mb-6">Theme Selection</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {THEMES.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      data-testid={`theme-${theme.id}`}
                      className={`p-4 rounded-xl border cursor-pointer transition-all text-left ${
                        selectedTheme === theme.id
                          ? "bg-primary/5 border-primary/50 ring-1 ring-primary"
                          : "bg-background/50 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex gap-2 mb-3">
                        {theme.colors.map((c, j) => <div key={j} className={`w-8 h-8 rounded-full ${c}`} />)}
                      </div>
                      <h4 className="font-bold text-white mb-1">{theme.name}</h4>
                      <p className="text-xs text-muted-foreground">{theme.desc}</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Select a theme then click "Live Preview" to see your portfolio.
                </p>
              </div>
            )}

            {/* AI Suggestions Tab */}
            {activeTab === "ai" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-white mb-6">AI Suggestions</h2>
                {repos.length === 0 ? (
                  <p className="text-muted-foreground">Scan a GitHub profile to get personalized suggestions.</p>
                ) : (
                  <div className="space-y-4">
                    {repos.filter(r => !r.hasReadme || !r.hasDeployment || !r.description).slice(0, 5).map((repo, i) => (
                      <div key={repo.name} className={`p-4 rounded-xl border ${i === 0 ? "border-accent/30 bg-accent/5" : "border-white/10 bg-background/50"}`}>
                        <div className="flex items-start gap-3">
                          <Zap className={`w-5 h-5 mt-0.5 shrink-0 ${i === 0 ? "text-accent" : "text-primary"}`} />
                          <div>
                            {!repo.hasReadme && (<><h4 className="font-bold text-white mb-1">Add README to '{repo.name}'</h4><p className="text-sm text-muted-foreground">This repo has no README. Projects with documentation get 3x more profile visits.</p></>)}
                            {repo.hasReadme && !repo.hasDeployment && (<><h4 className="font-bold text-white mb-1">Deploy '{repo.name}'</h4><p className="text-sm text-muted-foreground">Add a live demo link — deployed projects appear 4x more credible to hiring managers.</p></>)}
                            {repo.hasReadme && repo.hasDeployment && !repo.description && (<><h4 className="font-bold text-white mb-1">Add description to '{repo.name}'</h4><p className="text-sm text-muted-foreground">A one-line description dramatically improves searchability and first impressions.</p></>)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {repos.filter(r => !r.hasReadme || !r.hasDeployment || !r.description).length === 0 && (
                      <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/5">
                        <p className="text-green-400 font-semibold">All repositories look great!</p>
                        <p className="text-sm text-muted-foreground mt-1">No major issues detected. Your portfolio readiness is high.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <SettingsPanel scanResult={scanResult} selectedRepos={selectedRepos} selectedTheme={selectedTheme} />
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-xl border-t border-white/10 p-4 z-40">
        <div className="container mx-auto flex justify-between items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {selectedRepos.size} project{selectedRepos.size !== 1 ? "s" : ""} selected · {THEMES.find(t => t.id === selectedTheme)?.name} theme
          </span>
          <div className="flex gap-3 ml-auto">
            <Button
              variant="outline"
              className="border-white/10 hover:border-white/30"
              data-testid="button-preview"
              onClick={() => setShowPreview(true)}
            >
              <Eye className="w-4 h-4 mr-2" /> Live Preview
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(0,255,255,0.3)]"
              data-testid="button-publish"
              onClick={() => setShowPublish(true)}
            >
              <Globe className="w-4 h-4 mr-2" /> Publish Portfolio
            </Button>
          </div>
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {showPreview && (
          <PortfolioPreview
            scanResult={scanResult}
            selectedRepos={selectedRepos}
            theme={selectedTheme}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPublish && (
          <PublishDialog
            scanResult={scanResult}
            selectedRepos={selectedRepos}
            theme={selectedTheme}
            onClose={() => setShowPublish(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
