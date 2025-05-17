import { findUserByEmail } from '../../../modules/users/users.repository';
import { comparePasswords } from '../../../shared/utils/hash';
import { generateToken } from '../../../shared/utils/jwt';

export const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await findUserByEmail(email);
  if (!user || !user.id || !user.role) {
    throw new Error('Invalid credentials.');
  }

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials.');
  }

  return generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
};
