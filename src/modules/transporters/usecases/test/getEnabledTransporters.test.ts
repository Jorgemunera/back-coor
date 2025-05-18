import { getEnabledTransportersUseCase } from '../getEnabledTransporters';
import * as repository from '../../transporters.repository';

describe('getAvailableTransportersUseCase', () => {
  it('should return only available transporters', async () => {
    const mockData = [
      { id: 1, name: 'Ana', capacity: 85, isAvailable: true, createdAt: new Date() }
    ];

    jest.spyOn(repository, 'getAvailableTransporters').mockResolvedValue(mockData);

    const result = await getEnabledTransportersUseCase();

    expect(result).toHaveLength(1);
    expect(result[0].isAvailable).toBe(true);
    expect(repository.getAvailableTransporters).toHaveBeenCalled();
  });
});
