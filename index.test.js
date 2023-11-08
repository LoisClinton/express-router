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
