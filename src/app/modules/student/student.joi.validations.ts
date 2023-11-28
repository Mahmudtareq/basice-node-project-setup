import Joi from 'joi';

const UserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/)
    .messages({
      'string.base': 'First Name must be a string',
      'string.empty': 'First Name is required',
      'string.max': 'First Name cannot be more than 20 characters',
      'string.pattern.base':
        'First Name must start with a capital letter and contain only letters',
    }),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'Last Name must be a string',
      'string.empty': 'Last Name is required',
      'string.pattern.base': 'Last Name must contain only letters',
    }),
});

// Define Joi schema for UserGuardian
const UserGuardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// Define Joi schema for LocalGuardian
const LocalGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Define Joi schema for Student
const studentvalidationSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
  name: UserNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  dateofBrith: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'B+',
    'AB+',
    'O+',
    'A-',
    'B-',
    'AB-',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: UserGuardianValidationSchema.required(),
  localGuardian: LocalGuardianValidationSchema.required(),
  profileImage: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentvalidationSchema;
