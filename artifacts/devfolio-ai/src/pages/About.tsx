export default function About() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            The resume is dead.<br/>
            <span className="text-primary">Long live the portfolio.</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            We built DevFolio AI because incredible developers were being overlooked due to terrible personal websites.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <p>
            You spend hours perfecting your architecture, writing clean code, and optimizing performance. But when it comes time to show off your work, you throw together a generic template or, worse, just send a link to your GitHub profile and hope they figure it out.
          </p>
          
          <div className="my-12 p-8 border border-white/10 rounded-2xl bg-white/[0.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <h3 className="text-2xl font-bold text-white mt-0 mb-4">The Developer's Dilemma</h3>
            <p className="text-muted-foreground mb-0">
              Developers aren't designers, and they shouldn't have to be. Writing CSS shouldn't be the barrier between you and your dream job.
            </p>
          </div>

          <h2>Enter Artificial Intelligence</h2>
          <p>
            We realized that a GitHub profile contains everything needed to build a stunning portfolio — if you know how to extract it. DevFolio AI uses advanced language models to:
          </p>
          <ul>
            <li>Scan your repositories and identify the most impressive projects</li>
            <li>Read your code and READMEs to understand the technical depth</li>
            <li>Generate compelling, recruiter-friendly copy that explains <em>why</em> your work matters</li>
            <li>Wrap it all in a breathtaking, high-performance UI</li>
          </ul>

          <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="p-6 rounded-xl border border-white/10 bg-card">
              <div className="text-primary font-mono text-sm mb-2">01 / SPEED</div>
              <h4 className="text-xl font-bold text-white mb-2">Zero to Hero in Seconds</h4>
              <p className="text-muted-foreground text-sm">Stop spending weekends tweaking margin and padding. Get a production-ready portfolio instantly.</p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-card">
              <div className="text-accent font-mono text-sm mb-2">02 / IMPACT</div>
              <h4 className="text-xl font-bold text-white mb-2">Designed to Impress</h4>
              <p className="text-muted-foreground text-sm">First impressions matter. Our themes are crafted to look like an expensive agency built them.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
