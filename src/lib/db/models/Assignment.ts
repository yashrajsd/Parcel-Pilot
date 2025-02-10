import mongoose, { Schema, models } from 'mongoose';

const AssignmentSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    orderNumber:{type:String,required:true},
    partnerId: { type: Schema.Types.ObjectId, ref: 'DeliveryPartner', required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['success', 'failed','Pending'], required: true },
    reason: { type: String }  
}, { timestamps: true });

export const Assignment = models.Assignment || mongoose.model('Assignment', AssignmentSchema);
