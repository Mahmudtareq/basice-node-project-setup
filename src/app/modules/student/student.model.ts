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
import bcrypt from 'bcrypt';
import config from '../../config';

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
  password: { type: String, required: true },
  name: { type: UserNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateofBrith: { type: String },
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
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
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
// password hash
studentSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

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
