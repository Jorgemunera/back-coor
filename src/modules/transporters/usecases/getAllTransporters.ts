import { getAllTransporters } from '../transporters.repository';

export const getAllTransportersUseCase = async () => {
  return await getAllTransporters();
};
