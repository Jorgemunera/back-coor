import { registerUser } from '../../../../../src/modules/auth/usecases/register';
import { createUser, findUserByEmail } from '../../../../../src/modules/users/users.repository';
import { hashPassword } from '../../../../../src/shared/utils/hash';
import { User } from '../../../../../src/entities/user.entity';

jest.mock('../../../../../src/modules/users/users.repository');
jest.mock('../../../../../src/shared/utils/hash');

describe('registerUser use case', () => {
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'plainPassword',
    role: 'user',
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user if not already registered', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue(null);
    (hashPassword as jest.Mock).mockResolvedValue('hashed_password');
    (createUser as jest.Mock).mockResolvedValue(undefined);

    await registerUser(mockUser);

    expect(findUserByEmail).toHaveBeenCalledWith('john@example.com');
    expect(hashPassword).toHaveBeenCalledWith('plainPassword');
    expect(createUser).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
      role: 'user',
    });
  });

  it('should throw error if user already exists', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);

    await expect(registerUser(mockUser)).rejects.toThrow('User already exists');
    expect(findUserByEmail).toHaveBeenCalledWith('john@example.com');
    expect(createUser).not.toHaveBeenCalled();
    expect(hashPassword).not.toHaveBeenCalled();
  });
});
