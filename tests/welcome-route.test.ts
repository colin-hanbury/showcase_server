import request from "supertest";

import app from "../src/app";
import { getWelcomeMessage } from "../src/controllers/welcome.controller";

describe("Welcome route", () => {
    let expectedMessage = '';
    let expectedTitle = '';

  it('should test welcome message with response 200', async () => {
    expectedMessage = "It's a great day to be alive";
    expectedTitle = "Welcome";

    (getWelcomeMessage as jest.Mock).mockImplementation((req, res) => {
      res.status(200).send({ title: expectedTitle, message: expectedMessage });
    });

    const response = await request(app).get('/welcome').send();
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(expectedTitle);
    expect(response.body.message).toBe(expectedMessage);
  });
});