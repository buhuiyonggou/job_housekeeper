"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  SimpleGrid,
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
import { Application, Term } from "@prisma/client";
import Selector from "@/app/components/Selector";
import { Category } from "@prisma/client";
import DateSelector from "@/app/components/DateSelector";
import FloatInput from "@/app/components/FloatInput";

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
    resolver: zodResolver(applicationSchema),
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
              isRequired
              isInvalid={errors.category ? true : false}
            >
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Selector
                    type="Category"
                    items={Category}
                    onValueChange={(value) => {
                      if (value !== "") {
                        field.onChange(value);
                      }
                    }}
                    defaultValue={""}
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

          <FloatInput
            id="job_info"
            label="Job Info"
            inputAs="textarea"
            helperText="Enter the job description, skill requirment, etc"
            register={register}
            error={errors.job_info}
          />

          <FloatInput
            id="track_link"
            label="Track Link"
            helperText="Enter the job tracking link"
            register={register}
            error={errors.track_link}
          />

          <Box
            display="flex"
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

          <SimpleGrid columns={3} gap={5} width="100%" mb="3" 
          >
            <FormControl
              variant="floating"
              id="type"
              isRequired
              isInvalid={errors.type ? true : false}
              className="flex flex-col items-center justify-center"
            >
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Selector
                    type="Type"
                    items={Category}
                    onValueChange={(value) => {
                      if (value !== "") {
                        field.onChange(value);
                      }
                    }}
                    defaultValue={""}
                  />
                )}
              />
              <FormHelperText>Select the type of job</FormHelperText>
              <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              variant="floating"
              id="term"
              isRequired
              isInvalid={errors.term ? true : false}
              className="flex flex-col items-center justify-center"
            >
              <Controller
                name="term"
                control={control}
                render={({ field }) => (
                  <Selector
                    type="Term"
                    items={Category}
                    onValueChange={(value) => {
                      if (value !== "") {
                        field.onChange(value);
                      }
                    }}
                    defaultValue={""}
                  />
                )}
              />
              <FormHelperText>Select your job term</FormHelperText>
              <FormErrorMessage>{errors.term?.message}</FormErrorMessage>
            </FormControl>
            
            <FormControl
              variant="floating"
              id="year"
              isRequired
              isInvalid={errors.year ? true : false}
              as="fieldset" className="flex flex-col items-center justify-center"
            >
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
