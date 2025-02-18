import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';
import { UserModel } from '../src/db/user.model';

const user = {
    username: 'test_username',
    email: 'test.email@example.com',
    password: 'password123'
};

let authToken = '';

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

    it('should log in and return a token', async () => {
        await request(app).post('/api/auth/signup').send(user).expect(201);

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: user.password
            })
            .expect(200);

        expect(response.body.data).toBeDefined();
        authToken = response.body.data;
    });

    //it('should access a protected route with token', async () => {
    //    expect(authToken).not.toBe('');
    //
    //    const response = await request(app)
    //        .get('/api/users/my-account')
    //        .set('Authorization', `Bearer ${authToken}`)
    //        .expect(200);
    //
    //    expect(response.body.data).toHaveProperty('email', user.email);
    //    expect(response.body.data).toHaveProperty('username', user.username);
    //});

    it('should fail to access a protected route without a token', async () => {
        await request(app)
            .get('/api/users/my-account')
            .expect(401);
    });

});

