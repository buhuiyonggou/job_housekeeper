import prisma from "@/prisma/client";

export const fetchApplicationCountsByStatus = async () => {
  const [applied_items, interview_items, offer_items, rejected_items, updating_items] = await Promise.all([
    prisma.application.count({ where: { status: "Applied" } }),
    prisma.application.count({ where: { status: "Interview" } }),
    prisma.application.count({ where: { status: "Offer" } }),
    prisma.application.count({ where: { status: "Rejected" } }),
    prisma.application.count({ where: { status: "Updating" } }),
  ]);

  return {
    applied: applied_items,
    interview: interview_items,
    offer: offer_items,
    rejected: rejected_items,
    updating: updating_items,
  };
};
