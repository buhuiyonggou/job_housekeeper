import { Status, Message } from "@prisma/client"
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";

export interface SummaryStatus {
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
    updating: number;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  gender?: string;
  description?: string;
  linkedin?: string;
  personal_site?: string;
  image?: string;
  resume?: string;
}

export interface Job {
  id: string;
  image: string;
  title: string;
  company: string;
  description: string;
  location: string;
  employmentType: string;
  datePosted: string;
  salaryRange: string;
  jobProviders: JobProvider[];
}

export interface JobProvider {
  jobProvider: string;
  url: string;
}

export interface JobFilters {
  query: string
  location: string
  distance: number
  remoteOnly: boolean
  datePosted: string
  employmentTypes: string
}

export interface MessageObject {
  message: string;
  sentTime: string
  sender: string;
  direction: MessageDirection;
  position?: "single" | "first" | "normal" | "last";
}

export interface ThreadsWithMessages {
  id: number;
  userId: string;
  messages: {
    content: string;
    sentTime: Date;
    sender: string;
    direction: MessageDirection;
  }[];
  createdAt: Date;
  updatedAt: Date;
  }

export const statusOptions: Record<Status, { label: string; color: string }> = {
    Applied: { label: "Applied", color: "yellow" },
    Interview: { label: "Interview", color: "blue" },
    Offer: { label: "Offer", color: 'green' },
    Rejected: { label: "Rejected", color: "red" },
    Updating: { label: "Updating", color: "gray" },
  };

// Map to analysis colors:
export function getAnalysisColorScheme(status: Status) {
    switch (status) {
      case Status.Applied:
        return "#ECC94B"; 
      case Status.Interview:
        return "#4299E1"; 
      case Status.Offer:
        return "#48BB78"; 
      case Status.Rejected:
        return "#F56565"; 
      case Status.Updating:
        return "#A0AEC0"; 
      default:
        return "#A0AEC0"; 
    }
  }

export function getStatusColorScheme(status: Status) {
    return statusOptions[status]?.color || "white";
  }

