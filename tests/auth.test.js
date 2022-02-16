const request = require("supertest");
const app = require("../app");
const { mockData } = require("./mockData");

describe("Auth Endpoints", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/auth/signUp").send(mockData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty("full_name");
  });

  it("should not allow user with same email address to register", async () => {
    const res = await request(app).post("/auth/signUp").send(mockData);
    expect(res.statusCode).toEqual(409);
    expect(res.body.status).toEqual("Conflict");
    expect(res.body.message).toEqual("User already exist");
  });

  it("Should throw error when email address is not provided", async () => {
    const res = await request(app)
      .post("/auth/signUp")
      .send({ ...mockData, email_address: "" });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("Should throw error when first name is not provided", async () => {
    const res = await request(app)
      .post("/auth/signUp")
      .send({ ...mockData, first_name: "" });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("Should throw error when last name is not provided", async () => {
    const res = await request(app)
      .post("/auth/signUp")
      .send({ ...mockData, last_name: "" });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("Should throw error when password is not provided", async () => {
    const res = await request(app)
      .post("/auth/signUp")
      .send({ ...mockData, password: "" });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("Should throw error when confirm password is not provided", async () => {
    const res = await request(app)
      .post("/auth/signUp")
      .send({ ...mockData, confirm_password: "" });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("Should throw error when password is not same as confirm password", async () => {
    const res = await request(app)
      .post("/auth/signUp")
      .send({ ...mockData, password: "54321" });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("Should throw error when email is invalid", async () => {
    const res = await request(app)
      .post("/auth/signUp")
      .send({ ...mockData, email_address: "chukwudi" });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("Should throw error when phone number is not provided", async () => {
    const res = await request(app)
      .post("/auth/signUp")
      .send({ ...mockData, phone_number: "" });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  /* Testing Login Route */
  it("should log the user in", async () => {
    const { email_address, password } = mockData;
    const res = await request(app)
      .post("/auth/login")
      .send({ email_address, password });
    expect(res.statusCode).toEqual(200);
  });

  it("Should throw error when email address is not provided", async () => {
    const { password } = mockData;
    const res = await request(app)
      .post("/auth/login")
      .send({ email_address: "", password });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("Should throw error when password is not provided", async () => {
    const { email_address } = mockData;
    const res = await request(app).post("/auth/login").send({ email_address });
    expect(res.statusCode).toEqual(403);
    expect(res.body.status).toEqual("Forbidden");
    expect(res.body.message).toEqual("Invalid credentials");
  });

  it("Should throw error when email does not exist", async () => {
    const { password } = mockData;
    const res = await request(app)
      .post("/auth/login")
      .send({ email_address: "chukwudi@yahoo.net", password });
    expect(res.statusCode).toEqual(404);
    expect(res.body.status).toEqual("Not found");
    expect(res.body.message).toEqual("User does not exist");
  });

  it("Should throw error when a wrong password is provided", async () => {
    const { email_address } = mockData;
    const res = await request(app)
      .post("/auth/login")
      .send({ email_address, password: "24689" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual("Bad request");
    expect(res.body.message).toEqual("Email or Password is incorrect");
  });
});
