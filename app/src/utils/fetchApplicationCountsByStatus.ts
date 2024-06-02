import prisma from "@/prisma/client";
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export const fetchApplicationCountsByStatus = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  const userFilter = {
    OR: [
      { assignedToUserId: session.user.id },
      { assignedToUserId: null },
    ],
  };

  const [applied_items, interview_items, offer_items, rejected_items, updating_items] = await Promise.all([
    prisma.application.count({
      where: {
        status: "Applied",
        ...userFilter,
      },
    }),
    prisma.application.count({
      where: {
        status: "Interview",
        ...userFilter,
      },
    }),
    prisma.application.count({
      where: {
        status: "Offer",
        ...userFilter,
      },
    }),
    prisma.application.count({
      where: {
        status: "Rejected",
        ...userFilter,
      },
    }),
    prisma.application.count({
      where: {
        status: "Updating",
        ...userFilter,
      },
    }),
  ]);

  return {
    applied: applied_items,
    interview: interview_items,
    offer: offer_items,
    rejected: rejected_items,
    updating: updating_items,
  };
};

