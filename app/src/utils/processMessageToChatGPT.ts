import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { MessageObject } from "./Reusables";
import axios from "axios";

// define the system message to be sent to the API
const systemMessage = {
  role: "system",
  content:
    "Explain things as you are a human resource expertise who is good at analyzing resumes and provide suggestions.",
};

// send message to ChatGPT API, get the response to store it locally, and display it in the chat
export async function processMessageToChatGPT(chatMessages: MessageObject[]): Promise<MessageObject | undefined> {
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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    const chatGptMessage: MessageObject = {
      message: data.choices[0].message.content,
      sentTime: new Date().toLocaleTimeString(),
      sender: "ChatGPT",
      direction: "incoming" as MessageDirection,
    };

    return chatGptMessage;
  } catch (error) {
    console.error("Error while communicating with the API:", error);
  }
}