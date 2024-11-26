
import { UserService } from "../../application/services/user.service";
import { User } from "../../entities/user";
import { UserInput } from "../../entities/user.input";
import { UserRepository } from "../../infrastructure/database/repos/user.repo.mongo";
import "reflect-metadata";

jest.mock("../../infrastructure/database/repos/user.repo.mongo");

describe("UserService", () => {
  let userService: UserService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepositoryMock);
  });

  describe("getUserWelcomeMessage", () => {
    it("should return a welcome message for a valid id when the user exists", async () => {
      const mockUser: User = { _id: "1", name: "Alice", nationality: "American" };
      userRepositoryMock.getUser.mockResolvedValue(mockUser);

      const message = await userService.getUserWelcomeMessage("1");

      expect(message).toBe("Welcome back Alice my American friend");
      expect(userRepositoryMock.getUser).toHaveBeenCalledWith("1");
    });

    it("should return the default welcome message for an invalid id", async () => {
      const message = await userService.getUserWelcomeMessage(null);

      expect(message).toBe("Welcome");
      expect(userRepositoryMock.getUser).not.toHaveBeenCalled();
    });

    it("should return the default welcome message when no user is found", async () => {
      userRepositoryMock.getUser.mockResolvedValue(null);

      const message = await userService.getUserWelcomeMessage("2");

      expect(message).toBe("Welcome");
      expect(userRepositoryMock.getUser).toHaveBeenCalledWith("2");
    });
  });

  describe("addUser", () => {
    it("should call addUser on UserRepository with the correct UserInput and return the new user", async () => {
      const mockUser: User = { _id: "1", name: "Bob", nationality: "British" };
      userRepositoryMock.addUser.mockResolvedValue(mockUser);

      const userInput: UserInput = { name: "Bob", nationality: "British" };
      const user = await userService.addUser("Bob", "British");

      expect(user).toEqual(mockUser);
      expect(userRepositoryMock.addUser).toHaveBeenCalledWith(userInput);
    });
  });
});
