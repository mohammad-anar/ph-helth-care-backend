import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { UserRole, UserStatus } from "@prisma/client";
import dynamicQuery from "../../helpers/dynamicQuery";
import { userFilterableFields } from "./user.constand";

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
  // page, limit, sortBy, sortOrder
  // fields, searchTerm - searching, filtering

  const filters = dynamicQuery(req.query, userFilterableFields);
  const options = dynamicQuery(req.query, [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
  ]);

  const result = await UserServices.getAllUsers(filters, options);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Users retrieve successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUsers,
};
