import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import githubRouter from "./github";
import testimonialsRouter from "./testimonials";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(githubRouter);
router.use(testimonialsRouter);
router.use(statsRouter);

export default router;
