// 1. Create an interface representing a document in MongoDB.
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatcherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  adress: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateofBrith: string;
  email: string;
  avatar?: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress?: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'inActive';
};
