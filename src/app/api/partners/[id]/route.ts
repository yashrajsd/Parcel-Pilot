import { NextRequest, NextResponse } from "next/server";
import { DeliveryPartner } from "@/lib/db/models/DeliveryPartner";
import dbconnect from "@/lib/db/connect";
import { DeliveryRegion } from "@/lib/db/models/DeliveryRegion";

export const revalidate = 0;
export async function PUT(req: NextRequest) {
    try {
        dbconnect();

        const updateData = await req.json(); 
        const id = req.nextUrl.pathname.split('/').pop()

        if (!id) {
            return NextResponse.json({ status: 400, message: "Missing ID" });
        }

        const result = await DeliveryPartner.updateOne(
            { _id: id }, 
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ status: 404, message: "User not found" });
        }

        return NextResponse.json({ status: 200, message: "Profile updated successfully" });
    } catch (err) {
        console.error("Error updating profile:", err);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbconnect(); 
        
        const id = req.nextUrl.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ status: 400, message: "Missing ID" });
        }

        const partner = await DeliveryPartner.findById(id);
        if (!partner) {
            return NextResponse.json({ status: 404, message: "Profile not found" });
        }


        if (partner.currentLoad !== 0) {
            return NextResponse.json({ status: 400, message: "Cannot delete partner with active deliveries" });
        }

        await DeliveryRegion.updateMany(
            { deliveryPartners: id },
            { $pull: { deliveryPartners: id } }
        );

        const result = await DeliveryPartner.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            return NextResponse.json({ status: 200, message: "Profile deleted successfully" });
        } else {
            return NextResponse.json({ status: 404, message: "Profile not found" });
        }
    } catch (err) {
        console.error("Error deleting profile:", err);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}
