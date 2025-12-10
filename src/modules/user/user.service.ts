import bcrypt from "bcryptjs";
import { Request } from "express";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { MulterUploads } from "../../helpers/fileUploader";
import { UserRole, UserStatus } from "@prisma/client";

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

const getAllUsers = async ({
  page,
  limit,
  searchTerm,
  sortBy,
  sortOrder,
  role,
  status,
}: {
  page: number;
  limit: number;
  searchTerm: string | undefined;
  sortBy: string;
  sortOrder: string;
  role: UserRole;
  status: UserStatus;
}) => {
  const pageNumber = page || 1;
  const limitNumber = limit || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const result = await prisma.user.findMany({
    where: {
      email: {
        contains: searchTerm,
        mode: "insensitive",
      },
      role: role as UserRole,
      status: status as UserStatus,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limitNumber,
  });

  return result;
};

export const UserServices = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUsers,
};
