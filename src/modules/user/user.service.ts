import bcrypt from "bcryptjs";
import { Request } from "express";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { MulterUploads } from "../../helpers/fileUploader";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";
import { userSearchableFields } from "./user.constand";

const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await MulterUploads.uploadToCloudinary(req.file);
    req.body.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    config.bcrypt_solt_round
  );

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        profilePhoto: req.body.profilePhoto,
        address: req.body.address,
      },
    });
  });

  return result;
};
const createDoctor = async (req: Request) => {
  if (req.file) {
    const uploadResult = await MulterUploads.uploadToCloudinary(req.file);
    req.body.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    config.bcrypt_solt_round
  );

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
        role: UserRole.DOCTOR,
      },
    });

    return await tnx.doctor.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        profilePhoto: req.body.profilePhoto,
        contactNumber: req.body.contactNumber,
        address: req.body.address,
        registrationNumber: req.body.registrationNumber,
        experience: req.body.experience,
        gender: req.body.gender,
        appointmentFee: req.body.appointmentFee,
        qualification: req.body.qualification,
        currentWorkingPlace: req.body.currentWorkingPlace,
        designation: req.body.designation,
      },
    });
  });

  return result;
};
const createAdmin = async (req: Request) => {
  if (req.file) {
    const uploadResult = await MulterUploads.uploadToCloudinary(req.file);
    req.body.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    config.bcrypt_solt_round
  );

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    });

    return await tnx.admin.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        profilePhoto: req.body.profilePhoto,
        contactNumber: req.body.contactNumber,
      },
    });
  });

  return result;
};

const getAllUsers = async (params: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  // const pageNumber = options.page || 1;
  // const limitNumber = options.limit || 10;
  // const skip = (pageNumber - 1) * limitNumber;
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData.length > 0)) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });
  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const UserServices = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUsers,
};
