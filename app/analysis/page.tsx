import { Status } from "@prisma/client"
import { Card, Flex, Text } from "@chakra-ui/react"
import Link from "@/app/components/Link"

interface SummaryStatus {
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
    updating: number;
}

const ApplicationSummary = () => {
  return (
    <div>page</div>
  )
}

export default ApplicationSummary