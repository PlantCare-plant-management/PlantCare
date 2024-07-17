const request = require("supertest");
const express = require("express");
const router = require("../routes/index");
const UserController = require("../controllers/userController");
const authentication = require("../middleware/authentication");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use("/", router);

jest.mock("../controllers/userController");
jest.mock("../middleware/authentication", () =>
  jest.fn((req, res, next) => next())
);

describe("User Router", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /login should call UserController.login", async () => {
    const mockLogin = jest
      .spyOn(UserController, "login")
      .mockImplementation((req, res) => {
        res.status(200).json({ message: "Login successful" });
      });

    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "testpassword" });

    expect(mockLogin).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
  });

  test("POST /register should call UserController.register", async () => {
    const mockRegister = jest
      .spyOn(UserController, "register")
      .mockImplementation((req, res) => {
        res.status(201).json({ message: "User registered" });
      });

    const response = await request(app)
      .post("/register")
      .send({ username: "testuser", password: "testpassword" });

    expect(mockRegister).toHaveBeenCalled();
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered");
  });

  test("GET /user should call UserController.getUserById", async () => {
    const mockGetUserById = jest
      .spyOn(UserController, "getUserById")
      .mockImplementation((req, res) => {
        res.status(200).json({ id: 1, username: "testuser" });
      });

    const response = await request(app).get("/user");

    expect(authentication).toHaveBeenCalled();
    expect(mockGetUserById).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body.username).toBe("testuser");
  });

  test("PUT /user/edit should call UserController.editUser", async () => {
    const mockEditUser = jest
      .spyOn(UserController, "editUser")
      .mockImplementation((req, res) => {
        res.status(200).json({ message: "User updated" });
      });

    const response = await request(app)
      .put("/user/edit")
      .field("username", "testuser")
      .attach("imgUrl", Buffer.from("test image"), "test.png");

    expect(authentication).toHaveBeenCalled();
    expect(mockEditUser).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User updated");
  });
});
