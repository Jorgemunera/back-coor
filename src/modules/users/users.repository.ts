import { db } from '../../shared/database/mysql';
import { User } from '../../entities/user.entity';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows]: [User[]] | any = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const [rows]: [User[]] | any = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0] || null;
};

export const createUser = async (user: User): Promise<void> => {
  const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  await db.query(query, [user.name, user.email, user.password, user.role || 'user']);
};
