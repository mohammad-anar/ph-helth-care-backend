import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { createPatientPayload } from "./user.interface";

const createPatient = async (payload: createPatientPayload) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    config.bcrypt_solt_round
  );

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: {
        name: payload.name,
        email: payload.email,
      },
    });
  });

  return result;
};

export const UserServices = {
  createPatient,
};
