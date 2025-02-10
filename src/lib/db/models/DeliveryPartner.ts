import mongoose, { Schema, models } from 'mongoose';
import { DeliveryRegion } from './DeliveryRegion'; 

const DeliveryPartnerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'] },
    currentLoad: { type: Number, default: 0, max: 3 },
    areas: { type: [String], required: true },
    shift: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    metrics: {
        rating: { type: Number, default: 0 },
        completedOrders: { type: Number, default: 0 },
        cancelledOrders: { type: Number, default: 0 }
    },
    shiftOrder: { type: [Number], default: Array(24).fill(0),required:true }
}, { timestamps: true });

DeliveryPartnerSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await DeliveryRegion.updateMany(
            { deliveryPartners: doc._id },
            { $pull: { deliveryPartners: doc._id } }
        );
    }
});

export const DeliveryPartner = models.DeliveryPartner || mongoose.model('DeliveryPartner', DeliveryPartnerSchema);
