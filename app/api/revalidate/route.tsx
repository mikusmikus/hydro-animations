import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
     revalidatePath("/test");
    return NextResponse.json({ message: "Revalidated" });
}