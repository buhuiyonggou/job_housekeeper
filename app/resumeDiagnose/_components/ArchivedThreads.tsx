import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import diagnostician from "../../src/assets/Small_Kyubey_profile.jpg";
import { User } from "@prisma/client";
import { MessageObject } from "../../src/utils/Reusables";

interface ArchivedThreadsProps {
  currentUser: User;
}

const ArchivedThreads = ({ currentUser } : ArchivedThreadsProps) => {
  const [archivedThreads, setArchivedThreads] = useState<MessageObject[]>([]);

  useEffect(() => {
    const fetchArchivedThreads = async () => {
      if (currentUser) {
        try {
          const response = await axios.get("/api/chat", {
            params: { userId: currentUser.id },
          });
          setArchivedThreads(response.data);
        } catch (error) {
          console.error("Error fetching archived threads:", error);
        }
      }
    };

    fetchArchivedThreads();
  }, [currentUser]);

  return (
    <MainContainer>
      <ChatContainer>
        <MessageList scrollBehavior="smooth">
          {archivedThreads.map((message, index) => (
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
                sender={message.sender === "ChatGPT" ? "Diagnostician" : message.sender}
                sentTime={message.sentTime}
              />
              <Avatar
                src={
                  message.sender === "ChatGPT"
                    ? diagnostician.src // ChatGPT's avatar
                    : currentUser.image! // user's avatar
                }
                size="md"
                name={message.sender}
              />
            </Message>
          ))}
        </MessageList>
      </ChatContainer>
    </MainContainer>
  );
};

export default ArchivedThreads;
