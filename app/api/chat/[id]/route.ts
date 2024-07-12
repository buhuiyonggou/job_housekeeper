import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { MessageObject } from "@/app/src/utils/Reusables";

export async function PATCH(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { threadId, messages, userId } = body;

  if (userId !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedThread = await prisma.messageThread.update({
      where: {
        id: threadId,
      },
      data: {
        messages: {
          create: messages.map((msg: MessageObject) => ({
            content: msg.message,
            sentTime: msg.sentTime,
            sender: msg.sender,
            direction: msg.direction,
          })),
        },
      },
      include: {
        messages: true,
      },
    });

    return NextResponse.json(updatedThread);
  } catch (error) {
    console.error("Error creating new thread:", error);
    return NextResponse.json(
      { error: `Error creating new thread: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = req.nextUrl.searchParams.get("userId");
    const threadId = req.nextUrl.searchParams.get("threadId");

    if (!userId || userId !== session.user.id) {
        return NextResponse.json({ error: "Unauthorized for user mismatch" }, { status: 401 });
    }
    
    try {
        const messageThreads = await prisma.messageThread.findMany({
        where: {
            userId: session.user.id,
            id: threadId ? parseInt(threadId) : undefined,
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