import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const displayApplications = 3;

  try {
    const applications = await prisma.application.findMany({
      where: {
        OR: [
          { assignedToUserId: session.user.id },
          { assignedToUserId: null },
        ],
      },
      orderBy: { application_date: 'desc' },
      take: displayApplications,
      include: {
        assignedToUser: true,
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
