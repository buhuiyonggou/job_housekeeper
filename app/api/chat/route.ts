import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId || userId !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized for user mismatch" }, { status: 401 });
  }

  try {
    const messageThreads = await prisma.messageThread.findMany({
      where: {
        userId: userId,
      },
      include: {
        messages: true,
      },
    });
    return NextResponse.json(messageThreads);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Error fetching messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { message } = body;

  try {
    const newThread = await prisma.messageThread.create({
      data: {
        userId: session.user.id,
        messages: {
          create: [
            {
              content: message.message,
              sentTime: message.sentTime,
              sender: message.sender,
              direction: message.direction,
            },
          ],
        },
      },
    });
    return NextResponse.json(newThread);
  } catch (error) {
    console.error("Error creating new thread:", error);
    return NextResponse.json(
      { error: `Error creating new thread: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
