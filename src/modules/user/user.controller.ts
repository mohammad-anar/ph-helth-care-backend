import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { UserRole, UserStatus } from "@prisma/client";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createPatient(req);
  // console.log({ body: req.body, file: req.file });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body, "from dr controller");

  const result = await UserServices.createDoctor(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdmin(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, searchTerm, sortBy, sortOrder, role, status } =
    req.query;
  const result = await UserServices.getAllUsers({
    page: Number(page),
    limit: Number(limit),
    searchTerm: searchTerm as string,
    sortBy: sortBy as string,
    sortOrder: sortOrder as string,
    role: role as UserRole,
    status: status as UserStatus,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Users retrieve successfully",
    data: result,
  });
});

export const UserController = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUsers,
};
