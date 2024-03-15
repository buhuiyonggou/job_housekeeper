"use client";
import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { Callout } from "@radix-ui/themes";
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
import { Application, Term, Type } from "@prisma/client";
import Selector from "@/app/components/Selector";
import { Category } from "@prisma/client";
import DateSelector from "@/app/components/DateSelector";

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplicationForm = ({ application }: { application?: Application }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    // resolver: zodResolver(applicationSchema),
  });

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
    try {
      console.log("submit data: ", data);
      // setIsSubmitting(true);
      // // check if issue exists
      // if (application) {
      //   await axios.patch(
      //     `/api/applications/${application.application_id}`,
      //     data
      //   );
      // } else {
      //   await axios.post("/api/applications", data);
      // }
      // router.push("/applications/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("Something went wrong");
    }
  };

  const handleReset = () => {
    reset();
  };

  const backToApplicationList = () => {
    router.push("/applications/list");
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red" className="mb-5">
            Please complete the form
          </Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <Flex flexWrap="wrap" gap="32px">
          <label
            htmlFor=""
            className="font-sans text-2xl font-bold text-center w-full"
          >
            New Application
          </label>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            gap="8"
            width="100%"
            mb="3"
          >
            <ErrorMessage>{errors.company?.message}</ErrorMessage>
            <Input placeholder="company name" {...register("company")} />

            <ErrorMessage>{errors.category?.message}</ErrorMessage>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Selector
                  type="Category"
                  items={Category}
                  defaultValue="Select Category"
                  onValueChange={(value) => field.onChange(value)}
                />
              )}
            />
          </Box>

          <Box width="100%" mb="3">
            <ErrorMessage>{errors.job_title?.message}</ErrorMessage>
            <Textarea placeholder="job_title" {...register("job_title")} />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            gap="8"
            width="100%"
            mb="3"
          >
            <ErrorMessage>{errors.position_number?.message}</ErrorMessage>
            <Input
              placeholder="position_number"
              {...register("position_number")}
            />

            <ErrorMessage>{errors.location?.message}</ErrorMessage>
            <Input placeholder="Location" {...register("location")} />
          </Box>

          <SimpleGrid columns={3} gap={5} width="100%" mb="3">
            <ErrorMessage>{errors.type?.message}</ErrorMessage>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Selector
                  type="Type"
                  items={Type}
                  defaultValue="Select Job Type"
                  onValueChange={(value) => field.onChange(value)}
                />
              )}
            />

            <ErrorMessage>{errors.term?.message}</ErrorMessage>
            <Controller
              name="term"
              control={control}
              render={({ field }) => (
                <Selector
                  type="Term"
                  items={Term}
                  defaultValue="Select Term"
                  onValueChange={(value) => field.onChange(value)}
                />
              )}
            />

            <ErrorMessage>{errors.year?.message}</ErrorMessage>
            <Controller
              name="year"
              control={control}
              defaultValue={new Date().getFullYear()}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DateSelector
                  selectedYear={value}
                  onDateChange={(year) => onChange(year)}
                />
              )}
            />
          </SimpleGrid>
        </Flex>

        <Flex
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="3"
        >
          <Button
            colorScheme="orange"
            size="md"
            onClick={backToApplicationList}
          >
            Go Back
          </Button>
          <Button onClick={handleReset} colorScheme="red" size="md">
            Reset <MdCancel size="24px" />
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            colorScheme="teal"
            size="md"
          >
            {application ? "Update" : "Submit"}
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default ApplicationForm;
