import { NextResponse } from "next/server";
import { DeliveryRegion } from "../../../../lib/db/models/DeliveryRegion";
import dbconnect from "@/lib/db/connect";
export async function GET() {
    try {
        await dbconnect();
        const regions = await DeliveryRegion.find()
            .lean();
        const sortedRegions = regions.sort((a, b) => a.deliveryPartners.length - b.deliveryPartners.length);

        return NextResponse.json(sortedRegions, { status: 200 });
    } catch (err) {
        console.error("Error fetching delivery regions:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
