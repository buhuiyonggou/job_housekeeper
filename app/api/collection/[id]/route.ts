import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";

// Get job in collection with specific id
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.pathname.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "Invalid job id" }, { status: 400 });
  }

  const job = await prisma.job_Collection.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(job);
}

// Delete the current job card from the collection
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = request.nextUrl.pathname.split("/").pop();
  console.log("Delete id: ", id);
  if (!id) {
    return NextResponse.json({ error: "Invalid job id" }, { status: 400 });
  }

  try {
    await prisma.job_Collection.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Collection Removed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job collection:", error);
    return NextResponse.json(
      { error: "Failed to delete job collection" },
      { status: 500 }
    );
  }
}
