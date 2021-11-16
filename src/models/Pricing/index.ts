import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from '../plugins/timestamp-plugin';

export interface PricingItem extends ITimeStampedDocument {

    /** Tiers */
    tiers: string;

    /** Starter */
    starter: string;

    /** Advanced */
    // eslint-disable-next-line camelcase
    advanced: string;

    /** Enterprise */
    // eslint-disable-next-line camelcase
    enterprise: string;
}

interface PricingItemModel extends Model<PricingItem> { }

const schema = new Schema<PricingItem>({
    tiers: { type: String, index: true, required: false },
    starter: { type: String, index: false, required: false },
    advanced: { type: String, index: false, required: false },
    enterprise: { type: String, index: false, required: false }
});

// Add timestamp plugin for createdAt and updatedAt in millisecond from epoch
schema.plugin(TimeStampPlugin);

const Pricing: PricingItemModel = model<PricingItem, PricingItemModel>('PricingItem', schema);

export default Pricing;

// Example of Pricing Item
/* {
    tiers: 'Description',
    starter: 'Good place to start',
    advanced: 'For the startup with more needs',
    enterprise: 'for big companies with big dreams'
}*/
