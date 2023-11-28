/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentvalidationSchema from './student.joi.validations';
import StudentValidationSchema from './student.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // data validation with joi
    // const { error, value } = studentvalidationSchema.validate(studentData);
    const zodParseData = StudentValidationSchema.parse(studentData);

    // if (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }
    // const result = await StudentServices.createStudentIntoDB(studentData);
    const result = await StudentServices.createStudentIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsfromDB();
    res.status(200).json({
      success: true,
      message: 'Student is Retrived successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params; //destracture
    const result = await StudentServices.getSingleStudentfromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is Retrived successfully',
      data: result,
    });
  } catch (error:any) {
   res.status(500).json({
     success: false,
     message: error.message || 'Something went wrong',
   });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params; //destracture
    const result = await StudentServices.deleteStudentfromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is Deleted successfully',
      data: result,
    });
  } catch (error:any) {
   res.status(500).json({
     success: false,
     message: error.message || 'Something went wrong',
   });
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudent
};
