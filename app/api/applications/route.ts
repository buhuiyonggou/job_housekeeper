import authOptions from "@/app/auth/authOptions";
import { applicationSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { pageSize } from "../../src/utils/constants";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();

  const validation = applicationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newApplication = await prisma.application.create({
    data: {
      company: body.company,
      category: body.category,
      job_title: body.job_title,
      job_info: body.job_info,
      track_link: body?.track_link,
      position_code: body.position_code,
      type: body.type,
      term: body.term,
      year: body.year,
      location: body.location,
      assignedToUserId: session.user.id,
    },
  });

  return NextResponse.json(newApplication, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const status = searchParams.get('status');
  const orderBy = searchParams.get('orderBy');

  const statuses = Object.values(Status);
  const statusFilter = statuses.includes(status as Status) ? status as Status : undefined;

  const where: any = {
    AND: [
      {
        OR: [
          { assignedToUserId: session.user.id },
          { assignedToUserId: null },
        ],
      },
      statusFilter ? { status: statusFilter } : {},
    ],
  };

  if (query) {
    where.AND.push({
      OR: [
        { company: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
        { job_title: { contains: query, mode: 'insensitive' } },
      ],
    });
  }

  const applications = await prisma.application.findMany({
    where,
    orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  // Count the total number of applications belongs to current user
  const appsCount = await prisma.application.count({
    where: {  
      AND: [
        {
          OR: [
            { assignedToUserId: session.user.id },
            { assignedToUserId: null },
          ],
        },
        statusFilter ? { status: statusFilter } : {},
      ],
    },
  });

  return NextResponse.json({ applications, appsCount });
}
