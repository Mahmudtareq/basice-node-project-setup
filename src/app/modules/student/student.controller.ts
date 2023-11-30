import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendresponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsfromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is Retrived successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params; //destracture
    const result = await StudentServices.getSingleStudentfromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is Retrived successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params; //destracture
    const result = await StudentServices.deleteStudentfromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is Deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};
