import { DeliveryRegion } from "@/lib/db/models/DeliveryRegion";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop()

        if (!id) {
            return NextResponse.json({ message: "Region ID is required" }, { status: 400 });
        }

        const region = await DeliveryRegion.findById(id);
        if (!region) {
            return NextResponse.json({ message: "Region not found" }, { status: 404 });
        }

        const shiftCounts = region.shiftCounts; 
        let bestStart = -1;
        let minLoad = Infinity;

        const highPriorityRanges = new Set([9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23]);

        for (let i = 0; i <= 20; i++) {  
            let currentLoad = 0;
            let isHighPriority = false;

            for (let j = i; j < i + 4; j++) {
                currentLoad += shiftCounts[j];
                if (highPriorityRanges.has(j)) {
                    isHighPriority = true;
                }
            }

            if (currentLoad < minLoad || (isHighPriority && currentLoad === minLoad)) {
                bestStart = i;
                minLoad = currentLoad;
            }
        }

        if (bestStart === -1) {
            return NextResponse.json({ message: "No suitable shift found" }, { status: 400 });
        }

        return NextResponse.json({ startHour: bestStart, endHour: bestStart + 4 });

    } catch (err) {
        console.error("Error fetching best shift:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
