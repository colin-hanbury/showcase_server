import request from "supertest";
import { Container } from "inversify";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { UserService } from "../../../../shared/user/services/user.service";
import { WelcomeController } from "../../../../features/welcome/controllers/welcome.controller";
import { UserRepository } from "../../../../shared/user/repos/user.repo.mongo";

// Mock UserService
const mockUserRepo = {
  getUserWelcomeMessage: jest.fn(),
};
const mockUserService = {
  getUserWelcomeMessage: jest.fn(),
};


// Configure Inversify Container
const container = new Container();
container.bind<UserRepository>(UserRepository).toConstantValue(mockUserRepo as unknown as UserRepository);
container.bind<UserService>(UserService).toConstantValue(mockUserService as unknown as UserService);
container.bind<WelcomeController>(WelcomeController).to(WelcomeController);

// Create Express App with JSON middleware
const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(express.json());
});
const app = server.build();

describe("WelcomeController", () => {
  describe("GET /welcome", () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Reset mock calls before each test
    });

    it("should return 200 and the welcome message on success", async () => {
      const mockMessage = "Welcome, Alice!";
      mockUserService.getUserWelcomeMessage.mockResolvedValue(mockMessage);

      const response = await request(app)
        .get("/welcome")
        .query({ id: "1" }); // Simulate query string `?id=1`

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: mockMessage });
      expect(mockUserService.getUserWelcomeMessage).toHaveBeenCalledWith("1");
    });

    it("should return 500 if UserService.getUserWelcomeMessage throws an error", async () => {
      mockUserService.getUserWelcomeMessage.mockRejectedValue(new Error("User not found"));

      const response = await request(app)
        .get("/welcome")
        .query({ id: "1" });

      expect(response.status).toBe(500);
      expect(mockUserService.getUserWelcomeMessage).toHaveBeenCalledWith("1");
    });
  });
});
