import { Status } from "@prisma/client"

export interface SummaryStatus {
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
    updating: number;
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