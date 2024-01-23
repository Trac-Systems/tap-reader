import TracManager from "../src/TracManager";
import {jest} from '@jest/globals';

jest.describe("RestModule Integration Tests", () => {
  let tracCore;
  let server;

  // Setup before all tests
  jest.beforeAll(async () => {
    tracCore = new TracManager();
    await tracCore.initReader(true, true, -1, -1);
    await tracCore.restServer.fastify.ready();
  });

  // Teardown after all tests
  jest.afterAll(async () => {
    await server.close();
  });

  // Test for /getDeployments/ route
  jest.describe("/getDeployments/ route", () => {
    jest.it("should return data with the correct structure", async () => {
      const response = await tracCore.restServer.fastify.inject({
        method: "GET",
        url: "/getDeployments/",
      });

      jest.expect(response.statusCode).toBe(200);
      const jsonResponse = response.json();

      // Checking the overall structure
      jest.expect(jsonResponse).toEqual(
        jest.expect.objectContaining({
          result: jest.expect.any(Array),
        })
      );

      // Checking the structure of each item in the result array
      jsonResponse.result.forEach((item) => {
        jest.expect(item).toEqual(
          jest.expect.objectContaining({
            tick: jest.expect.any(String),
            max: jest.expect.any(String),
            lim: jest.expect.any(String),
            dec: jest.expect.any(Number),
            blck: jest.expect.any(Number),
            tx: jest.expect.any(String),
            ins: jest.expect.any(String),
            num: jest.expect.any(Number),
            ts: jest.expect.any(Number),
            addr: jest.expect.any(String),
            crsd: jest.expect.any(Boolean),
            dmt: jest.expect.any(Boolean),
            elem: jest.expect.anything(), // can be null or any value
            prj: jest.expect.anything(), // can be null or any value
            dim: jest.expect.anything(), // can be null or any value
            dt: jest.expect.anything(), // can be null or any value
          })
        );
      });
    });
  });

  // Additional tests for other routes and scenarios
});
