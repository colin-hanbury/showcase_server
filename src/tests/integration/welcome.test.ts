import request from "supertest";
import { Container } from "inversify";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { WelcomeController } from "../../features/welcome/controllers/welcome.controller";
import { UserService } from "../../shared/user/services/user.service";

const mockUserService = {
  getUserWelcomeMessage: jest.fn(),
};

const container = new Container();
container.bind<UserService>(UserService).toConstantValue(mockUserService as unknown as UserService);
container.bind<WelcomeController>(WelcomeController).toSelf();

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(express.json());
});
const app = server.build();

describe("WelcomeController Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("should return a welcome message for a valid user id", async () => {
    const mockMessage = "Welcome back Alice my American friend";
    const mockUserId = "1";

   
    mockUserService.getUserWelcomeMessage.mockResolvedValue(mockMessage);

    
    const response = await request(app)
      .get("/welcome")
      .query({ id: mockUserId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(mockMessage);
    expect(mockUserService.getUserWelcomeMessage).toHaveBeenCalledWith(mockUserId);
  });

  it("should return 500 if an error occurs in the UserService", async () => {
    const mockUserId = "1";
    const mockError = new Error("User not found");

    mockUserService.getUserWelcomeMessage.mockRejectedValue(mockError);

    const response = await request(app)
      .get("/welcome")
      .query({ id: mockUserId });

    expect(response.status).toBe(500);
    expect(response.body.message).toBeUndefined();
    expect(mockUserService.getUserWelcomeMessage).toHaveBeenCalledWith(mockUserId);
  });

  it("should return a default message if no user id is provided", async () => {
    const mockMessage = "Welcome"; 
    const mockUserId = "";

    mockUserService.getUserWelcomeMessage.mockResolvedValue(mockMessage);

    const response = await request(app)
      .get("/welcome")
      .query({ id: mockUserId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(mockMessage);
    expect(mockUserService.getUserWelcomeMessage).toHaveBeenCalledWith(mockUserId);
  });
});
