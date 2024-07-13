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

export async function DELETE(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const { userId } = body;
    const threadId = req.nextUrl.pathname.split("/").pop();

    if (!threadId) {
        return NextResponse.json({ error: "Thread ID is required" }, { status: 400 });
    }
    
    if (userId !== session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    try {
        const deletedThread = await prisma.messageThread.delete({
            where: {
                id: parseInt(threadId),
            },
        });
        return NextResponse.json(deletedThread);
    } catch (error) {
        console.error("Error deleting thread:", error);
        return NextResponse.json(
            { error: "Error deleting thread" },
            { status: 500 }
        );
    }
}