import { getAllRoutes } from '../routes.repository';

export const getAllRoutesUseCase = async () => {
  return await getAllRoutes();
};
