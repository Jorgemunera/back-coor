import { getAllTransportersUseCase } from '../getAllTransporters';
import * as repository from '../../transporters.repository';

describe('getTransportersUseCase', () => {
  it('should return a list of transporters', async () => {
    const mockData = [
      { id: 1, name: 'Juan', capacity: 150, isAvailable: true, createdAt: new Date() },
      { id: 2, name: 'Carlos', capacity: 500, isAvailable: false, createdAt: new Date() }
    ];

    jest.spyOn(repository, 'getAllTransporters').mockResolvedValue(mockData);

    const result = await getAllTransportersUseCase();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Juan');
    expect(repository.getAllTransporters).toHaveBeenCalled();
  });
});
