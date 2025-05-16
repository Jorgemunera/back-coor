import { getAvailableTransporters } from '../transporters.repository';

export const getEnabledTransportersUseCase = async () => {
  return await getAvailableTransporters();
};
