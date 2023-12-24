import request from "supertest";
import app from "../../app";
import { SIGNUP_ROUTE } from "../signup";

/**
 * Available methods in api/auth/signup:
 * - POST
 */
describe("tests signup route method availability", () => {
  let password = "",
    email = "";
  beforeAll(() => {
    password = "passwordValid1";
    email = "emailValid@valid.com";
  });

  it("should return 405 for non post requests", async () => {
    await request(app).get(SIGNUP_ROUTE).expect(405);
    await request(app).put(SIGNUP_ROUTE).expect(405);
    await request(app).patch(SIGNUP_ROUTE).expect(405);
    await request(app).delete(SIGNUP_ROUTE).expect(405);
  });

  it("should return 200 for post requests", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password,
      })
      .expect(200);
  });
});

/**
 * Valid email conditions:
 * - standard email formats from 'express-validator' package
 *
 *
 */
describe("test validity of email input", () => {
  let password = "";

  beforeAll(() => {
    password = "ValidPassword1";
  });
  it("should return 422 if the email is not provided", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        password,
      })
      .expect(422);
  });

  it("should return 422 if the email is not valid", async () => {
    await request(app).post(SIGNUP_ROUTE).send({}).expect(422);

    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "invalid",
        password,
      })
      .expect(422);
  });

  it("should return 200 if the email is  valid", async () => {
    await request(app).post(SIGNUP_ROUTE).send({}).expect(422);

    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password,
      })
      .expect(200);
  });
});

/**
 * Valid password conditions:
 * - at least 8 characters
 * - at most 32 characters
 * - one lowercase letter
 * - one uppercase letter
 * - one digit
 *
 *
 *
 */
describe("test validity of password input", () => {
  let email = "";
  beforeAll(() => {
    email = "test@test.com";
  });
  it("should return 422 if the password is not provided", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
      })
      .expect(422);
  });

  it("should return 422 if the password contains less than 8 characters", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: "Valid12",
      })
      .expect(422);
  });
  it("should return 422 if the password contains more than 32 characters", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: "Valid12Valid12Valid12Valid12Valid12Valid12Va",
      })
      .expect(422);
  });
  it("should return 422 if the password doesn't contain 1 lowercase letter", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: "VALID12VALID12",
      })
      .expect(422);
  });
  it("should return 422 if the password doesn't contain 1 uppercase letter", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: "valid12valid12",
      })
      .expect(422);
  });
  it("should return 422 if the password doesn't contain a number", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: "Validvalidva",
      })
      .expect(422);
  });
  it("should return 200 if the password is valid", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: "Valid12Valid12",
      })
      .expect(200);
  });
});
