import express from "express";
import { UserController } from "./user.controller";
import validateRequestWithZos from "../../helpers/validateRequestWithZod";
import { UserValidation } from "./user.validation";
import { MulterUploads } from "../../helpers/fileUploader";

const router = express.Router();

router.get(
  "/",
  //   controller
  UserController.getAllUsers
);
router.post(
  "/create-patient",
  //   multer upload
  MulterUploads.upload.single("file"),
  //   validate req.body with zod
  validateRequestWithZos(UserValidation.createPatientValidationZodSchema),
  //   controller
  UserController.createPatient
);
router.post(
  "/create-doctor",
  //   multer upload
  MulterUploads.upload.single("file"),
  //   validate req.body with zod
  validateRequestWithZos(UserValidation.createDoctorValidationZodSchema),
  //   controller
  UserController.createDoctor
);
router.post(
  "/create-admin",
  //   multer upload
  MulterUploads.upload.single("file"),
  //   validate req.body with zod
  validateRequestWithZos(UserValidation.createAdminValidationZodSchema),
  //   controller
  UserController.createAdmin
);

export const UserRouter = router;
