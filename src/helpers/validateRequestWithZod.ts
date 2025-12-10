import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
const validateRequestWithZos =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = JSON.parse(req.body?.data ?? req.body);
      // console.log({ body });

      const parsed = await schema.parseAsync(body);

      req.body = parsed;
      next();
    } catch (error) {
      next(error);
    }
  };
export default validateRequestWithZos;
