import request from "supertest";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { UserService } from "../../application/services/user.service";
import { User } from "../../entities/user";
import { UserRepository } from "../../infrastructure/database/repos/user.repo.mongo";
import { userDAO } from "../../infrastructure/database/user/user.dao";


// Mocking dependencies
jest.mock("../user/user.dao", () => ({
  create: jest.fn(),
  findById: jest.fn(),
}));

describe("WelcomeController Integration Tests", () => {
  let server: InversifyExpressServer;
  let container: Container;

  beforeAll(() => {
    // Set up the Inversify container
    container = new Container();
    container.bind(UserRepository).toSelf();
    container.bind(UserService).toSelf();

    // Set up the server
    server = new InversifyExpressServer(container);
  });

  beforeEach(() => {
    // Reset mock calls before each test
    jest.clearAllMocks();
  });

  it("should return a welcome message for a valid user id", async () => {
    const mockUser: User = { _id: "1", name: "Alice", nationality: "American" };
    (userDAO.findById as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(server.build())
      .get("/welcome")
      .query({ id: "1" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Welcome Alice`);
    expect(userDAO.findById).toHaveBeenCalledWith("1");
  });

  it("should return status 500 if an error occurs in the service", async () => {
    const mockError = new Error("Database error");
    (userDAO.findById as jest.Mock).mockRejectedValue(mockError);

    const response = await request(server.build())
      .get("/welcome")
      .query({ id: "1" });

    expect(response.status).toBe(500);
    expect(response.body.message).toBeUndefined();
    expect(userDAO.findById).toHaveBeenCalledWith("1");
  });
});
