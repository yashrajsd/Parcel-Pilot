import dbconnect from "@/lib/db/connect";
import { Assignment } from "@/lib/db/models/Assignment";
import { AssignmentMetrics } from "@/lib/db/models/AssignmetnMetrics";
import { DeliveryPartner } from "@/lib/db/models/DeliveryPartner";
import { DeliveryRegion } from "@/lib/db/models/DeliveryRegion";
import { Order } from "@/lib/db/models/Order";
import { NextResponse } from "next/server";

async function generateUniqueOrderNumber() {
    let orderNumber: string = "";
    let exists: boolean = true;

    while (exists) {
        orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
        exists = (await Order.exists({ orderNumber })) !== null;
    }

    return orderNumber;
}

async function findBestPartner(area: string) {
    const partners = await DeliveryPartner.find({
        areas: { $in: [area] },
        currentLoad: { $lt: 3 },
    }).sort({currentLoad:1});

    let bestPartner = null;
    let bestHour = null;

    for (const partner of partners) {
        const startHour = parseInt(partner.shift.start.split(":")[0]);
        const endHour = parseInt(partner.shift.end.split(":")[0]);

        for (let hour = startHour; hour < endHour; hour++) {
            if (partner.shiftOrder[hour] < 2) {
                bestPartner = partner;
                bestHour = hour;
                break;
            }
        }
        if (bestPartner) break;
    }

    return { bestPartner, bestHour };
}

export async function POST(req: Request) {
    try {
        dbconnect();
        const body = await req.json();
        const { customer, area, items, totalAmount } = body;

        if (!customer || !area || !items || !totalAmount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const regionExists = await DeliveryRegion.findOne({ name: area });
        if (!regionExists) {
            return NextResponse.json({ error: "Invalid delivery area!" }, { status: 400 });
        }

        const orderNumber = await generateUniqueOrderNumber();
        const { bestPartner, bestHour } = await findBestPartner(area);

        let assignedTo = null;
        let scheduledFor = null;

        if (bestPartner && bestHour !== null) {
            assignedTo = bestPartner._id;
            scheduledFor = new Date();
            scheduledFor.setHours(bestHour, 0, 0, 0);

            bestPartner.shiftOrder[bestHour] += 1;
            bestPartner.currentLoad += 1;
            await bestPartner.save();
        }

        const newOrder = await Order.create({
            orderNumber,
            customer,
            area,
            items,
            status: assignedTo ? "assigned" : "pending",
            totalAmount,
            assignedTo,
            scheduledFor
        });

        const assignment = await Assignment.create({
            orderId: newOrder._id,
            orderNumber: newOrder.orderNumber,
            partnerId: bestPartner ? bestPartner._id : null,
            timestamp: new Date(),
            status: "Pending"
        });
        await assignment.save();

        const today = new Date().toISOString().split("T")[0];
        let metrics = await AssignmentMetrics.findOne({ date: today });

        if (!metrics) {
            metrics = new AssignmentMetrics({
                date: today,
                totalAssigned: 0,
                success: 0,
                failure: 0,
                successRate: 0,
                failureReasons: [],
            });
        }

        metrics.totalAssigned += 1;
        await metrics.save();

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
