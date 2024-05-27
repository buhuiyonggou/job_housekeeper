import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma/client";
import dayjs from "dayjs";

export async function GET(req: NextRequest) {
  const sixMonthsAgo = dayjs().subtract(5, 'month').startOf('month');
  const now = dayjs().startOf('month');

  try {
    const applications = await prisma.application.findMany({
      where: {
        application_date: {
          gte: sixMonthsAgo.toDate(),
        },
      },
    });

    // Initialize the data structure with all months in the past 6 months
    const applicationsByMonth: { [key: string]: number } = {};
    for (let month = sixMonthsAgo; month.isBefore(now) || month.isSame(now); month = month.add(1, 'month')) {
      applicationsByMonth[month.format('YYYY-MM')] = 0;
    }

    // Populate the data structure with the actual data
    applications.forEach(application => {
      const month = dayjs(application.application_date).format('YYYY-MM');
      applicationsByMonth[month]++;
    });

    // Convert to array for charting
    const chartData = Object.keys(applicationsByMonth).map(month => ({
      name: month,
      value: applicationsByMonth[month],
    }));

    return NextResponse.json(chartData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications data' }, { status: 500 });
  }
}
