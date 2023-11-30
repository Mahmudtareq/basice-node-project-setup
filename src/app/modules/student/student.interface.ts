/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TUserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateofBrith: string;
  email: string;
  avatar?: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress?: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isDeleted: boolean;
};

export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
};

// Create a new Model type that knows about IUserMethods...
export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
