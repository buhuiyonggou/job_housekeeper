import React, { useState, useEffect } from "react";
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
import { SmallCloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { User } from "@prisma/client";
import { ThreadsWithMessages } from "../../src/utils/Reusables";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";
import { fetchThreads } from "@/app/src/utils/fetchThreads";

interface ArchivedThreadsProps {
  currentUser: User;
  currentThreadId: number | null;
}

const ArchivedThreads = ({
  currentUser,
  currentThreadId,
}: ArchivedThreadsProps) => {
  const [ThreadsExceptCurrent, setThreadsExceptCurrent] =
    useState<ThreadsWithMessages[]>();
  const [selectedThread, setSelectedThread] =
    useState<ThreadsWithMessages | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [threadToDelete, setThreadToDelete] =
    useState<ThreadsWithMessages | null>(null);

  useEffect(() => {
    const fetchMessageThreads = async () => {
      try {
        if (currentUser) {
          const fetchedThreads = await fetchThreads(currentUser.id);
          //   exclude the current thread from the list
          fetchedThreads.forEach((thread: ThreadsWithMessages) => {
            if (thread.id === currentThreadId) {
              fetchedThreads.splice(fetchedThreads.indexOf(thread), 1);
            }
          });
          setThreadsExceptCurrent(fetchedThreads);
        }
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };
    fetchMessageThreads();
  }, [currentUser, ThreadsExceptCurrent]);

  const handleDeleteThread = async () => {
    if (threadToDelete) {
      try {
        await axios.delete(`/api/chat/${threadToDelete.id}`, {
          data: { userId: currentUser.id },
        });
      } catch (error) {
        console.error("Error deleting thread:", error);
      } finally {
        setIsDialogOpen(false);
        setThreadToDelete(null);
      }
    }
  };

  const confirmDelete = (thread: ThreadsWithMessages) => {
    setThreadToDelete(thread);
    setIsDialogOpen(true);
  };

  return (
    <Box mt={4} overflowY="auto" maxHeight="40vh">
      <ConfirmDeleteDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDeleteThread}
      />
      {selectedThread ? (
        <Card maxH="60vh" overflowY="auto">
          <CardHeader textAlign="center">
            <Heading
              as="h5"
              size="sm"
              m={-2}
              onClick={() => setSelectedThread(null)}
            >
              Chat Messages
            </Heading>
          </CardHeader>
          <CardBody mt={-2}>
            {selectedThread.messages.map((msg, index) => (
              <Box key={index} p={1}>
                <Flex>
                  <Avatar
                    src={
                      msg.sender === currentUser.id
                        ? currentUser.image ?? ""
                        : ""
                    }
                    size="xs"
                    mr={3}
                  />
                  <Box>
                    <Text as="i" m={1}>
                      {new Date(msg.sentTime).toLocaleString()}
                    </Text>
                    <Text>{msg.content}</Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </CardBody>
        </Card>
      ) : (
        ThreadsExceptCurrent &&
        ThreadsExceptCurrent.map((thread) => (
          <Box
            key={thread.id}
            border="1px solid #ccc"
            borderRadius="md"
            p={3}
            mb={2}
            cursor="pointer"
          >
            {thread.messages.length > 0 ? (
              <Flex justifyContent="space-between" alignItems="center">
                <Box
                  maxWidth={{ base: "50%", md: "80%" }}
                  onClick={() => setSelectedThread(thread)}
                >
                  <Text fontWeight="bold">
                    {new Date(thread.messages[0].sentTime).toLocaleString()}
                  </Text>
                  <Heading as="h6" size="xs">
                    Last Message:
                  </Heading>
                  <Text> {thread.messages[0].content}</Text>
                </Box>
                <Box>
                  <Avatar src={currentUser.image ?? ""} size="sm" />
                  <SmallCloseIcon
                    color="red"
                    m="1"
                    onClick={() => confirmDelete(thread)}
                  />
                </Box>
              </Flex>
            ) : (
              <Heading as="h5" size="sm">
                No messages found
              </Heading>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

export default ArchivedThreads;
