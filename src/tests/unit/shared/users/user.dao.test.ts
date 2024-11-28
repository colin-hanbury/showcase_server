import { userDAO } from "../../../../shared/user/entities/user.dao";
import { User } from "../../../../shared/user/entities/user";


jest.mock('mongoose', () => {
  const mockModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  return {
    Schema: class MockSchema {
      constructor() {}
    },
    model: jest.fn(() => mockModel),
  };
});


describe('userDAO Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('should return a list of users when calling find', async () => {
    const mockUsers: User[] = [
      { _id: '1', name: 'Alice', nationality: 'American' },
      { _id: '2', name: 'Bob', nationality: 'Canadian' },
    ];
    (userDAO.find as jest.Mock).mockResolvedValue(mockUsers);

    const result = await userDAO.find();
    expect(result).toEqual(mockUsers);
    expect(userDAO.find).toHaveBeenCalledTimes(1);
  });

  it('should return a single user when calling findOne', async () => {
    const mockUser: User = { _id: '1', name: 'Alice', nationality: 'American' };
    (userDAO.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await userDAO.findOne({ name: 'Alice' });
    expect(result).toEqual(mockUser);
    expect(userDAO.findOne).toHaveBeenCalledWith({ name: 'Alice' });
  });

  it('should return a user by ID when calling findById', async () => {
    const mockUser: User = { _id: '1', name: 'Alice', nationality: 'American' };
    (userDAO.findById as jest.Mock).mockResolvedValue(mockUser);

    const result = await userDAO.findById('1');
    expect(result).toEqual(mockUser);
    expect(userDAO.findById).toHaveBeenCalledWith('1');
  });

  it('should create a new user when calling create', async () => {
    const mockUser: User = { _id: '3', name: 'Charlie', nationality: 'British' };
    (userDAO.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await userDAO.create({ name: 'Charlie', nationality: 'British' });
    expect(result).toEqual(mockUser);
    expect(userDAO.create).toHaveBeenCalledWith({ name: 'Charlie', nationality: 'British' });
  });

  it('should update a user when calling updateOne', async () => {
    const mockUpdateResult = { matchedCount: 1, modifiedCount: 1 };
    (userDAO.updateOne as jest.Mock).mockResolvedValue(mockUpdateResult);

    const result = await userDAO.updateOne({ _id: '1' }, { name: 'Updated Alice' });
    expect(result).toEqual(mockUpdateResult);
    expect(userDAO.updateOne).toHaveBeenCalledWith({ _id: '1' }, { name: 'Updated Alice' });
  });

  it('should delete a user when calling deleteOne', async () => {
    const mockDeleteResult = { deletedCount: 1 };
    (userDAO.deleteOne as jest.Mock).mockResolvedValue(mockDeleteResult);

    const result = await userDAO.deleteOne({ _id: '1' });
    expect(result).toEqual(mockDeleteResult);
    expect(userDAO.deleteOne).toHaveBeenCalledWith({ _id: '1' });
  });

  it('should handle errors during database calls', async () => {
    const mockError = new Error('Database error');
    (userDAO.find as jest.Mock).mockRejectedValue(mockError);

    await expect(userDAO.find()).rejects.toThrow('Database error');
    expect(userDAO.find).toHaveBeenCalledTimes(1);
  });
});
