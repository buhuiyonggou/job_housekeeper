import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/auth/authOptions';
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { resume: true }
    });
    return NextResponse.json({ resume: user?.resume });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json({ error: 'Error fetching resume' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { resumeUrl } = await req.json();
    await prisma.user.update({
      where: { email: session.user.email },
      data: { resume: resumeUrl }
    });
    return NextResponse.json({ message: 'Resume updated successfully' });
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json({ error: 'Error updating resume' }, { status: 500 });
  }
}