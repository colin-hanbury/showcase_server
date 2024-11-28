import request from "supertest";
import { Container } from "inversify";
import express from "express"; // Import express to add middleware
import { InversifyExpressServer } from "inversify-express-utils";
import { UserService } from "../../../../shared/user/services/user.service";
import { User } from "../../../../shared/user/entities/user";
import { ActionsController } from "../../../../features/actions/controllers/actions.controller";

// Mock UserService
const mockUserService = {
  addUser: jest.fn(),
};

// Configure Inversify Container
const container = new Container();
container.bind<UserService>(UserService).toConstantValue(mockUserService as unknown as UserService);
container.bind<ActionsController>(ActionsController).to(ActionsController);

// Create Express App with JSON middleware
const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(express.json()); 
});
const app = server.build();

describe("ActionsController", () => {
  describe("POST /actions", () => {
    beforeEach(() => {
      jest.clearAllMocks(); 
    });

    it("should return 200 and the created user on success", async () => {
      const mockUser: User = { _id: "1", name: "Alice", nationality: "American" };
      mockUserService.addUser.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/actions")
        .send({ name: "Alice", nationality: "American" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ user: mockUser });
      expect(mockUserService.addUser).toHaveBeenCalledWith("Alice", "American");
    });

    it("should return 500 if UserService.addUser throws an error", async () => {
      mockUserService.addUser.mockRejectedValue(new Error("Failed to add user"));

      const response = await request(app)
        .post("/actions")
        .send({ name: "Bob", nationality: "British" });

      expect(response.status).toBe(500);
      expect(mockUserService.addUser).toHaveBeenCalledWith("Bob", "British");
    });
  });
});
