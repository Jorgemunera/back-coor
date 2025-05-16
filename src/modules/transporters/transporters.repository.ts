import { db } from '../../shared/database/mysql';
import { Transporter } from '../../entities/transporter.entity';

export const getAllTransporters = async (): Promise<Transporter[]> => {
  const [rows]: [Transporter[]] | any = await db.query(
    'SELECT * FROM transporters ORDER BY name ASC'
  );
  return rows;
};

export const getAvailableTransporters = async (): Promise<Transporter[]> => {
  const [rows]: [Transporter[]] | any = await db.query(
    'SELECT id, name, capacity FROM transporters WHERE is_available = true ORDER BY name ASC'
  );
  return rows;
};
