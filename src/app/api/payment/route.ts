import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log("Webhook")
    return NextResponse.json({
        message: "Hello"
    }, { status: 200 })
}