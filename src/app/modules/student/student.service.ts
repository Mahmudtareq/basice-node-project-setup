import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); //built in static method

  const student = new Student(studentData); //built in instance methode
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User Allready Exists');
  }
  const result = await student.save();
  return result;
};

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
  createStudentIntoDB,
  getAllStudentsfromDB,
  getSingleStudentfromDB,
  deleteStudentfromDB,
};
