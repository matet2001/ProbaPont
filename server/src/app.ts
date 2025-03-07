import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import errorHandler from "./middlewares/error.handler";

const app = express();

const allowedOrigins = ["http://localhost**", "http://0.0.0.0"];

const options = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).send({ messege: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
