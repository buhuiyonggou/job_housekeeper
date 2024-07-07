import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export const fetchUserCollections = async ( ) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  const userId = session.user.id;
  const collections = await prisma.job_Collection.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { jobProviders: true },
  });

  return collections;
};
