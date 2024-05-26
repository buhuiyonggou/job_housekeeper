import prisma from "@/prisma/client";
import ApplicationSummary from "./ApplicationSummary";
import { Flex, Grid } from "@chakra-ui/react";
import Chart from "./Chart";

export default async function Analysis() {
  const applied_items = await prisma.application.count({
    where: { status: "Applied" },
  });
  const interview_items = await prisma.application.count({
    where: { status: "Interview" },
  });
  const offer_items = await prisma.application.count({
    where: { status: "Offer" },
  });
  const rejected_items = await prisma.application.count({
    where: { status: "Rejected" },
  });
  const updating_items = await prisma.application.count({
    where: { status: "Updating" },
  });

  const summaryStatus = {
    applied: applied_items,
    interview: interview_items,
    offer: offer_items,
    rejected: rejected_items,
    updating: updating_items,
  };

  return (
    <Grid gap="5">
      <Flex direction="column" w='50%'>
        <ApplicationSummary {...summaryStatus} />
        <Chart data={summaryStatus} />
      </Flex>
      {/* <LatestApplications /> */}
    </Grid>
  );
}

export const metadata = {
  title: "job application tracker | Analysis",
  description: "Analysis Page",
};
