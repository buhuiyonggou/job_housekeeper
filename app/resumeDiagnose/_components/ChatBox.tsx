import React, { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import diagnostician from "../../src/assets/Small_Kyubey_profile.jpg";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import axios from "axios";
import { User } from "@prisma/client";
import ArchivedThreads from "./ArchivedThreads";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { MessageObject } from "@/app/src/utils/Reusables";
import { processMessageToChatGPT } from "@/app/src/utils/processMessageToChatGPT";

function ChatGPTBox() {
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const [user, setUser] = useState<User>();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchUserAndSetInitialMessage = async () => {
      try {
        // Fetch the current user
        const currentUser = await axios.get("/api/users/me");
        setUser(currentUser.data);

        // Initial message from ChatGPT
        // setMessages([initialMessage]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserAndSetInitialMessage();
  }, []);

  // handleSend function to send the message to the ChatGPT API
  const handleSend = async (message: string) => {
    const newMessage: MessageObject = {
      message: message,
      sentTime: new Date().toLocaleTimeString(),
      sender: "user",
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
  const handleCreateThread = async () => {
    console.log("Creating new thread");
  };
  // Archive the current message thread to api
  const handleArchiveMessageThread = async () => {
    try {
      await axios.post("/api/chat", {
        messages: messages,
        userId: user?.id,
      });
      //   setMessages([initialMessage]);
    } catch (error) {
      console.error("Error archiving message thread:", error);
    }
  };

  return (
    <Flex direction="column" height="100%" mt={6}>
      <Flex
        justify="space-between"
        alignItems="center"
        direction={{ base: "column", xl: "row" }}
        width="100%"
        p={3}
      >
        <Box flex="1" textAlign="center">
          <Heading as="h4" size="md" textAlign="center">
            Welcome to Resume Diagnose
          </Heading>
        </Box>
        <Flex>
          <Button
            colorScheme="blue"
            variant="outline"
            size="sm"
            onClick={handleCreateThread}
            mt={{ base: 3 }}
            mb={2}
          >
            New Thread
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={handleArchiveMessageThread}
            mt={{ base: 3 }}
            mb={2}
          >
            Archive Chat
          </Button>
        </Flex>
      </Flex>
      <Box className="chat-container" flex="1">
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages.map((message, index) => {
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
                          ? "Diagnostician"
                          : message.sender
                      }
                      sentTime={message.sentTime}
                    />
                    <Avatar
                      src={
                        message.sender === "ChatGPT"
                          ? diagnostician.src // ChatGPT's avatar
                          : user?.image! // user's avatar
                      }
                      size="md"
                      name={message.sender}
                    />
                  </Message>
                );
              })}
            </MessageList>
            <MessageInput placeholder="Type a message..." onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </Box>
      {user && <ArchivedThreads currentUser={user} />}
    </Flex>
  );
}

export default ChatGPTBox;
