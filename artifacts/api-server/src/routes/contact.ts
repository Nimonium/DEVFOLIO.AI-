import { Router, type IRouter } from "express";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  req.log.info({ email: parsed.data.email }, "Contact form submission received");

  res.status(201).json({
    success: true,
    message: "Thanks for reaching out! We'll get back to you within 24 hours.",
  });
});

export default router;
