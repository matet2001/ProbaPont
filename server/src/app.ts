import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const { MONGO_URI = 'mongodb://localhost:27017/probapont_db', PORT = 8080, HOST = '0.0.0.0' } = process.env;


const allowedOrigins = ['http://localhost:5173', 'http://localhost:80'];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).send({ messege: "ok" });
});


const main = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT as number, HOST, () => {
            console.log(`App is listening on http://${HOST}:${PORT}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

main()
