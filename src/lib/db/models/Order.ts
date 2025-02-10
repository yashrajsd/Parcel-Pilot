import mongoose, { Schema, models } from 'mongoose';
import { DeliveryRegion } from './DeliveryRegion'

const OrderSchema = new Schema({
    orderNumber: { type: String, required: true, unique: true },
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    area: { 
        type: String, 
        required: true,
        validate: {
            validator: async function(value: string): Promise<boolean> {
                const region = await DeliveryRegion.findOne({ name: value });
                return !!region; 
            },
            message: (props: { value: string }) => `${props.value} is not a valid delivery area!`
        }
    },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    status: {
        type: String,
        enum: ['pending', 'assigned', 'picked', 'delivered'],
        default: 'pending'
    },
    scheduledFor: { type: String },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'DeliveryPartner' },
    totalAmount: { type: Number, required: true },
}, { timestamps: true });

export const Order = models.Order || mongoose.model('Order', OrderSchema);
