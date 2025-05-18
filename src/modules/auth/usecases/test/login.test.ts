import { loginUser } from '../../../../../src/modules/auth/usecases/login';
import { findUserByEmail } from '../../../../../src/modules/users/users.repository';
import { comparePasswords } from '../../../../../src/shared/utils/hash';
import { generateToken } from '../../../../../src/shared/utils/jwt';
import { User } from '../../../../../src/entities/user.entity';

jest.mock('../../../../../src/modules/users/users.repository');
jest.mock('../../../../../src/shared/utils/hash');
jest.mock('../../../../../src/shared/utils/jwt');

describe('loginUser use case', () => {
  const mockUser: User = {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'hashed_password',
    role: 'user',
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return token for valid credentials', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (comparePasswords as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue('mocked_token');

    const token = await loginUser('jane@example.com', 'correct_password');

    expect(findUserByEmail).toHaveBeenCalledWith('jane@example.com');
    expect(comparePasswords).toHaveBeenCalledWith('correct_password', 'hashed_password');
    expect(generateToken).toHaveBeenCalledWith({
      id: 1,
      email: 'jane@example.com',
      role: 'user',
    });
    expect(token).toBe('mocked_token');
  });

  it('should throw error if user not found or missing fields', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(loginUser('no@user.com', 'any')).rejects.toThrow('Invalid credentials.');
    expect(comparePasswords).not.toHaveBeenCalled();
    expect(generateToken).not.toHaveBeenCalled();
  });

  it('should throw error if password is invalid', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (comparePasswords as jest.Mock).mockResolvedValue(false);

    await expect(loginUser('jane@example.com', 'wrong_password')).rejects.toThrow('Invalid credentials.');
    expect(generateToken).not.toHaveBeenCalled();
  });
});
