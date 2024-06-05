import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma/client";
import dayjs from "dayjs";
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sixMonthsAgo = dayjs().subtract(5, 'month').startOf('month');
  const now = dayjs().startOf('month');

  try {
    const applications = await prisma.application.findMany({
      where: {
        application_date: {
          gte: sixMonthsAgo.toDate(),
        },
        OR: [
          { assignedToUserId: session.user.id },
          { assignedToUserId: null },
        ],
      },
    });

    // Initialize the data structure with all months in the past 6 months
    const applicationsByMonth: { [key: string]: number } = {};
    for (let month = sixMonthsAgo; month.isBefore(now) || month.isSame(now); month = month.add(1, 'month')) {
      applicationsByMonth[month.format('YYYY-MM')] = 0;
    }

    // Initialize the data structure for categories
    const applicationsByCategory: { [key: string]: number } = {};

    // Populate the data structure with the actual data
    applications.forEach(application => {
      const month = dayjs(application.application_date).format('YYYY-MM');
      applicationsByMonth[month]++;
      
      const category = application.category;
      if (!applicationsByCategory[category]) {
        applicationsByCategory[category] = 0;
      }
      applicationsByCategory[category]++;
    });

    // Convert to array for charting
    const chartDataByMonth = Object.keys(applicationsByMonth).map(month => ({
      name: month,
      value: applicationsByMonth[month],
    }));

    const chartDataByCategory = Object.keys(applicationsByCategory).map(category => ({
      name: category,
      value: applicationsByCategory[category],
    }));

    return NextResponse.json({
      chartDataByMonth,
      chartDataByCategory,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications data' }, { status: 500 });
  }
}
