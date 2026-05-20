import { Link } from "wouter";
import { TerminalSquare, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
                <TerminalSquare className="w-5 h-5 text-primary" />
              </div>
              <span className="font-mono font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">
                DEVFOLIO<span className="text-primary">.AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Transform your GitHub repositories into stunning, professional portfolios in seconds. Built for developers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4 font-mono text-sm tracking-wider">PRODUCT</h3>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-muted-foreground hover:text-primary text-sm transition-colors">Features</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary text-sm transition-colors">Preview Dashboard</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4 font-mono text-sm tracking-wider">COMPANY</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4 font-mono text-sm tracking-wider">LEGAL</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} DevFolio AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>System Status:</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-primary font-mono text-xs">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
