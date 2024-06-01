import { fetchApplicationCountsByStatus } from "../src/utils/fetchApplicationCountsByStatus";
import ApplicationSummary from "./ApplicationSummary";
import { Flex, Grid } from "@chakra-ui/react";
import Chart from "./Chart";
import LatestApplication from "./LatestApplication";

export default async function Analysis() {
  const summaryStatus = await fetchApplicationCountsByStatus();

  return (
    <Grid gap="5">
      <Flex direction="column" w='100%' >
        <ApplicationSummary {...summaryStatus} />
        <Chart data={summaryStatus} />
      </Flex>
      <LatestApplication />
    </Grid>
  );
}

export const metadata = {
  title: "job application tracker | Analysis",
  description: "Analysis Page",
};
