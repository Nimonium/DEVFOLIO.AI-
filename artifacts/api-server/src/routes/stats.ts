import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  res.json({
    portfoliosGenerated: 47382,
    githubProfilesScanned: 192847,
    developersSatisfied: 43019,
    avgGenerationTime: "1m 47s",
  });
});

export default router;
