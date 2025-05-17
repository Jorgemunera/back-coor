import { db } from '../../shared/database/mysql';
import { Transporter } from '../../entities/transporter.entity';
import { Route } from 'entities/route.entity';
import { mapTransporter, mapRoute } from '../../shared/utils/mappers';

export const getAllTransporters = async (): Promise<Transporter[]> => {
  const [rows]: [Transporter[]] | any = await db.query(
    'SELECT * FROM transporters ORDER BY name ASC'
  );
  return rows.map(mapTransporter);
};

export const getAvailableTransporters = async (): Promise<Transporter[]> => {
  const [rows]: [Transporter[]] | any = await db.query(
    'SELECT * FROM transporters WHERE is_available = true ORDER BY name ASC'
  );
  return rows.map(mapTransporter);
};

export const findRouteById = async (routeId: number): Promise<Route> => {
  const [rows]: [Route] | any = await db.query(
    `SELECT * FROM routes WHERE id = ?`,
    [routeId]
  );
  if (rows.length === 0) {
    throw new Error('Route not found');
  }
  return mapRoute(rows[0]);
};

export const findTransporterById = async (
  transporterId: number
): Promise<Transporter> => {
  const [rows]: any = await db.query(
    `SELECT * FROM transporters WHERE id = ?`,
    [transporterId]
  );
  if (rows.length === 0) {
    throw new Error('Transporter not found');
  }
  return mapTransporter(rows[0]);
};

export const markTransporterAsBusy = async (
  transporterId: number
): Promise<void> => {
  await db.query(
    `UPDATE transporters SET is_available = FALSE WHERE id = ?`,
    [transporterId]
  );
};
