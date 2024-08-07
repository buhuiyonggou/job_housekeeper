import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";

export const pageSize = 10;
export const jobSkeletonSize = 6;
export const lastThreads = 3;
export const initialMessage = {
  message:
    "Hello, I'm your job assistant, your reliable consultant. How can I help you?",
  sentTime: new Date().toISOString(), // Ensure sentTime is in ISO format
  sender: "ChatGPT",
  direction: "incoming" as MessageDirection,
};
