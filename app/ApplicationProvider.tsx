"use client"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { Application, Status } from "@prisma/client";

interface ApplicationContextType {
  applications: Application[];
  handleStatusUpdate: (
    applicationId: number,
    newStatus: Status
  ) => Promise<void>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useApplications must be used within an ApplicationProvider"
    );
  }
  return context;
};

interface ApplicationProviderProps {
  children: ReactNode;
}

export const ApplicationProvider: React.FC<ApplicationProviderProps> = ({
  children,
}) => {
  const [applications, setApplications] = useState<Application[]>([]);

  // Fetch applications from the API on component mount
  useEffect(() => {
    // Function to fetch applications from the API
    const fetchApplications = async () => {
        const response = await axios.get("/api/applications");
        setApplications(response.data);
    };

    fetchApplications();
  }, []);

  const handleStatusUpdate = async (
    applicationId: number,
    newStatus: Status
  ): Promise<void> => {
    await axios.patch(`/api/applications/${applicationId}`, {
      status: newStatus,
    });
    // Optionally refetch applications or update locally
    const updatedApplications = applications.map((app) =>
      app.application_id === applicationId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
  };

  return (
    <ApplicationContext.Provider value={{ applications, handleStatusUpdate }}>
      {children}
    </ApplicationContext.Provider>
  );
};
