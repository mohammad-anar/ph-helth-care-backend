import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserSerivces } from "./user.service";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserSerivces.createPatient(req.body);
  console.log({ result });
});

export const UserController = {
  createPatient,
};
