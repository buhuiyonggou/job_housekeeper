import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";

export const pageSize = 10;
export const jobSkeletonSize = 6;
export const initialMessage = {
    message:
      "Hello, I'm your resume diagnostician, your reliable consultant. How can I help you?",
    sentTime: new Date().toLocaleTimeString(),
    sender: "ChatGPT",
    direction: "incoming" as MessageDirection,
  };