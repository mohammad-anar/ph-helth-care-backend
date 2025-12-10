import { UserStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelper";
import config from "../../config";

export interface LoginPayload {
  email: string;
  password: string;
}

const login = async (payload: LoginPayload) => {
  console.log(payload);

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isPassMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPassMatch) {
    throw new Error("Password does not match");
  }

  const accessToken = jwtHelpers.generateToken(
    { email: user.email, role: user.role },
    config.jwt_access_secret as string,
    "1h"
  );

  const refreshToken = jwtHelpers.generateToken(
    { email: user.email, role: user.role },
    config.jwt_refresh_secret as string,
    "30d"
  );

  //
  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

export const AuthService = {
  login,
};
