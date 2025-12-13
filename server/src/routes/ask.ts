import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/ask', (req: Request, res: Response) => {
  // 拿到用户的问题
  const question = req.body.question || "";
  console.log(question);
  res.end()
});

export default router;

