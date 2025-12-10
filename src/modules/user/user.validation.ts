import { z } from "zod";
const createPatientValidationZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email().nonempty("email is required"),
  password: z.string().min(6),
  address: z.string().optional(),
});

const createDoctorValidationZodSchema = z.object({
  name: z.string("Name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
  contactNumber: z.string("Contact number is required"),
  address: z.string("Address is required"),
  registrationNumber: z.string("Registration number is required"),
  experience: z.coerce
    .number("Experience must be a number")
    .min(0, "Experience cannot be negative"),
  gender: z.enum(["MALE", "FEMALE"], "Gender must be MALE or FEMALE"),
  appointmentFee: z.coerce
    .number("Appointment fee must be a number")
    .min(0, "Appointment fee cannot be negative"),
  qualification: z.string("Qualification is required"),
  currentWorkingPlace: z.string("Current working place is required"),
  designation: z.string("Designation is required"),
  profilePhoto: z.string("Profile photo must be a valid URL").optional(),
});
const createAdminValidationZodSchema = z.object({
  name: z.string("Name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
  contactNumber: z.string("Contact number is required"),
});

export const UserValidation = {
  createPatientValidationZodSchema,
  createDoctorValidationZodSchema,
  createAdminValidationZodSchema,
};
