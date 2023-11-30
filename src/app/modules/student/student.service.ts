
import { Student } from './student.model';

const getAllStudentsfromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentfromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
const deleteStudentfromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, {isDeleted:true});
  return result;
};


export const StudentServices = {
  getAllStudentsfromDB,
  getSingleStudentfromDB,
  deleteStudentfromDB,
};
