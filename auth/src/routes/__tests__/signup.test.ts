import request from "supertest";
import app from "../../app";

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
      .post("/api/auth/signup")
      .send({
        password,
      })
      .expect(422);
  });

  it("should return 422 if the email is not valid", async () => {
    await request(app).post("/api/auth/signup").send({}).expect(422);

    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "invalid",
        password,
      })
      .expect(422);
  });

  it("should return 200 if the email is  valid", async () => {
    await request(app).post("/api/auth/signup").send({}).expect(422);

    await request(app)
      .post("/api/auth/signup")
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
      .post("/api/auth/signup")
      .send({
        email,
      })
      .expect(422);
  });

  it("should return 422 if the password contains less than 8 characters", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email,
        password: "Valid12",
      })
      .expect(422);
  });
  it("should return 422 if the password contains more than 32 characters", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email,
        password: "Valid12Valid12Valid12Valid12Valid12Valid12Va",
      })
      .expect(422);
  });
  it("should return 422 if the password doesn't contain 1 lowercase letter", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email,
        password: "VALID12VALID12",
      })
      .expect(422);
  });
  it("should return 422 if the password doesn't contain 1 uppercase letter", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email,
        password: "valid12valid12",
      })
      .expect(422);
  });
  it("should return 422 if the password doesn't contain a number", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email,
        password: "Validvalidva",
      })
      .expect(422);
  });
  it("should return 200 if the password is valid", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        email,
        password: "Valid12Valid12",
      })
      .expect(200);
  });
});
