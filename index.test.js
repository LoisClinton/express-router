const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const { Fruit, User } = require("./models/index.js");
const app = require("./src/app.js");
const request = require("supertest");

const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");

describe("GET /fruits tests", () => {
  let response;
  beforeAll(async () => {
    response = await request(app).get("/fruits");
  });

  test("GET /fruits route returns a status code of 200", async () => {
    expect(response.status).toBe(200);
  });

  test("Any objects in list has the correct properties", async () => {
    expect(response.body.every(({ name, color }) => !!name && !!color)).toBe(
      true
    );
  });

  test("GET /fruits route returns returns 'content-Type' of 'application/json'", async () => {
    expect(response.headers["content-type"]).toMatch("application/json");
  });

  test("GET /fruits route returns an array of fruits", async () => {
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /fruits tests", () => {
  test("GET /fruits/:id request returns data with the correct properties", async () => {
    const response = await request(app).get("/fruits/2");
    const testObj = {};
    testObj.name = response.body.name;
    testObj.color = response.body.color;
    expect(testObj).toEqual({ color: "Yellow", name: "Banana" });
  });
});

describe("POST /fruits tests", () => {
  test("POST /fruits request returns the fruits array has been updated with the new value", async () => {
    const testObj = {};
    const response = await request(app)
      .post("/fruits")
      .send({ name: "NEW FRUIT", color: "Blue" });

    const responseLength = response.body.length;
    const newValue = response.body[responseLength - 1];
    testObj.name = newValue.name;
    testObj.color = newValue.color;
    expect(testObj).toEqual({ name: "NEW FRUIT", color: "Blue" });
  });
});

describe("PUT /fruits tests", () => {
  test("PUT /fruits/:id request updates the fruits array with the provided value", async () => {
    const testObj = {};
    const response = await request(app)
      .put("/fruits/2")
      .send({ name: "REPLACED FRUIT", color: "Grey" });
    testObj.name = response.body.name;
    testObj.color = response.body.color;
    expect(testObj).toEqual({ name: "REPLACED FRUIT", color: "Grey" });
  });
});

describe("DELETE /fruits tests", () => {
  test("DELETE /fruits/:id deletes the fruits with the provided id from the array.", async () => {
    const response = await request(app).delete("/fruits/5");
    expect(response.body).toEqual({});
  });
});
