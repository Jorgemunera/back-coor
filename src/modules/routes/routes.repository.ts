import { db } from '../../shared/database/mysql';
import { Route } from '../../entities/route.entity';
import { mapRoute } from '../../shared/utils/mappers';

export const getAllRoutes = async (): Promise<Route[]> => {
  const [rows]: [Route[]] | any = await db.query(
    'SELECT * FROM routes ORDER BY name ASC'
  );
  return rows.map(mapRoute);
};
