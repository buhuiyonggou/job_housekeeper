import React, { useState } from "react";
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
import userAvatar from "../../src/assets/sakiko-v2.jpg";
import { Box, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";

type MessageDirection = "incoming" | "outgoing";
interface MessageObject {
  message: string;
  sentTime: string;
  sender: string;
  direction: MessageDirection;
  position?: "single" | "first" | "normal" | "last";
}
// define the system message to be sent to the API
const systemMessage = {
  role: "system",
  content:
    "Explain things as you are a human resource expertise who is good at analyzing resumes and provide suggestions.",
};

function ChatGPTBox() {
  // initial message from ChatGPT
  const [messages, setMessages] = useState<MessageObject[]>([
    {
      message:
        "Hello, I'm your resume diagnostician, your reliable consultant. How can I help you?",
      sentTime: new Date().toLocaleTimeString(),
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // handleSend function to send the message to the ChatGPT API
  const handleSend = async (message: string) => {
    const newMessage = {
      message: message,
      sentTime: new Date().toLocaleTimeString(),
      sender: "user",
      direction: "outgoing" as MessageDirection,
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  // send message to ChatGPT API, get the response to store it locally, and display it in the chat
  async function processMessageToChatGPT(chatMessages: MessageObject[]) {
    let apiMessages = chatMessages.map((messageObject: MessageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        apiRequestBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      const chatGptMessage = {
        message: data.choices[0].message.content,
        sentTime: new Date().toLocaleTimeString(),
        sender: "ChatGPT",
        direction: "incoming" as MessageDirection,
      };

      setMessages([...chatMessages, chatGptMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error while communicating with the API:", error);
      setIsTyping(false);
    }
  }

  return (
    <Flex direction="column" height="100%">
      <Heading as="h4" size="md" textAlign="center" m={3}>
        Welcome to Resume Diagnose
      </Heading>

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
                      sender={message.sender}
                      sentTime={message.sentTime}
                    />
                    <Avatar
                      src={
                        message.sender === "ChatGPT"
                          ? diagnostician.src // ChatGPT's avatar
                          : userAvatar.src // user's avatar
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
    </Flex>
  );
}

export default ChatGPTBox;
