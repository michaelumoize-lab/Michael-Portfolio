import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/lib/models/Message";
import { getSession } from "@/lib/session";

export async function PATCH(request, { params }) {
  const { id } = await params;

  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await connectDB();
    await Message.findByIdAndUpdate(id, { isRead: true });
    return NextResponse.json({ success: true, message: "Marked as read" });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
