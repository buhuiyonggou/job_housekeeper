import prisma from "@/prisma/client"
import ApplicationSummary from "./ApplicationSummary"
import {Flex, Grid} from "@chakra-ui/react"

export default async function Analysis() {
    const applied_items = await prisma.application.count({
      where: { status: "Applied" },
    });
    const interview_items = await prisma.application.count({
      where: { status: "Interview" },
    });
    const interview_offer = await prisma.application.count({
      where: { status: "Offer" },
    });
    const rejected_items = await prisma.application.count({
      where: { status: "Rejected" },
    });
    const updating_items = await prisma.application.count({
      where: { status: "Updating" },
    });
  
    return (
      <Grid templateColumns='repeat(5, 1fr)' gap="5">
        <Flex direction="column">
          <ApplicationSummary
            applied={applied_items}
            interview={interview_items}
            offer={interview_offer}
            rejected={rejected_items}
            updating={updating_items}
          />
          {/* <Chart
            applied={applied_items}
            interview={interview_items}
            offer={interview_offer}
            rejected={rejected_items}
            updating={updating_items}
          /> */}
        </Flex>
        {/* <LatestApplications /> */}
      </Grid>
    );
  }
  
  export const metadata = {
    title: "job application tracker | Analysis",
    description: "Analysis Page",
  };
  