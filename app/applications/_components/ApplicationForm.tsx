"use client";
import { Button, Textarea } from "@chakra-ui/react";
import { Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { applicationSchema } from "../../ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdCancel } from "react-icons/md";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Application } from "@prisma/client";

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplicationForm = ({ application }: { application?: Application }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });
  const [error, setError] = useState("");
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      // check if issue exists
      if (application) {
        await axios.patch(
          `/api/applications/${application.application_id}`,
          data
        );
      } else {
        await axios.post("/api/applications", data);
      }
      router.push("/applications/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("Something went wrong");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red" className="mb-5">
            Please complete the form
          </Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <Textarea placeholder="company" {...register("company")} />
        <ErrorMessage>{errors.job_title?.message}</ErrorMessage>
        <Controller
          name="job_title"
          control={control}
          defaultValue={application?.job_title}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.job_title?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {application ? "Update application" : "Submit New application"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ApplicationForm;
