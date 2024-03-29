import { applicationSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // reserve for auth
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({}, { status: 401 });
  // }
  const body = await request.json();
  console.log("nice body: ", body);
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
            track_link: body.track_link,
            position_code: body.position_code,
            type: body.type,
            term: body.term,
            year: body.year,
            location: body.location,
    },
});

  return NextResponse.json(newApplication, { status: 201 });
}

export async function GET() {
    try {
      const applications = await prisma.application.findMany();
      return NextResponse.json(applications);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }
  }


