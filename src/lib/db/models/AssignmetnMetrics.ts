import mongoose, { Schema, models } from 'mongoose';

const AssignmentMetricsSchema = new Schema({
    date: { type: String, required: true, unique: true }, // Tracks per day (YYYY-MM-DD)
    totalAssigned: { type: Number, required: true, default: 0 },
    successRate: { type: Number, required: true, default: 0 },
    success:{type:Number,default:0},
    failure:{type:Number,default:0},
    failureReasons: [{
        reason: { type: String, required: true },
        count: { type: Number, required: true }
    }]
}, { timestamps: true });

export const AssignmentMetrics = models.AssignmentMetrics || mongoose.model('AssignmentMetrics', AssignmentMetricsSchema);
