import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center relative z-10 max-w-2xl px-4">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4 font-mono">
          404
        </h1>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-mono mb-8">
          <span>SYSTEM_ERROR: PAGE_NOT_FOUND</span>
        </div>

        <p className="text-xl text-muted-foreground mb-10">
          The quadrant you are looking for has been moved, deleted, or never existed in this dimension.
        </p>

        <Link href="/">
          <Button className="h-12 px-8 bg-white text-black hover:bg-gray-200 text-lg font-medium rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <Home className="w-5 h-5 mr-2" />
            Return to Base
          </Button>
        </Link>
      </div>
    </div>
  );
}
