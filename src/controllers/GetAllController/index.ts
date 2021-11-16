import {RequestHandler} from 'express';
import Pricing from '../../models/Pricing';

export const getAllPricingItems: RequestHandler = async (req, res) => {
    try {
        // Get all pricing items from MongoDB
        let items = await Pricing.find({});
        return res.json({items});
    } catch (err) {
        return res.status(500).send({err});
    }
};
