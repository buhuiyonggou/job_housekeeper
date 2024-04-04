import { updateApplicationSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
    ) {
    const application = await prisma.application.findUnique({
        where: {
        application_id: parseInt(params.id),
        },
    });
    
    if (!application) {
        return NextResponse.json({ error: "Invalid application" }, { status: 404 });
    }
    
    return NextResponse.json(application);
    }

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = updateApplicationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const {
    assignedToUserId,
    company,
    category,
    job_title,
    job_info,
    track_link,
    position_code,
    type,
    term,
    year,
    location,
    status,
  } = body;

  const application = await prisma.application.findUnique({
    where: {
      application_id: parseInt(params.id),
    },
  });

  if (!application) {
    return NextResponse.json({ error: "Invalid application" }, { status: 404 });
  }

  const updateApplication = await prisma.application.update({
    where: {
      application_id: application.application_id,
    },
    data: {
      company,
      category,
      job_title,
      job_info,
      track_link,
      position_code,
      type,
      term,
      year,
      location,
      status,
      assignedToUserId,
    },
  });

  return NextResponse.json(updateApplication);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const application = await prisma.application.findUnique({
    where: {
      application_id: parseInt(params.id),
    },
  });

  if (!application) {
    return NextResponse.json({ error: "Invalid application" }, { status: 404 });
  }

  await prisma.application.delete({
    where: {
      application_id: application.application_id,
    },
  });

  return NextResponse.json({});
}
