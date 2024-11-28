import { User } from "../../../../shared/user/entities/user";
import { UserInput } from "../../../../shared/user/entities/user.input";
import { UserRepository } from "../../../../shared/user/repos/user.repo.mongo";
import { userDAO } from "../../../../shared/user/entities/user.dao";

jest.mock("../../../../shared/user/entities/user.dao");


describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    jest.clearAllMocks();
  });

  describe("addUser", () => {
    it("should call userDAO.create with correct input and return the created user", async () => {
      const mockUserInput: UserInput = { name: "Alice", nationality: "American" };
      const mockUser: User = { _id: "1", ...mockUserInput };

      (userDAO.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.addUser(mockUserInput);

      expect(userDAO.create).toHaveBeenCalledWith(mockUserInput);
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if userDAO.create fails", async () => {
      const mockUserInput: UserInput = { name: "Bob", nationality: "British" };

      (userDAO.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(userRepository.addUser(mockUserInput)).rejects.toThrow("Database error");
      expect(userDAO.create).toHaveBeenCalledWith(mockUserInput);
    });
  });

  describe("getUser", () => {
    it("should call userDAO.findById with correct ID and return the user", async () => {
      const mockUser: User = { _id: "1", name: "Alice", nationality: "American" };

      (userDAO.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.getUser("1");

      expect(userDAO.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockUser);
    });

    it("should return null if userDAO.findById returns null", async () => {
      (userDAO.findById as jest.Mock).mockResolvedValue(null);

      const result = await userRepository.getUser("2");

      expect(userDAO.findById).toHaveBeenCalledWith("2");
      expect(result).toBeNull();
    });

    it("should throw an error if userDAO.findById fails", async () => {
      (userDAO.findById as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(userRepository.getUser("3")).rejects.toThrow("Database error");
      expect(userDAO.findById).toHaveBeenCalledWith("3");
    });
  });
});
