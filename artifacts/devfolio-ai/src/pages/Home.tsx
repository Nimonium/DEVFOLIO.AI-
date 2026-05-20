import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Code, Cpu, Layout, Star, Users, Zap, Search, Loader2, GitMerge, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Particles } from "@/components/ui/Particles";
import { useScanGithub, useGetTestimonials, useGetPlatformStats, getGetPlatformStatsQueryKey, getGetTestimonialsQueryKey } from "@workspace/api-client-react";
import type { GithubScanResult } from "@workspace/api-client-react/src/generated/api.schemas";
import { Link } from "wouter";

export default function Home() {
  const [username, setUsername] = useState("");
  const scanMutation = useScanGithub();
  const [scanResult, setScanResult] = useState<GithubScanResult | null>(null);
  
  const { data: stats } = useGetPlatformStats({ query: { queryKey: getGetPlatformStatsQueryKey(), enabled: true } });
  const { data: testimonials, isLoading: testimonialsLoading } = useGetTestimonials({ query: { queryKey: getGetTestimonialsQueryKey(), enabled: true } });

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    const cleanUsername = username
      .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
      .replace(/\/$/, "")
      .trim();
    if (!cleanUsername) return;
    setScanResult(null);
    scanMutation.mutate(
      { data: { username: cleanUsername } },
      {
        onSuccess: (data) => {
          setScanResult(data);
          try {
            localStorage.setItem("devfolio_scan_result", JSON.stringify(data));
          } catch {}
        }
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Particles />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.15)_0%,rgba(0,0,0,0)_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>AI-POWERED PORTFOLIO GENERATOR</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Your code is art.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
              Display it like it.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Transform your GitHub repositories into a stunning, professional portfolio in seconds. No design skills required.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3 relative">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-card border border-white/10 rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors">
                  <div className="pl-4 text-muted-foreground">
                    github.com/
                  </div>
                  <Input 
                    placeholder="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-0 bg-transparent focus-visible:ring-0 text-lg h-14 pl-1"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={scanMutation.isPending || !username.trim()}
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all"
              >
                {scanMutation.isPending ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Scanning...</>
                ) : (
                  <>Scan My GitHub <ArrowRight className="w-5 h-5 ml-2" /></>
                )}
              </Button>
            </form>

            {/* Scan Results Area */}
            {scanResult && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                className="bg-card/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-left"
              >
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <img src={scanResult.avatarUrl} alt={scanResult.username} className="w-16 h-16 rounded-full border border-primary/30" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{scanResult.username}</h3>
                    <p className="text-muted-foreground">{scanResult.bio || "Developer"}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-sm text-primary font-mono mb-1">PORTFOLIO READINESS</div>
                    <div className="text-3xl font-bold text-white">{scanResult.portfolioReadiness}%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5">
                    <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1"><Code className="w-4 h-4"/> Repos</div>
                    <div className="text-2xl font-bold text-white">{scanResult.totalRepos}</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5">
                    <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1"><Star className="w-4 h-4"/> Stars</div>
                    <div className="text-2xl font-bold text-white">{scanResult.totalStars}</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5">
                    <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1"><Users className="w-4 h-4"/> Followers</div>
                    <div className="text-2xl font-bold text-white">{scanResult.followers}</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5">
                    <div className="text-muted-foreground text-sm flex items-center gap-2 mb-1"><GitMerge className="w-4 h-4"/> Top Lang</div>
                    <div className="text-lg font-bold text-white truncate">{scanResult.topLanguages?.[0] || "N/A"}</div>
                  </div>
                </div>
                <Link href="/dashboard">
                  <Button className="w-full bg-white text-black hover:bg-gray-200">
                    Generate Portfolio Now
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                {stats?.portfoliosGenerated ? (stats.portfoliosGenerated / 1000).toFixed(1) + 'k' : '25k+'}
              </div>
              <div className="text-muted-foreground">Portfolios Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                {stats?.githubProfilesScanned ? (stats.githubProfilesScanned / 1000).toFixed(1) + 'k' : '100k+'}
              </div>
              <div className="text-muted-foreground">Profiles Scanned</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                {stats?.avgGenerationTime || '3.2s'}
              </div>
              <div className="text-muted-foreground">Avg. Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                {stats?.developersSatisfied ? Math.floor(stats.developersSatisfied / 1000) + 'k' : '99%'}
              </div>
              <div className="text-muted-foreground">Happy Developers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute -right-64 top-0 w-[500px] h-[500px] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-mono">
                CYBERPUNK THEMES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Designed to make recruiters stop scrolling.
              </h2>
              <p className="text-xl text-muted-foreground">
                We've partnered with top UI designers to create portfolio themes that look like they cost $10,000. Stand out from the sea of boring Bootstrap templates.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Fully responsive and mobile-optimized",
                  "Built-in dark mode and high-contrast options",
                  "Automated project galleries with smart cropping",
                  "Blazing fast load times (perfect Lighthouse scores)"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-card">
                {/* Mock portfolio preview window */}
                <div className="absolute top-0 w-full h-8 bg-black/40 border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mt-8 p-6 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50" />
                    <div>
                      <div className="h-6 w-32 bg-white/20 rounded mb-2" />
                      <div className="h-4 w-48 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col">
                        <div className="h-32 bg-white/10 rounded-lg mb-4" />
                        <div className="h-4 w-3/4 bg-white/20 rounded mb-2" />
                        <div className="h-3 w-1/2 bg-white/10 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the modern developer</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to showcase your work, automated by AI. Stop wrestling with CSS and start impressing recruiters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8 text-primary" />,
                title: "Deep Repo Analysis",
                description: "Our AI scans your repositories, reads your READMEs, and understands your code architecture."
              },
              {
                icon: <Cpu className="w-8 h-8 text-accent" />,
                title: "AI Project Summaries",
                description: "Automatically generates compelling, recruiter-friendly descriptions for your most complex projects."
              },
              {
                icon: <Layout className="w-8 h-8 text-emerald-400" />,
                title: "Cyberpunk Themes",
                description: "Choose from dozens of high-end, futuristic themes designed by top product designers."
              }
            ].map((feature, i) => (
              <div key={i} className="group relative p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="bg-background w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/30 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Hired by the best.</h2>
            <p className="text-muted-foreground text-lg">Developers using DevFolio land jobs at top tech companies.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonialsLoading ? (
              // Skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-8 rounded-2xl bg-card border border-white/5 animate-pulse">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <div key={s} className="w-4 h-4 bg-white/10 rounded-full" />)}
                  </div>
                  <div className="h-20 bg-white/10 rounded-lg mb-6" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10" />
                    <div>
                      <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                      <div className="h-3 w-32 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              testimonials?.slice(0, 3).map((t) => (
                <div key={t.id} className="p-8 rounded-2xl bg-card border border-white/5 relative">
                  <Quote className="absolute top-8 right-8 w-8 h-8 text-white/5" />
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-8 relative z-10">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/10" />
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role} @ {t.company}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-card">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to stand out?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of developers who have already upgraded their online presence. It takes less than 5 seconds.
          </p>
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-14 px-10 bg-white text-black hover:bg-gray-200 text-lg font-medium rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Scan My GitHub Profile
          </Button>
        </div>
      </section>
    </div>
  );
}

