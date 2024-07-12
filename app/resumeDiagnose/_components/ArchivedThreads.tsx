import React, { useState } from "react";
import {
  Avatar,
  Box,
  Text,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import { ThreadsWithMessages } from "../../src/utils/Reusables";

interface ArchivedThreadsProps {
  currentUser: User;
  threads: ThreadsWithMessages[];
}

const ArchivedThreads = ({ currentUser, threads }: ArchivedThreadsProps) => {
  const [selectedThread, setSelectedThread] = useState<ThreadsWithMessages | null>(null);

  const handleThreadClick = (thread: ThreadsWithMessages) => {
    setSelectedThread(thread);
  };

  return (
    <Box mt={4} overflowY="auto" maxHeight="40vh">
      {selectedThread ? (
        <Card maxH="60vh" overflowY="auto">
          <CardHeader textAlign="center">
            <Heading as="h5" size="sm" m={-2} onClick={() => setSelectedThread(null)}>
              Chat Messages
            </Heading>
          </CardHeader>
          <CardBody mt={-2}>
            {selectedThread.messages.map((msg, index) => (
              <Box key={index} p={1}>
                <Flex>
                  <Avatar
                    src={msg.sender === currentUser.id ? currentUser.image ?? "" : ""}
                    size="sm"
                    mr={3}
                  />
                  <Box>
                    <Text as="i" m={1}>{new Date(msg.sentTime).toLocaleString()}</Text>
                    <Text>{msg.content}</Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </CardBody>
        </Card>
      ) : (
        threads.map((thread) => (
          <Box
            key={thread.id}
            border="1px solid #ccc"
            borderRadius="md"
            p={3}
            mb={2}
            onClick={() => handleThreadClick(thread)}
            cursor="pointer"
          >
            {thread.messages.length > 0 ? (
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontWeight="bold">
                    {new Date(thread.messages[0].sentTime).toLocaleString()}
                  </Text>
                  <Text>{thread.messages[0].content}</Text>
                </Box>
                <Avatar
                  src={currentUser.image ?? ""}
                  size="sm"
                />
              </Flex>
            ) : (
              <Heading as="h5" size="sm">No messages found</Heading>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

export default ArchivedThreads;
