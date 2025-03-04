import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';
import errorHandler from './middlewares/error.handler';
dotenv.config();

const app = express();
const {
    MONGO_URI,
    PORT,
    HOST
} = process.env;


const allowedOrigins = ['http://localhost**',];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).send({ messege: "ok" });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

const main = async () => {
    if (!MONGO_URI || !PORT || !HOST) {
        console.error("Missing env vars")
        return;
    }
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(parseInt(PORT), HOST, () => {
            console.log(`App is listening on http://${HOST}:${PORT}`);
        });
    } catch (e) {
        console.error(e);
        //throw new Error("Failed to connect to MongoDB");
    }
};

main();

export { app }
