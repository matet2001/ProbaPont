import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';
import { UserModel } from '../src/db/user.model';

const user = {
    username: 'test_username',
    email: 'test.email@example.com',
    password: 'password123'
};

beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/proba-pont-db';
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    if (mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
    }
});

afterAll(async () => {
    await UserModel.findOneAndDelete({ email: user.email })
    await mongoose.connection.close();
});

describe('User API', () => {
    it('should create a user', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send(user)
            .expect(201);

        expect(response.body.data).toEqual({
            username: user.username,
            email: user.email
        });
    });
});

