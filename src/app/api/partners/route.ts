import dbconnect from "@/lib/db/connect";
import { DeliveryPartner } from "@/lib/db/models/DeliveryPartner";
import { DeliveryRegion } from "@/lib/db/models/DeliveryRegion";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
    try {
        await dbconnect(); 

        const profiles = await DeliveryPartner.find().limit(10);

        const totalProfilesCount = await DeliveryPartner.countDocuments();

        const averageRatingResult = await DeliveryPartner.aggregate([
            { $match: { 'metrics.rating': { $exists: true, $ne: null } } }, 
            { $group: { _id: null, averageRating: { $avg: '$metrics.rating' } } }
        ]);
        const averageRating = averageRatingResult.length > 0 ? averageRatingResult[0].averageRating : null;

        return NextResponse.json(
            {
                profiles,
                totalProfilesCount,
                averageRating
            },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function POST(req: Request) {
    console.log("Registering partner...");
    try {
        const { phone, email, shift, areas, name } = await req.json();

        if (!phone || !email || !shift?.start || !shift?.end || areas.length === 0 || !name) {
            console.log("Incomplete credentials");
            return NextResponse.json({ message: "Incomplete credentials" }, { status: 400 });
        }

        dbconnect();

        const partnerExist = await DeliveryPartner.findOne({
            $or: [{ phone: phone }, { email: email }]
        });

        if (partnerExist) {
            return NextResponse.json({ message: "Partner Credentials already exist" }, { status: 409 });
        }


        const startHour = parseInt(shift.start.split(":")[0], 10);
        const endHour = parseInt(shift.end.split(":")[0], 10);

        const partner = new DeliveryPartner({ name, email, phone, shift, areas });
        await partner.save();
        const region = await DeliveryRegion.findOne({ name: areas[0] });

        if (!region) {
            console.log("Region not found:", areas[0]);
            return NextResponse.json({ message: "Region not found" }, { status: 404 });
        }

        let currentHour = startHour;
        while (currentHour !== endHour) {
            region.shiftCounts[currentHour] += 1;
            currentHour = (currentHour + 1) % 24;
        }

        region.deliveryPartners.push(partner._id);
        await region.save();

        console.log("Partner Registered and Shift Counts Updated!");
        return NextResponse.json({ message: "Partner successfully registered" }, { status: 201 });

    } catch (err) {
        console.error("Error registering partner:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
