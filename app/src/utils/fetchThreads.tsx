import axios from "axios";
import { ThreadsWithMessages } from "./Reusables";

export const fetchThreads = async (id: string) => {
    try {
      const response = await axios.get("/api/chat", {
        params: { userId: id },
      });

      if (response.data && response.data.length > 0) {
        const sortedThreads = response.data.sort(
          (a: ThreadsWithMessages, b: ThreadsWithMessages) => b.id - a.id
        );
        return sortedThreads;
        }
    } catch (error) {
        console.error("Error fetching message threads:", error);
        }
    return [];
}