import { fetchThreads } from "@/app/src/utils/fetchThreads";
import { MessageObject } from "@/app/src/utils/Reusables";
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import {
    Avatar,
    ChatContainer,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Message as MG, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import diagnostician from "../../src/assets/Small_Kyubey_profile.jpg";
import { processMessageToChatGPT } from "../../src/utils/processMessageToChatGPT";
import ArchivedThreads from "./ArchivedThreads";

function ChatGPTBox({ initialMessage }: { initialMessage: MessageObject }) {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState<number | null>(null);
  const [lastSavedMessageTime, setLastSavedMessageTime] = useState<string>("");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndSetInitialMessage = async () => {
      try {
        const currentUser = await axios.get("/api/users/me");
        if (currentUser.data) {
          setUser(currentUser.data);
        } else {
          router.push("/auth/signin");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserAndSetInitialMessage();
  }, [router]);

  useEffect(() => {
    const fetchMessageThreads = async () => {
      try {
        if (user) {
          const fetchedThreads = await fetchThreads(user.id);

          if (fetchedThreads.length > 0) {
            const sortedThreads = fetchedThreads;
            const threadMessages = sortedThreads[0].messages.map((msg: MG) => ({
              message: msg.content,
              sentTime: new Date(msg.sentTime).toISOString(),
              sender: msg.sender,
              direction: msg.direction,
            }));
            // Sort the messages by sentTime
            threadMessages.sort(
              (a: MessageObject, b: MessageObject) =>
                new Date(a.sentTime).getTime() - new Date(b.sentTime).getTime()
            );
            setMessages(threadMessages);

            setLastSavedMessageTime(
              threadMessages[threadMessages.length - 1].sentTime
            );
            setCurrentThreadId(sortedThreads[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching message threads:", error);
      }
    };

    if (user) {
      fetchMessageThreads();
    }
  }, [user]);

  const handleSend = async (message: string) => {
    const newMessage: MessageObject = {
      message: message,
      sentTime: new Date().toISOString(),
      sender: user!.id,
      direction: "outgoing" as MessageDirection,
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const chatGptMessage = await processMessageToChatGPT(newMessages);
      if (chatGptMessage) {
        setMessages([...newMessages, chatGptMessage]);
      }
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message to ChatGPT:", error);
      setIsTyping(false);
    }
  };

  const handleClickAttach = () => {
    toast({
      title: "File attachment is not available in this 3.5 version.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleArchiveMessageThread = async () => {
    if (currentThreadId) {
      const newMessages = messages.filter(
        (msg) => new Date(msg.sentTime) > new Date(lastSavedMessageTime)
      );
      try {
        await axios.patch(`/api/chat/${currentThreadId}`, {
          threadId: currentThreadId,
          messages: newMessages,
          userId: user?.id,
        });
        if (newMessages.length > 0) {
          setLastSavedMessageTime(newMessages[newMessages.length - 1].sentTime);
        }
      } catch (error) {
        console.error("Error updating message thread:", error);
      }
    }
  };

  const handleNewThread = async () => {
    try {
      const newThread = await axios.post("/api/chat", {
        message: initialMessage,
      });
      setMessages([initialMessage]);
      //   setThreads([newThread.data, ...threads]);
      setCurrentThreadId(newThread.data.id);
      setLastSavedMessageTime(initialMessage.sentTime);
    } catch (error) {
      console.error("Error archiving message thread:", error);
    }
  };

  return (
    <Flex direction="column" height="130%" mt={6}>
      <Flex direction="column" width="100%" p={3}>
        <Box flex="1" textAlign="center">
          <Heading as="h4" size="md" textAlign="center">
            Consult AI to diagnose your resume
          </Heading>
        </Box>
        <Flex
          flex="1"
          justifyContent="space-evenly"
          width={{ base: "100%", md: "50%", lg: "60%" }}
          alignSelf="center"
          mt={3}
        >
          <Button
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={handleArchiveMessageThread}
            mt={{ base: 3 }}
            m={2}
          >
            Save Thread
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            size="sm"
            onClick={handleNewThread}
            mt={{ base: 3 }}
            m={2}
          >
            New Thread
          </Button>
        </Flex>
      </Flex>
      <Box className="chat-container" flex="1" height="70vh">
        <MainContainer>
          <ChatContainer style={{ height: "100%" }}>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages && messages.length > 0
                ? messages.map((message, index) => {
                    return (
                      <Message
                        key={index}
                        model={{
                          message: message.message,
                          sentTime: message.sentTime,
                          sender: message.sender,
                          direction: message.direction,
                          position: message.position || "single",
                        }}
                      >
                        <Message.Header
                          sender={
                            message.sender === "ChatGPT"
                              ? "AI consultant"
                              : message.sender
                          }
                          sentTime={message.sentTime.split(".")[0]}
                        />
                        <Avatar
                          src={
                            message.sender === "ChatGPT"
                              ? diagnostician.src
                              : user?.image!
                          }
                          size="md"
                          name={message.sender}
                        />
                      </Message>
                    );
                  })
                : null}
            </MessageList>
            <MessageInput
              placeholder="Type a message..."
              onSend={handleSend}
              onAttachClick={handleClickAttach}
            />
          </ChatContainer>
        </MainContainer>
      </Box>
      {user && (
        <ArchivedThreads currentUser={user} currentThreadId={currentThreadId} />
      )}
    </Flex>
  );
}

export default ChatGPTBox;
