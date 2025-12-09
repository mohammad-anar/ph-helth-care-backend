import { prisma } from "../../lib/prisma";
import config from "../../config";
import { createPatientPayload } from "./user.interface";
import bcrypt from "bcryptjs";

const createPatient = async (payload: createPatientPayload) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    config.bcrypt_solt_round
  );

  const result = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
    },
  });

  return result;
};

export const UserServices = {
  createPatient,
};
