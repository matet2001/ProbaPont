import express, { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

const router = express.Router();

router.get("/:id", async (req: Request, res, Response, next: NextFunction) => {
    try {
        const { id } = req.params.id;
    } catch (err) {
        next(err);
    }
});

export default router;
