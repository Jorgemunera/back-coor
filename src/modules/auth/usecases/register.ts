import { User } from '../../../entities/user.entity';
import { hashPassword } from '../../../shared/utils/hash';
import { createUser, findUserByEmail } from '../../../modules/users/users.repository';

export const registerUser = async (userData: User): Promise<void> => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await hashPassword(userData.password);
  const user: User = {
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || 'user',
  };

  await createUser(user);
};
