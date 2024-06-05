"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  SimpleGrid,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Callout } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { applicationSchema } from "../../ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { MdCancel } from "react-icons/md";
import Spinner from "@/app/components/Spinner";
import { Application, Term, Type, Category } from "@prisma/client";
import Selector from "@/app/components/Selector";
import DateSelector from "@/app/components/DateSelector";
import FloatInput from "@/app/components/FloatInput";
import StatusEditor from "@/app/components/StatusEditor";

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface Props {
  application?: Application;
  editStatus?: boolean;
}

const ApplicationForm = ({ application, editStatus }: Props) => {
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
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: application?.company ?? "",
      category: application?.category ?? Category.Software,
      job_title: application?.job_title ?? "",
      job_info: application?.job_info ?? "",
      track_link: application?.track_link ?? "",
      location: application?.location ?? "",
      position_code: application?.position_code ?? "",
      type: application?.type ?? Type.Full_Time,
      term: application?.term ?? Term.Fall,
      year: application?.year ?? new Date().getFullYear(),
    },
  });

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      // check if application exists
      if (application) {
        await axios.patch(`/api/applications/${application.application_id}`, data);
      } else {
        await axios.post("/api/applications", data);
      }
      router.push("/applications/list");
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
          <Flex alignItems="center" width="100%">
            {(editStatus && application) && (<Spacer />)}
            <Spacer />
            <label
              htmlFor=""
              className="font-sans text-2xl font-bold"
            >
              New Application
            </label>
            <Spacer />
            {(editStatus && application) && (
              <Box ml="auto">
                <StatusEditor application={application} />
              </Box>
            )}
          </Flex>

          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-around"
            gap="8"
            width="100%"
            mb="3"
          >
            <FloatInput
              id="company"
              label="Company Name"
              helperText="Enter the company name"
              register={register}
              validationRules={{ required: "Company name is required" }}
              error={errors.company}
            />

            <FormControl
              variant="floating"
              id="category"
              isInvalid={errors.category ? true : false}
            >
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Selector
                    type="Category"
                    items={Category}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  />
                )}
              />
              <FormHelperText>Select the category of job</FormHelperText>
              <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
            </FormControl>
          </Box>

          <FloatInput
            id="job_title"
            label="Job Title"
            helperText="Enter the job title"
            register={register}
            validationRules={{ required: "Job Title is required" }}
            error={errors.job_title}
          />

          <Box width="100%" mb="3">
            <Controller
              name="job_info"
              control={control}
              defaultValue={application?.job_info ?? ""}
              render={({ field }) => (
                <SimpleMDE placeholder="Description" {...field} />
              )}
            />
          </Box>

          <FloatInput
            id="track_link"
            label="Track Link"
            helperText="Enter the job track link"
            register={register}
            error={errors.track_link}
          />

          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-around"
            gap="8"
            width="100%"
            mb="3"
          >
            <FloatInput
              id="position_code"
              label="Position Code"
              helperText="Enter the position/job code"
              register={register}
              error={errors.position_code}
            />

            <FloatInput
              id="location"
              label="Location"
              helperText="Enter location of the job"
              register={register}
              validationRules={{ required: "Location is required" }}
              error={errors.location}
            />
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={5} width="100%" mb="3">
            <FormControl
              variant="floating"
              id="type"
              isInvalid={errors.type ? true : false}
              className="flex flex-col items-center justify-center"
            >
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Selector
                    type="Type"
                    items={Type}
                    onValueChange={(value) => {
                      if (value !== "") {
                        field.onChange(value);
                      }
                    }}
                    value={field.value}
                  />
                )}
              />
              <FormHelperText>Select the type of job</FormHelperText>
              <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              variant="floating"
              id="term"
              isInvalid={errors.term ? true : false}
              className="flex flex-col items-center justify-center"
            >
              <Controller
                name="term"
                control={control}
                render={({ field }) => (
                  <Selector
                    type="Term"
                    items={Term}
                    onValueChange={(value) => {
                      if (value !== "") {
                        field.onChange(value);
                      }
                    }}
                    value={field.value}
                  />
                )}
              />
              <FormHelperText>Select your job term</FormHelperText>
              <FormErrorMessage>{errors.term?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              variant="floating"
              id="year"
              isInvalid={errors.year ? true : false}
              as="fieldset"
              className="flex flex-col items-center justify-center"
            >
              <Controller
                name="year"
                control={control}
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
              <FormHelperText>Select the year</FormHelperText>
              <FormErrorMessage>{errors.year?.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
        </Flex>
        <Flex
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="3"
          direction={{ base: "column", md: "row" }}
        >
          <Button
            colorScheme="orange"
            size="md"
            onClick={backToApplicationList}
            width={{ base: "100%", md: "auto" }}
          >
            Go Back
          </Button>
          <Button
            onClick={handleReset}
            colorScheme="red"
            size="md"
            width={{ base: "100%", md: "auto" }}
          >
            Reset <MdCancel size="24px" />
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            colorScheme="teal"
            size="md"
            width={{ base: "100%", md: "auto" }}
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

