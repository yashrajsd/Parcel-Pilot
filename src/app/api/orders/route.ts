import dbconnect from "@/lib/db/connect";
import { Order } from "@/lib/db/models/Order";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET() {   
    try {
        dbconnect(); 

        const orders = await Order.find()
        const totalOrders = await Order.countDocuments();
        const completedOrders = await Order.countDocuments({ status: "delivered" });
        const pendingOrders = await Order.countDocuments({ status: { $ne: "delivered" } });

        const earnings = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalEarned: {
                        $sum: { $cond: [{ $eq: ["$status", "delivered"] }, "$totalAmount", 0] }
                    },
                    totalPending: {
                        $sum: { $cond: [{ $ne: ["$status", "delivered"] }, "$totalAmount", 0] }
                    }
                }
            }
        ]);

        const totalEarned = earnings[0]?.totalEarned || 0;
        const totalPending = earnings[0]?.totalPending || 0;

        return NextResponse.json({
            orders,
            totalOrders,
            completedOrders,
            pendingOrders,
            totalEarned,
            totalPending
        }, { status: 200 });

    } catch (err) {
        console.error("Error fetching data:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


