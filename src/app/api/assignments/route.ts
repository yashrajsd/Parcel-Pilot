import { Assignment } from "@/lib/db/models/Assignment";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET() {
    try{
        const data = await Assignment.find();
        return NextResponse.json({data},{status:200});
    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}