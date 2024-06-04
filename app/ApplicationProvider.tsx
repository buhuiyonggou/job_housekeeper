"use client"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SessionProvider, useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/applications");
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    if (session) {
      fetchApplications();
    }
  }, [session]);

  const handleStatusUpdate = async (
    applicationId: number,
    newStatus: Status
  ): Promise<void> => {
    try {
      await axios.patch(`/api/applications/${applicationId}`, {
        status: newStatus,
      });
      const updatedApplications = applications.map((app) =>
        app.application_id === applicationId ? { ...app, status: newStatus } : app
      );
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  return (
    <ApplicationContext.Provider value={{ applications, handleStatusUpdate }}>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </ApplicationContext.Provider>
  );
};
