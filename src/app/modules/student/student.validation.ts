import { z } from 'zod';

// Define Zod schemas for subdocuments
const UserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string().refine((value) => /^[a-zA-Z]+$/.test(value), {
    message: 'Last name is not valid',
  }),
});

const GuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Define Zod schema for the main document
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateofBrith: z.date().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContact: z.string(),
      bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: GuardianValidationSchema,
      admissionSemester: z.string(),
      localGuardian: LocalGuardianValidationSchema,
      profileImage: z.string(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
};
