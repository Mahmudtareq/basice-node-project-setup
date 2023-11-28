import { User } from './user.model';

const createStudentIntoDB = async () => {
  const result = await User.create();
  return result;
};

export const UserService = {
  createStudentIntoDB,
};
