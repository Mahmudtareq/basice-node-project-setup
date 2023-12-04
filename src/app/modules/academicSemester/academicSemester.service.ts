import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { academicSemesterNameCodeMapper } from './acadenicSemester.constant';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Semester code is invalid!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
