/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface';


// 2nd step Schema
// subschema
const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is requird'],
    trim: true, // remove extra space
    maxlength: [20, 'Furst name can not more then 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE } is not in capitalize format',
    // },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});
const UserGuardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'First name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Field is required: Father occupation'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Field is required: Father contact number'],
  },
  motherName: {
    type: String,
    required: [true, 'Field is required: Mother name'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Field is required: Mother occupation'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Field is required: Mother contact number'],
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is requird'],
    unique: true,
    ref: 'User',
  },
 
  name: { type: UserNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateofBrith: { type: Date },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: UserGuardianSchema, required: true },
  localGuardian: { type: LocalGuardianSchema, required: true },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref:'AcademicSemester'
  },
  profileImage: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// middelware


// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// cheate model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
