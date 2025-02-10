import mongoose, { Schema, models } from 'mongoose';

const DeliveryRegionSchema = new Schema({
    name: { type: String, required: true },
    location: {
        longitude: { type: String, required: true },
        latitude: { type: String, required: true }
    },
    deliveryPartners: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'DeliveryPartner', 
        default:[]
    }],
    shiftCounts: { type: [Number], default: Array(24).fill(0) }
}, { timestamps: true });

export const DeliveryRegion = models.DeliveryRegion || mongoose.model('DeliveryRegion', DeliveryRegionSchema);
