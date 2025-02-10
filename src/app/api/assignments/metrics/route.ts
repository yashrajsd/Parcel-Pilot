import { AssignmentMetrics } from "@/lib/db/models/AssignmetnMetrics"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';
export async function GET() {
    try{
        const data = await AssignmentMetrics.find().sort({"timestamp":1}).limit(30);
        if(!data){
            return NextResponse.json({message:"Data not found"},{status:404})
        }
        return NextResponse.json({data},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}