import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { config } from "../src/config";

const { MONGO_URI } = config;

const user = {
    username: "test_username",
    email: "test.email@example.com",
    password: "password123",
};

beforeAll(async () => {
    const mongoTestUri = MONGO_URI + "-test";
    await mongoose.connect(mongoTestUri);
});

beforeEach(async () => {
    if (mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("User API", () => {
    it("should create a user", async () => {
        const response = await request(app)
            .post("/api/auth/signup")
            .send(user)
            .expect(201);

        expect(response.body.data).toEqual({
            username: user.username,
            email: user.email,
        });
    });

    it("should log in and return a token", async () => {
        await request(app).post("/api/auth/signup").send(user).expect(201);

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            })
            .expect(200);

        expect(response.body.data).toBeDefined();
    });

    it("should create account, login and access a protected route with token", async () => {
        await request(app).post("/api/auth/signup").send(user).expect(201);
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password,
            })
            .expect(200);

        const authToken = loginResponse.body.data;

        const response = await request(app)
            .get("/api/users/my-account")
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200);

        expect(response.body.user).toHaveProperty("email", user.email);
        expect(response.body.user).toHaveProperty("username", user.username);
        expect(response.body.user).toHaveProperty("role", "user");
    });

    it("should fail to access a protected route without a token", async () => {
        await request(app).get("/api/users/my-account").expect(401);
    });
});
