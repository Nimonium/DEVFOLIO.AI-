import { Router, type IRouter } from "express";

const router: IRouter = Router();

const testimonials = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Full Stack Developer",
    company: "Stripe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    content: "DevFolio AI transformed my GitHub into a stunning portfolio in under 2 minutes. I landed 3 interview callbacks the same week I launched it. The AI suggestions were spot-on — it noticed I had no deployment links and pushed me to fix that immediately.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Machine Learning Engineer",
    company: "Google DeepMind",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    content: "As an ML engineer, my GitHub was full of complex research repos that were hard to explain. DevFolio AI restructured everything beautifully and highlighted my strongest contributions. Recruiters finally understand what I build.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Senior Frontend Engineer",
    company: "Vercel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    content: "I've tried every portfolio builder out there. None of them understood developer context like DevFolio AI. It pulled my tech stack automatically, ranked my best projects, and generated copy that actually sounded like me.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sara Kim",
    role: "Backend Engineer",
    company: "Cloudflare",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
    content: "The theme customization is incredible. I picked a dark cyberpunk theme and my portfolio looked like it was designed by a professional agency. Got a DM from a Cloudflare recruiter the day I shared the link.",
    rating: 5,
  },
  {
    id: 5,
    name: "James O'Brien",
    role: "DevOps Engineer",
    company: "HashiCorp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    content: "The resume integration blew me away. It cross-referenced my GitHub contributions with my work history and filled in gaps I didn't even think about. My portfolio now tells a cohesive story of my entire career.",
    rating: 4,
  },
  {
    id: 6,
    name: "Aisha Okonkwo",
    role: "Open Source Maintainer",
    company: "Mozilla Foundation",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
    content: "As an open source maintainer with 200+ repos, organizing my portfolio was a nightmare. DevFolio AI intelligently grouped my work by impact and quality. The AI correctly identified my flagship projects without me saying a word.",
    rating: 5,
  },
];

router.get("/testimonials", async (_req, res): Promise<void> => {
  res.json(testimonials);
});

export default router;
