import express, { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { verifyUserEmail } from "../services/email.service";

const router = express.Router();
const testRedirectUrl = "http://0.0.0.0:8080/health";

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const verifiedUser = await verifyUserEmail(new Types.ObjectId(id));
        console.log(verifiedUser);

        res.redirect(testRedirectUrl);
    } catch (err) {
        next(err);
    }
});

export default router;
