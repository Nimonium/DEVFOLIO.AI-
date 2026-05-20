import { Check, Cpu, Layout, FileText, Download, Code, Zap, Search } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Deep GitHub Scanner",
      description: "Our engine doesn't just look at stars. It analyzes commit history, language distribution, and code complexity to find your true strengths."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "AI Portfolio Generation",
      description: "Converts raw repository data into narrative-driven project showcases that highlight problem-solving, not just technology."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Repository Analysis",
      description: "Automatically detects if a project has a frontend deployment, extracts the tech stack, and summarizes the architecture."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Suggestions",
      description: "Get actionable advice on how to improve your GitHub profile before recruiters see it (e.g., 'Add a README to this popular repo')."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Cyberpunk Customization",
      description: "Switch between meticulously crafted themes. Neon grids, minimal dark mode, electric brutalism — all fully responsive."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Resume Integration",
      description: "Generates a printable, ATS-friendly PDF resume perfectly synced with your web portfolio data."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "One-Click Export",
      description: "Host it with us instantly, or export the raw Next.js/React code to host it on your own Vercel/Netlify account."
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Everything you need. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Nothing you don't.</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive suite of tools designed to extract your best work and present it flawlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-32 max-w-4xl mx-auto bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] pointer-events-none" />
          <h3 className="text-3xl font-bold text-white mb-6 relative z-10">Stop writing boilerplate portfolio code</h3>
          <ul className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8 relative z-10">
            {["No CSS debugging", "No hosting configuration", "Always up to date", "Recruiter optimized"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
