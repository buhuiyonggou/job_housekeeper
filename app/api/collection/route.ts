import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { pageSize } from "@/app/src/utils/constants";

// get all collection of the current user
export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get('page') || '1');

    const collection = await prisma.job_Collection.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            jobProviders: true, // Ensure providers are included
        },
    });

    return NextResponse.json(collection);
}

// Add current job card to the collection
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    try {
        const newCollection = await prisma.job_Collection.create({
            data: {
                userId: session.user.id,
                // include job id otherwise backend cannot fetch
                id: body.id,
                company: body.company || "",
                title: body.title || "",
                description: body.description || "",
                image: body.image || "",
                location: body.location || "",
                employmentType: body.employmentType || "",
                datePosted: body.datePosted || "",
                salaryRange: body.salaryRange || "",
                jobProviders: {
                    create: body.jobProviders.map((provider: { jobProvider: string, url: string }) => ({
                        jobProvider: provider.jobProvider,
                        url: provider.url,
                    })) || [],
                },
            },
        });

        return NextResponse.json(newCollection, { status: 201 });
    } catch (error) {
        console.error('Error creating job collection:', error);
        return NextResponse.json({ error: 'Failed to create job collection' }, { status: 500 });
    }
}
