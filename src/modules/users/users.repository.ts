import { db } from '../../shared/database/mysql';
import { User } from '../../entities/user.entity';
import { mapUser } from '../../shared/utils/mappers';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows]: [User[]] | any = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  if (!rows || rows.length === 0) return null;
  return mapUser(rows[0]) || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const [rows]: [User[]] | any = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);

  return mapUser(rows[0]) || null;
};

export const createUser = async (user: User): Promise<void> => {
  const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  await db.query(query, [user.name, user.email, user.password, user.role || 'user']);
};
