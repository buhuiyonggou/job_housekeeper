import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/auth/authOptions';
import prisma from "@/prisma/client";
import { Message } from '@prisma/client';
import {initialMessage} from '../../../src/utils/constants';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const messageThread = await prisma.messageThread.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                messages: true
            }
        });
        return NextResponse.json(messageThread);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
}


// export async function PATCH(req: NextRequest, res: NextResponse) {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const body = await req.json();
//     const { messages, userId } = body;

//     try {
//         const messageThread = await prisma.messageThread.create({
//             data: {
//                 userId,
//                 messages: {
//                     create: messages.map((msg: Message) => ({
//                         content: msg.content,
//                         sentTime: new Date(msg.sentTime),
//                         sender: msg.sender,
//                         direction: msg.direction,
//                         threadId: 
//                     })),
//                 },
//             },
//         });

//         return NextResponse.json(messageThread);

//     } catch (error) {
//         console.error('Error creating message thread:', error);
//         return NextResponse.json({ error: 'Error creating message thread' }, { status: 500 });
//     }
// }