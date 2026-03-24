import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/lib/models/Message";
import { getSession } from "@/lib/session";

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {

    const { id } = await params;

    await connectDB();
    await Message.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: "Inquiry purged successfully",
    });
  } catch {
    return NextResponse.json({ error: "Purge failed" }, { status: 500 });
  }
}
