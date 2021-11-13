import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';

export const getAll: RequestHandler = requestMiddleware(async (req, res) => {
    res.status(200).json({ message: "Woohoo!" });
});
