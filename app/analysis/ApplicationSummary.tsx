import { Status } from "@prisma/client"
import { Card, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"

interface SummaryStatus {
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
    updating: number;
}

const ApplicationSummary = ({applied, interview, offer, rejected, updating}: SummaryStatus) => {
    const containers: {
        label: string;
        value: number;
        status: Status;
    }[] = [
        { label: "Applied", value: applied, status: "Applied" },
        { label: "Interview", value: interview, status: "Interview" },
        { label: "Offer", value: offer, status: "Offer" },
        { label: "Rejected", value: rejected, status: "Rejected" },
        { label: "Updating", value: updating, status: "Updating" },
    ]

    return (
        <Flex gap="3">
            {containers.map((container) => (
                <Card key={container.label} style={cardStyle}>
                    <Flex direction="column" gap="1" align="center">
                        <Link
                            className="text-sm font-medium"
                            href={`/applications/list?status=${container.status}`}
                        >
                            {container.label}
                        </Link>
                        <Text size="5" className="font-bold">
                            {container.value}
                        </Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

const cardStyle = {
    flex: "1 0 calc(33.333% - 1rem)",
  };

export default ApplicationSummary