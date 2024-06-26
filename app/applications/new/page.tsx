import dynamic from "next/dynamic";
import ApplicationFormSkeleton from "../_components/ApplicationFormSkeleton";

const ApplicationForm = dynamic(
  () => import("../_components/ApplicationForm"),
  {
    ssr: false,
    loading: () => <ApplicationFormSkeleton />,
  }
);

const NewApplicationPage = () => {
  return <ApplicationForm />;
};

export default NewApplicationPage;
