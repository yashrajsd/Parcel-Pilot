import dbconnect from "@/lib/db/connect";
import { DeliveryRegion } from "@/lib/db/models/DeliveryRegion";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
    try {
        dbconnect();

        const regions = await DeliveryRegion.aggregate([
            {
                $project: {
                    name: 1,
                    shiftCounts: 1,
                    partnerCount: { $size: "$deliveryPartners" },
                    location:1 
                }
            }
        ]);

        return NextResponse.json(
            { regions },
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
    try {
        const data: DATA = await req.json();
        dbconnect();

        if (!data || !data.name || !data.location || !data.location.latitude || !data.location.longitude) {
            console.log("Incomplete credentials");
            return NextResponse.json({ message: "Incomplete credentials" }, { status: 400 });
        }

        const preData = await DeliveryRegion.findOne({ name: data.name });

        if (preData) {
            return NextResponse.json({ message: "Region already exists" }, { status: 409 });
        }

        const newRegion = new DeliveryRegion({
            name: data.name,
            location: {
                latitude: data.location.latitude,
                longitude: data.location.longitude
            }
        });

        await newRegion.save();
        return NextResponse.json({ message: "Region added successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error adding region:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}



type DATA={
    name:string,
    location:{
        longitude:string,
        latitude:string
    }
}